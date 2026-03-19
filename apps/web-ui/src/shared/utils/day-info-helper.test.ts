import 'jest';
import { dayInfoHelper } from './day-info-helper';

jest.mock('./date-utils');
import { dateUtils } from './date-utils';

describe('Day info helper', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('Get day body weight info', () => {
        it('Array of body weight points is empty', () => {
            const result = { bodyWeight: 0, date: '2018-11-25', desiredBodyWeight: 0 };
            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-25', [])).toEqual(result);
        });

        // tslint:disable-next-line
        it('Date is after the date of the last point and the weight and desired weight of the last point do not equal 0', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 0 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            const result = { date: '2018-11-27', bodyWeight: 102, desiredBodyWeight: 106 };

            dateUtils.isBefore = jest.fn(() => false);
            dateUtils.isAfter = jest.fn(() => true);

            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-27', points)).toEqual(result);
            expect(dateUtils.isBefore).toHaveBeenCalledTimes(0);
            expect(dateUtils.isAfter).toHaveBeenCalledTimes(1);
        });

        // tslint:disable-next-line
        it('Date is after the date of the last point and the weight and desired weight of the last point equal 0', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 0 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 0, desiredBodyWeight: 0 },
            ];

            const result = { date: '2018-11-27', bodyWeight: 0, desiredBodyWeight: 0 };

            dateUtils.isAfter = jest.fn(() => true);
            dateUtils.isBefore = jest.fn(() => false);

            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-27', points)).toEqual(result);
            expect(dateUtils.isBefore).toHaveBeenCalledTimes(0);
            expect(dateUtils.isAfter).toHaveBeenCalledTimes(1);
        });

        it('Date is after the date of the last point and only the weight of the last point equals 0', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 0 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 0, desiredBodyWeight: 106 },
            ];

            const result = { date: '2018-11-27', bodyWeight: 0, desiredBodyWeight: 106 };

            dateUtils.isAfter = jest.fn(() => true);
            dateUtils.isBefore = jest.fn(() => false);

            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-27', points)).toEqual(result);
            expect(dateUtils.isBefore).toHaveBeenCalledTimes(0);
            expect(dateUtils.isAfter).toHaveBeenCalledTimes(1);
        });

        it('Date is after the date of the last point and only the desired weight of the last point equals 0', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 0 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 0 },
            ];

            const result = { date: '2018-11-27', bodyWeight: 102, desiredBodyWeight: 0 };

            dateUtils.isAfter = jest.fn(() => true);
            dateUtils.isBefore = jest.fn(() => false);

            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-27', points)).toEqual(result);
            expect(dateUtils.isBefore).toHaveBeenCalledTimes(0);
            expect(dateUtils.isAfter).toHaveBeenCalledTimes(1);
        });

        // tslint:disable-next-line
        it('Date is before the date of the first point and the weight and desired weight of the first point do not equal 0', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 104 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            const result = { date: '2018-11-21', bodyWeight: 100, desiredBodyWeight: 104 };

            dateUtils.isAfter = jest.fn(() => false);
            dateUtils.isBefore = jest.fn(() => true);

            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-21', points)).toEqual(result);
            expect(dateUtils.isBefore).toHaveBeenCalledTimes(1);
            expect(dateUtils.isAfter).toHaveBeenCalledTimes(1);
        });

        // tslint:disable-next-line
        it('Date is before the date of the first point and the weight and desired weight of the first point equal 0', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 0, desiredBodyWeight: 0 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            const result = { date: '2018-11-21', bodyWeight: 0, desiredBodyWeight: 0 };

            dateUtils.isAfter = jest.fn(() => false);
            dateUtils.isBefore = jest.fn(() => true);

            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-21', points)).toEqual(result);
            expect(dateUtils.isBefore).toHaveBeenCalledTimes(1);
            expect(dateUtils.isAfter).toHaveBeenCalledTimes(1);
        });

        it('Date is before the date of the first point and only the weight of the first point equals 0', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 0, desiredBodyWeight: 104 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            const result = { date: '2018-11-21', bodyWeight: 0, desiredBodyWeight: 104 };

            dateUtils.isAfter = jest.fn(() => false);
            dateUtils.isBefore = jest.fn(() => true);

            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-21', points)).toEqual(result);
            expect(dateUtils.isBefore).toHaveBeenCalledTimes(1);
            expect(dateUtils.isAfter).toHaveBeenCalledTimes(1);
        });

        it('Date is before the date of the first point and only the desired weight of the first point equals 0', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 0 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            const result = { date: '2018-11-21', bodyWeight: 100, desiredBodyWeight: 0 };

            dateUtils.isAfter = jest.fn(() => false);
            dateUtils.isBefore = jest.fn(() => true);

            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-21', points)).toEqual(result);
            expect(dateUtils.isBefore).toHaveBeenCalledTimes(1);
            expect(dateUtils.isAfter).toHaveBeenCalledTimes(1);
        });

        it('Date is within the date range of points', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 104 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            const result =  { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 };

            dateUtils.isAfter = jest.fn(() => false);
            dateUtils.isBefore = jest.fn(() => false);

            expect(dayInfoHelper.getDayBodyWeightInfo('2018-11-25', points)).toEqual(result);
            expect(dateUtils.isBefore).toHaveBeenCalledTimes(4);
            expect(dateUtils.isAfter).toHaveBeenCalledTimes(1);
        });
    });

    describe('Find day weight info', () => {
        it('A correct body weight point is the first item in an array', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 104 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            const result = { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 104 };

            expect(dayInfoHelper.findDayWeightInfo('2018-11-23', points)).toEqual(result);
        });

        it('A correct body weight point is the middle item in an array', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 104 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            const result = { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 };

            expect(dayInfoHelper.findDayWeightInfo('2018-11-24', points)).toEqual(result);
        });

        it('A correct body weight point is the final item in an array', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 104 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            const result = { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 };

            expect(dayInfoHelper.findDayWeightInfo('2018-11-25', points)).toEqual(result);
        });

        it('There is no a desired body weight point in an array', () => {
            const points = [
                { date: '2018-11-23', bodyWeight: 100, desiredBodyWeight: 104 },
                { date: '2018-11-24', bodyWeight: 101, desiredBodyWeight: 105 },
                { date: '2018-11-25', bodyWeight: 102, desiredBodyWeight: 106 },
            ];

            expect(dayInfoHelper.findDayWeightInfo('2018-11-26', points)).toBe(undefined);
        });
    });

    describe('Find day', () => {
        it('A correct day info is the first item in an array', () => {
            const days = [
                { date: '2018-11-23', consumed: [] },
                { date: '2018-11-24', consumed: [] },
                { date: '2018-11-25', consumed: [] },
            ];

            expect(dayInfoHelper.findDay('2018-11-23', days)).toEqual({ date: '2018-11-23', consumed: [] });
        });

        it('A correct day info is the middle item in an array', () => {
            const days = [
                { date: '2018-11-23', consumed: [] },
                { date: '2018-11-24', consumed: [] },
                { date: '2018-11-25', consumed: [] },
            ];

            expect(dayInfoHelper.findDay('2018-11-24', days)).toEqual({ date: '2018-11-24', consumed: [] });
        });

        it('A correct day info is the final item in an array', () => {
            const days = [
                { date: '2018-11-23', consumed: [] },
                { date: '2018-11-24', consumed: [] },
                { date: '2018-11-25', consumed: [] },
            ];

            expect(dayInfoHelper.findDay('2018-11-25', days)).toEqual({ date: '2018-11-25', consumed: [] });
        });

        it('There is no a desired day info in an array', () => {
            const days = [
                { date: '2018-11-23', consumed: [] },
                { date: '2018-11-24', consumed: [] },
                { date: '2018-11-25', consumed: [] },
            ];

            expect(dayInfoHelper.findDay('2018-11-27', days)).toBe(undefined);
        });
    });

    describe('Same meal time', () => {
        it('Meal times are equal if values are eqaul', () => {
            expect(dayInfoHelper.sameMealTime(1000, 1000)).toBe(true);
        });

        it('Meal times are not equal if values are different', () => {
            expect(dayInfoHelper.sameMealTime(1000, 1001)).toBe(false);
        });

        it('Meal times are equal if values are undefined', () => {
            expect(dayInfoHelper.sameMealTime(undefined, undefined)).toBe(true);
        });

        it('Meal times are not equal if the first value is undefined', () => {
            expect(dayInfoHelper.sameMealTime(undefined, 1000)).toBe(false);
        });

        it('Meal times are not equal if the second value is undefined', () => {
            expect(dayInfoHelper.sameMealTime(1000, undefined)).toBe(false);
        });
    });

    describe('Find consumed index', () => {
        it('An index of a consumed product is the first index in an array', () => {
            const products = [
                { productId: 'product1', productWeight: 100, time: 1000 },
                { productId: 'product2', productWeight: 200, time: 1001 },
                { productId: 'product3', productWeight: 300, time: 1002 },
            ];

            dayInfoHelper.sameMealTime = jest.fn(() => true);

            expect(dayInfoHelper.findConsumedIndex('product1', 1000, products)).toBe(0);
            expect(dayInfoHelper.sameMealTime).toHaveBeenCalledTimes(1);
        });

        it('An index of a consumed product is in the middle of an array', () => {
            const products = [
                { productId: 'product1', productWeight: 100, time: 1000 },
                { productId: 'product2', productWeight: 200, time: 1001 },
                { productId: 'product3', productWeight: 300, time: 1002 },
            ];

            dayInfoHelper.sameMealTime = jest.fn(() => true);

            expect(dayInfoHelper.findConsumedIndex('product2', 1001, products)).toBe(1);
            expect(dayInfoHelper.sameMealTime).toHaveBeenCalledTimes(1);
        });

        it('An index of a consumed product is the final index in an array', () => {
            const products = [
                { productId: 'product1', productWeight: 100, time: 1000 },
                { productId: 'product2', productWeight: 200, time: 1001 },
                { productId: 'product3', productWeight: 300, time: 1002 },
            ];

            dayInfoHelper.sameMealTime = jest.fn(() => true);

            expect(dayInfoHelper.findConsumedIndex('product3', 1002, products)).toBe(2);
            expect(dayInfoHelper.sameMealTime).toHaveBeenCalledTimes(1);
        });

        it('An index of a consumed product equals -1 because there are different meal times', () => {
            const products = [
                { productId: 'product1', productWeight: 100, time: 1000 },
                { productId: 'product2', productWeight: 200, time: 1001 },
                { productId: 'product3', productWeight: 300, time: 1002 },
            ];

            dayInfoHelper.sameMealTime = jest.fn(() => false);

            expect(dayInfoHelper.findConsumedIndex('product1', 1000, products)).toBe(-1);
            expect(dayInfoHelper.sameMealTime).toHaveBeenCalledTimes(1);
        });

        it('An index of a consumed product equals -1 because there is no such product id in an array', () => {
            const products = [
                { productId: 'product1', productWeight: 100, time: 1000 },
                { productId: 'product2', productWeight: 200, time: 1001 },
                { productId: 'product3', productWeight: 300, time: 1002 },
            ];

            dayInfoHelper.sameMealTime = jest.fn(() => true);

            expect(dayInfoHelper.findConsumedIndex('product4', 1000, products)).toBe(-1);
            expect(dayInfoHelper.sameMealTime).toHaveBeenCalledTimes(0);
        });
    });

    describe('Pad time unit with zero', () => {
        it('Pad number with zero', () => {
            expect(dayInfoHelper.padTimeUnitWithZero(9)).toBe('09');
        });

        it('Do not pad number with zero', () => {
            expect(dayInfoHelper.padTimeUnitWithZero(10)).toBe(10);
        });
    });

    describe('Format meal time', () => {
        it('Time 65', () => {
            expect(dayInfoHelper.formatMealTime(65)).toBe('01:05 AM');
        });

        it('Time 719', () => {
            expect(dayInfoHelper.formatMealTime(719)).toBe('11:59 AM');
        });

        it('Time 1089', () => {
            expect(dayInfoHelper.formatMealTime(1089)).toBe('06:09 PM');
        });
    });

    describe('Determine meals', () => {
        it('With empty array and without day info', () => {
            expect(dayInfoHelper.determineMeals([])).toEqual([]);
        });

        it('With not empty array but without day info', () => {
            expect(dayInfoHelper.determineMeals([10, 100, 1000])).toEqual([10, 100, 1000]);
        });

        it('With not empty array and with day info (array of cosumed products is empty)', () => {
            const dayInfo = { date: '2018-11-25', consumed: [] };
            expect(dayInfoHelper.determineMeals([10, 100, 1000], dayInfo)).toEqual([10, 100, 1000]);
        });

        it('With not empty array and with day info (array of cosumed products is not empty)', () => {
            const products = [
                { productId: 'product1', productWeight: 100, time: 1000 },
                { productId: 'product2', productWeight: 200, time: 1001 },
                { productId: 'product3', productWeight: 300, time: 1002 },
            ];

            const dayInfo = { date: '2018-11-25', consumed: products };

            expect(dayInfoHelper.determineMeals([10, 100, 999], dayInfo)).toEqual([10, 100, 999, 1000, 1001, 1002]);
        });
    });
});
