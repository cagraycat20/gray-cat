import 'jest';
import { dateUtils } from './date-utils';

describe('Date utils', () => {
    describe('Is date locked', () => {
        it('Locked', () => {
            expect(dateUtils.isDateLocked('2018-11-15', [])).toBe(true);
        });

        it('Unlocked', () => {
            expect(dateUtils.isDateLocked('2018-11-15', ['2018-11-15', '2018-11-16'])).toBe(false);
        });
    });

    describe('Timestamp to ISO string', () => {
        it('1542658333', () => {
            expect(dateUtils.timestampToIsoString(1542658333)).toBe('2018-11-19');
        });
    });

    describe('Get Unix time', () => {
        it('2018-11-19', () => {
            expect(dateUtils.getUnixTime(new Date('2018-11-19'))).toBe(1542585600);
        });
    });

    describe('Get current unix time', () => {
        it('Current unis time', () => {
            dateUtils.getUnixTime = jest.fn(() => 10);

            expect(dateUtils.getCurrentUnixTime()).toBe(10);
            expect(dateUtils.getUnixTime).toHaveBeenCalledTimes(1);
        });
    });

    describe('Get timestamp in milliseconds', () => {
        it('2018-11-19', () => {
            expect(dateUtils.getTimestampInMilliseconds(new Date('2018-11-19'))).toBe(1542585600000);
        });
    });

    describe('Get date', () => {
        it('2018-11-19', () => {
            expect(dateUtils.getDate('2018-11-19')).toEqual(new Date('2018-11-19'));
        });
    });

    describe('Get formatted date', () => {
        it('2018-11-19 => 2018-11-19', () => {
            expect(dateUtils.getFormattedDate(new Date('2018-11-19'))).toBe('2018-11-19');
        });

        it('2018-11-19 => Monday', () => {
            expect(dateUtils.getFormattedDate(new Date('2018-11-19'), 'EEEE')).toBe('Monday');
        });

        it('2018-11-19 => Mon', () => {
            expect(dateUtils.getFormattedDate(new Date('2018-11-19'), 'EEE')).toBe('Mon');
        });

        it('2018-11-19 => Nov 19, 2018', () => {
            expect(dateUtils.getFormattedDate(new Date('2018-11-19'), 'MMM dd, yyyy')).toBe('Nov 19, 2018');
        });

        it('2018-11-19 => November 2018', () => {
            expect(dateUtils.getFormattedDate(new Date('2018-11-19'), 'MMMM yyyy')).toBe('November 2018');
        });

        it('2018-11-19 => 19 November 2018', () => {
            expect(dateUtils.getFormattedDate(new Date('2018-11-19'), 'dd MMMM yyyy')).toBe('19 November 2018');
        });

        it('2018-11-19 => Nov 19', () => {
            expect(dateUtils.getFormattedDate(new Date('2018-11-19'), 'MMM dd')).toBe('Nov 19');
        });

        it('2018-11-19 => 2018', () => {
            expect(dateUtils.getFormattedDate(new Date('2018-11-19'), 'yyyy')).toBe('2018');
        });

        it('2018-11-19 => Monday (Nov 19)', () => {
            expect(dateUtils.getFormattedDate(new Date('2018-11-19'), 'EEEE (MMM dd)')).toBe('Monday (Nov 19)');
        });
    });

    describe('Get hours', () => {
        it('2018-11-19 11:05:45', () => {
            expect(dateUtils.getHours(new Date('2018-11-19 11:05:45'))).toBe(11);
        });
    });

    describe('Get minutes', () => {
        it('2018-11-19 11:05:45', () => {
            expect(dateUtils.getMinutes(new Date('2018-11-19 11:05:45'))).toBe(5);
        });
    });

    describe('Start of day', () => {
        it('2018-11-19 11:05:45', () => {
            const date = new Date('2018-11-19');
            date.setTime(date.getTime() + date.getTimezoneOffset() / 60 * 60 * 60 * 1000);
            expect(dateUtils.getStartOfDay(new Date('2018-11-19 11:05:45'))).toEqual(date);
        });
    });

    describe('Get start of today', () => {
        it('Start of today', () => {
            const date = new Date('2018-11-19');

            dateUtils.getCurrentDate = jest.fn(() => date);
            dateUtils.getStartOfDay = jest.fn(() => date);

            expect(dateUtils.getStartOfToday()).toEqual(date);
            expect(dateUtils.getCurrentDate).toHaveBeenCalledTimes(1);
            expect(dateUtils.getStartOfDay).toHaveBeenCalledTimes(1);
        });
    });

    describe('Get date difference', () => {
        it('2018-11-19, 2018-11-17', () => {
            expect(dateUtils.getDateDifference(new Date('2018-11-19'), new Date('2018-11-17'))).toBe(172800000);
        });
    });

    describe('Get minutes for today', () => {
        it('Minutes for today', () => {
            dateUtils.getCurrentDate = jest.fn(() => new Date('2018-11-19 10:56:41'));

            expect(dateUtils.getMinutesForToday()).toBe(56);
            expect(dateUtils.getCurrentDate).toHaveBeenCalledTimes(1);
        });
    });

    describe('Set minutes for today', () => {
        it('Minutes for today', () => {
            dateUtils.getCurrentDate = jest.fn(() => new Date('2018-11-19 10:56:41'));

            expect(dateUtils.setMinutesForToday(11)).toEqual(new Date('2018-11-19 10:11:41'));
            expect(dateUtils.getCurrentDate).toHaveBeenCalledTimes(1);
        });
    });

    describe('Add months', () => {
        it('2018-11-19, 2 months', () => {
            expect(dateUtils.addMonths(new Date('2018-11-19'), 2)).toEqual(new Date('2019-01-19'));
        });
    });

    describe('Add days', () => {
        it('2018-11-19 (Date), 3 days', () => {
            expect(dateUtils.addDays(new Date('2018-11-19'), 3)).toEqual(new Date('2018-11-22'));
        });

        it('2018-11-19 (string), 3 days', () => {
            expect(dateUtils.addDays('2018-11-19', 3)).toEqual(new Date('2018-11-22'));
        });
    });

    describe('Add hours', () => {
        it('2018-11-19 10:42:07, 4 hours', () => {
            expect(dateUtils.addHours(new Date('2018-11-19 10:42:07'), 4)).toEqual(new Date('2018-11-19 14:42:07'));
        });
    });

    describe('Add minutes', () => {
        it('2018-11-19 10:42:07, 4 minutes', () => {
            expect(dateUtils.addMinutes(new Date('2018-11-19 10:42:07'), 4)).toEqual(new Date('2018-11-19 10:46:07'));
        });
    });

    describe('Subtract days', () => {
        it('2018-11-19 10:42:07 (Date), 2 days', () => {
            expect(dateUtils.subtractDays(new Date('2018-11-19 10:42:07'), 2)).toEqual(new Date('2018-11-17 10:42:07'));
        });

        it('2018-11-19 10:42:07 (string), 2 days', () => {
            expect(dateUtils.subtractDays('2018-11-19 10:42:07', 2)).toEqual(new Date('2018-11-17 10:42:07'));
        });
    });

    describe('Subtract hours', () => {
        it('2018-11-19 10:42:07, 3 hours', () => {
            const result = new Date('2018-11-19 07:42:07');
            expect(dateUtils.subtractHours(new Date('2018-11-19 10:42:07'), 3)).toEqual(result);
        });
    });

    describe('Is same or before', () => {
        it('2018-11-19, 2018-11-20 (Date)', () => {
            expect(dateUtils.isSameOrBefore(new Date('2018-11-19'), new Date('2018-11-19'))).toBe(true);
        });

        it('2018-11-20, 2018-11-19 (Date)', () => {
            expect(dateUtils.isSameOrBefore(new Date('2018-11-20'), new Date('2018-11-19'))).toBe(false);
        });

        it('2018-11-19, 2018-11-20 (string)', () => {
            expect(dateUtils.isSameOrBefore('2018-11-19', '2018-11-19')).toBe(true);
        });

        it('2018-11-20, 2018-11-19 (string)', () => {
            expect(dateUtils.isSameOrBefore('2018-11-20', '2018-11-19')).toBe(false);
        });
    });

    describe('Is same year', () => {
        it('2018-11-20, 2018-11-19 (Date)', () => {
            expect(dateUtils.isSameYear(new Date('2018-11-20'), new Date('2018-11-19'))).toBe(true);
        });

        it('2016-11-20, 2018-11-19 (Date)', () => {
            expect(dateUtils.isSameYear(new Date('2016-11-20'), new Date('2018-11-19'))).toBe(false);
        });

        it('2018-11-20, 2018-11-19 (string)', () => {
            expect(dateUtils.isSameYear('2018-11-20', '2018-11-19')).toBe(true);
        });

        it('2016-11-20, 2018-11-19 (string)', () => {
            expect(dateUtils.isSameYear('2016-11-20', '2018-11-19')).toBe(false);
        });
    });

    describe('Is same month', () => {
        it('2018-11-20, 2018-11-19 (Date)', () => {
            expect(dateUtils.isSameMonth(new Date('2018-11-20'), new Date('2018-11-19'))).toBe(true);
        });

        it('2018-10-19, 2018-11-19 (Date)', () => {
            expect(dateUtils.isSameMonth(new Date('2018-10-19'), new Date('2018-11-19'))).toBe(false);
        });

        it('2018-11-20, 2018-11-19 (string)', () => {
            expect(dateUtils.isSameMonth('2018-11-20', '2018-11-19')).toBe(true);
        });

        it('2018-10-19, 2018-11-19 (string)', () => {
            expect(dateUtils.isSameMonth('2018-10-19', '2018-11-19')).toBe(false);
        });
    });

    describe('Is same day', () => {
        it('2018-11-19, 2018-11-19 (Date)', () => {
            expect(dateUtils.isSameDay(new Date('2018-11-19'), new Date('2018-11-19'))).toBe(true);
        });

        it('2018-11-20, 2018-11-19 (Date)', () => {
            expect(dateUtils.isSameDay(new Date('2018-11-20'), new Date('2018-11-19'))).toBe(false);
        });

        it('2018-11-19, 2018-11-19 (string)', () => {
            expect(dateUtils.isSameDay('2018-11-19', '2018-11-19')).toBe(true);
        });

        it('2018-11-20, 2018-11-19 (string)', () => {
            expect(dateUtils.isSameDay('2018-11-20', '2018-11-19')).toBe(false);
        });
    });

    describe('Is after', () => {
        it('2018-11-20, 2018-11-19 (Date)', () => {
            expect(dateUtils.isAfter(new Date('2018-11-20'), new Date('2018-11-19'))).toBe(true);
        });

        it('2018-11-18, 2018-11-19 (Date)', () => {
            expect(dateUtils.isAfter(new Date('2018-11-18'), new Date('2018-11-19'))).toBe(false);
        });

        it('2018-11-20, 2018-11-19 (string)', () => {
            expect(dateUtils.isAfter('2018-11-20', '2018-11-19')).toBe(true);
        });

        it('2018-11-18, 2018-11-19 (string)', () => {
            expect(dateUtils.isAfter('2018-11-18', '2018-11-19')).toBe(false);
        });
    });

    describe('Is before', () => {
        it('2018-11-18, 2018-11-19 (Date)', () => {
            expect(dateUtils.isBefore(new Date('2018-11-18'), new Date('2018-11-19'))).toBe(true);
        });

        it('2018-11-20, 2018-11-19 (Date)', () => {
            expect(dateUtils.isBefore(new Date('2018-11-20'), new Date('2018-11-19'))).toBe(false);
        });

        it('2018-11-18, 2018-11-19 (string)', () => {
            expect(dateUtils.isBefore('2018-11-18', '2018-11-19')).toBe(true);
        });

        it('2018-11-20, 2018-11-19 (string)', () => {
            expect(dateUtils.isBefore('2018-11-20', '2018-11-19')).toBe(false);
        });
    });
});
