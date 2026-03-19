import * as dateFns from 'date-fns';

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

type DateFormat = typeof DEFAULT_DATE_FORMAT | 'EEEE' | 'EEE' | 'MMM dd, yyyy' |
  'MMMM yyyy' | 'MMM yyyy' | 'dd MMMM yyyy' | 'MMM dd' | 'MMM d' | 'yyyy' |
  'EEEE (MMM dd)' | 'EEEE (MMM dd, yyyy)' |
  'MMMM' | 'MMM' | 'dd' | 'MMM dd, EEEEEE' | 'MMM dd, EEEEEE yyyy' | 'yyyy-MM-dd hh:MM:ss';

class DateUtils {

  public yearRange(date: Date): [Date, Date] {
    return [dateFns.startOfYear(date), dateFns.endOfYear(date)];
  }

  public getYear(date: Date): number {
    return dateFns.getYear(date);
  }

  public getMonth(date: Date): number {
    return dateFns.getMonth(date);
  }

  public isDateLocked(date: string, unlockedDays: Array<string>): boolean {
    return this.isBefore(this.getStartOfDay(this.getDate(date)), this.getStartOfDay(new Date()))
      && !unlockedDays.some((uDate) => uDate === date);
  }

  public timestampToIsoString(timestampInSeconds: number, dateFormat: DateFormat = DEFAULT_DATE_FORMAT): string {
    return this.getFormattedDate(new Date(timestampInSeconds * 1000), dateFormat);
  }

  public getUnixTime(date: Date): number {
    return dateFns.getUnixTime(date);
  }

  public getCurrentUnixTime(): number {
    return this.getUnixTime(new Date());
  }

  public getTimestampInMilliseconds(date: Date): number {
    return date.valueOf();
  }

  /* istanbul ignore next */
  public getCurrentDate(): Date {
    return new Date();
  }

  public getDate(date: string | number): Date {
    return new Date(date);
  }

  public createDate(year: number, month: number = 1, day: number = 1): Date {
    return new Date(year, month - 1, day);
  }

  public getFormattedDate(date: Date | string, dateFormat: DateFormat = DEFAULT_DATE_FORMAT): string {
    return dateFns.format(this.coerceToDate(date), dateFormat);
  }

  public getHours(date: Date): number {
    return dateFns.getHours(date);
  }

  public getMinutes(date: Date): number {
    return dateFns.getMinutes(date);
  }

  public getStartOfDay(date: Date): Date {
    return dateFns.startOfDay(date);
  }

  public getMealTime(time: Date): number {
    return this.getHours(time) * 60 + this.getMinutes(time);
  }

  public getStartOfToday(): Date {
    return this.getStartOfDay(this.getCurrentDate());
  }

  public getStartOfWeek(date: Date): Date {
    return dateFns.startOfWeek(date);
  }

  public getStartOfMonth(date: Date): Date {
    return dateFns.startOfMonth(date);
  }

  public getStartOfYear(date: Date): Date {
    return dateFns.startOfYear(date);
  }

  public getEndOfDay(date: Date): Date {
    return dateFns.endOfDay(date);
  }

  public getEndOfWeek(date: Date): Date {
    return dateFns.endOfWeek(date);
  }

  public getEndOfMonth(date: Date): Date {
    return dateFns.endOfMonth(date);
  }

  public getDateDifference(dateLeft: Date, dateRight: Date): number {
    return dateFns.differenceInMilliseconds(dateLeft, dateRight);
  }

  public getMinutesForToday(): number {
    return dateFns.getMinutes(this.getCurrentDate());
  }

  public setMinutesForToday(minutes: number): Date {
    return dateFns.setMinutes(this.getCurrentDate(), minutes);
  }

  public addYears(date: Date, amount: number): Date {
    return dateFns.addYears(date, amount);
  }

  public addMonths(date: Date, amount: number): Date {
    return dateFns.addMonths(date, amount);
  }

  public addDays(date: Date | string, amount: number): Date {
    return dateFns.addDays(this.coerceToDate(date), amount);
  }

  public addHours(date: Date, amount: number): Date {
    return dateFns.addHours(date, amount);
  }

  public addMinutes(date: Date, amount: number): Date {
    return dateFns.addMinutes(date, amount);
  }

  public subtractDays(date: Date | string, amount: number): Date {
    return dateFns.subDays(this.coerceToDate(date), amount);
  }

  public subtractHours(date: Date, amount: number): Date {
    return dateFns.subHours(date, amount);
  }

  public subtractWeeks(date: Date, amount: number): Date {
    return dateFns.subWeeks(date, amount);
  }

  public subtractMonths(date: Date, amount: number): Date {
    return dateFns.subMonths(date, amount);
  }

  public isSameOrBefore(dateLeft: Date | string, dateRight: Date | string): boolean {
    return (
        this.isSameYear(dateLeft, dateRight)
        && this.isSameMonth(dateLeft, dateRight)
        && this.isSameDay(dateLeft, dateRight)
      ) || this.isBefore(dateLeft, dateRight);
  }

  public isSameOrAfter(dateLeft: Date | string, dateRight: Date | string): boolean {
    return (
        this.isSameYear(dateLeft, dateRight)
        && this.isSameMonth(dateLeft, dateRight)
        && this.isSameDay(dateLeft, dateRight)
      ) || this.isAfter(dateLeft, dateRight);
  }

  public isSameYear(dateLeft: Date | string, dateRight: Date | string): boolean {
    return dateFns.isSameYear(this.coerceToDate(dateLeft), this.coerceToDate(dateRight));
  }

  public isSameMonth(dateLeft: Date | string, dateRight: Date | string): boolean {
    return dateFns.isSameMonth(this.coerceToDate(dateLeft), this.coerceToDate(dateRight));
  }

  public isSameDay(dateLeft: Date | string, dateRight: Date | string): boolean {
    return dateFns.isSameDay(this.coerceToDate(dateLeft), this.coerceToDate(dateRight));
  }

  public isAfter(date: Date | string, dateToCompare: Date | string): boolean {
    return dateFns.isAfter(this.coerceToDate(date), this.coerceToDate(dateToCompare));
  }

  public isBefore(date: Date | string, dateToCompare: Date | string): boolean {
    return dateFns.isBefore(this.coerceToDate(date), this.coerceToDate(dateToCompare));
  }

  private coerceToDate: (date: Date | string) => Date = (date) => {
    if (typeof date === 'string') {
      return this.getDate(date);
    }
    return date;
  }
}

export const dateUtils = new DateUtils();
