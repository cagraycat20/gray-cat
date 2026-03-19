import 'jest';
import { comparisonUtils } from './comparison-utils';

describe('Comparison utils', () => {
    describe('Are arrays equal', () => {
        it('[], []', () => {
            expect(comparisonUtils.areArraysEqual([], [])).toBe(true);
        });

        it('[1, 2, 3], [1, 2]', () => {
            expect(comparisonUtils.areArraysEqual([1, 2, 3], [1, 2])).toBe(false);
        });

        it('[1, 2, 3], [1, 2, 3]', () => {
            expect(comparisonUtils.areArraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        });

        it('[1, 2, 3], [1, 2, 4]', () => {
            expect(comparisonUtils.areArraysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
        });

        it('[\'a\', \'b\', \'c\'], [\'a\', \'b\', \'c\']', () => {
            expect(comparisonUtils.areArraysEqual(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(true);
        });

        it('[\'a\', \'b\', \'c\'], [\'a\', \'b\', \'d\']', () => {
            expect(comparisonUtils.areArraysEqual(['a', 'b', 'c'], ['a', 'b', 'd'])).toBe(false);
        });

        it('With comparer (true)', () => {
            const array1 = [{a: 1}, {a: 2}, {a: 3}];
            const array2 = [{a: 1}, {a: 2}, {a: 3}];

            const comparer = jest.fn(() => true);

            expect(comparisonUtils.areArraysEqual(array1, array2, comparer)).toBe(true);
            expect(comparer).toHaveBeenCalledTimes(3);
        });

        it('With comparer (false)', () => {
            const array1 = [{a: 1}, {a: 2}, {a: 3}];
            const array2 = [{a: 1}, {a: 2}, {a: 3}];

            const comparer = jest.fn(() => false);

            expect(comparisonUtils.areArraysEqual(array1, array2, comparer)).toBe(false);
            expect(comparer).toHaveBeenCalledTimes(1);
        });
    });

    describe('Are objests equal', () => {
        it('{a: 1}, {a: 1}', () => {
            const comparer = jest.fn(() => true);

            expect(comparisonUtils.areObjectsEqual({a: 1}, {a: 1}, comparer)).toBe(true);
            expect(comparer).toHaveBeenCalledTimes(1);
        });

        it('{a: 1}, {a: 1, b: 1}', () => {
            const comparer = jest.fn(() => true);

            expect(comparisonUtils.areObjectsEqual({a: 1}, {a: 1, b: 1}, comparer)).toBe(false);
            expect(comparer).toHaveBeenCalledTimes(0);
        });

        it('\'1\', \'1\'', () => {
            const comparer = jest.fn(() => false);

            expect(comparisonUtils.areObjectsEqual('1', '1', comparer)).toBe(true);
            expect(comparer).toHaveBeenCalledTimes(0);
        });

        it('With comparer (true)', () => {
            const comparer = jest.fn(() => true);

            expect(comparisonUtils.areObjectsEqual('1', '2', comparer)).toBe(true);
            expect(comparer).toHaveBeenCalledTimes(1);
        });

        it('With comparer (false)', () => {
            const comparer = jest.fn(() => false);

            expect(comparisonUtils.areObjectsEqual('1', '2', comparer)).toBe(false);
            expect(comparer).toHaveBeenCalledTimes(1);
        });
    });
});
