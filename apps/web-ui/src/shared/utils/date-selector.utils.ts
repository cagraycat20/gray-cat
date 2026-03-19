import { dateUtils } from '..';

const PREVIOUS_WEEK = 'previous_week';
const PREVIOUS_MONTH = 'previous_month';
const THIS_YEAR = 'this_year';
const THIS_MONTH = 'this_month';
const THIS_WEEK = 'this_week';
const TODAY = 'today';
const CUSTOM = 'custom';
export type DateType = typeof THIS_WEEK | typeof THIS_MONTH | typeof THIS_YEAR | typeof PREVIOUS_MONTH
  | typeof PREVIOUS_WEEK | typeof TODAY | typeof CUSTOM;

export function getValueOfSelectedPeriod(dateFrom: Date, dateTo: Date): string {
  const dateFromFormat = dateUtils.isSameYear(dateFrom, dateTo) ? 'MMM dd, EEEEEE' : 'MMM dd, EEEEEE yyyy';

  return dateUtils.getFormattedDate(dateFrom, dateFromFormat) + ' - '
    + dateUtils.getFormattedDate(dateTo, 'MMM dd, EEEEEE yyyy');
}

export function getDateFrom(dateType: DateType): Date {
    switch (dateType) {
        case TODAY:
            return dateUtils.getStartOfToday();
        case THIS_WEEK:
            return dateUtils.getStartOfWeek(dateUtils.getCurrentDate());
        case PREVIOUS_WEEK:
            return dateUtils.getStartOfWeek(dateUtils.subtractWeeks(dateUtils.getCurrentDate(), 1));
        case THIS_MONTH:
            return dateUtils.getStartOfMonth(dateUtils.getCurrentDate());
        case PREVIOUS_MONTH:
            return dateUtils.getStartOfMonth(dateUtils.subtractMonths(dateUtils.getCurrentDate(), 1));
        default:
            return dateUtils.getStartOfYear(dateUtils.getCurrentDate());
    }
}

export function getDateTo(dateType: DateType): Date {
  switch (dateType) {
    case PREVIOUS_WEEK:
      return dateUtils.getEndOfWeek(dateUtils.subtractWeeks(dateUtils.getCurrentDate(), 1));
    case PREVIOUS_MONTH:
      return dateUtils.getEndOfMonth(dateUtils.subtractMonths(dateUtils.getCurrentDate(), 1));
    default:
      return dateUtils.getCurrentDate();
  }
}

export function getDateValue(dateType: DateType): string {
    switch (dateType) {
        case TODAY:
            return 'Today';
        case THIS_WEEK:
            return 'This week';
        case PREVIOUS_WEEK:
            return 'Previous week';
        case THIS_MONTH:
            return 'This month';
        case PREVIOUS_MONTH:
            return 'Previous month';
        case THIS_YEAR:
            return 'This year';
        default:
            return 'Custom';
    }
}
