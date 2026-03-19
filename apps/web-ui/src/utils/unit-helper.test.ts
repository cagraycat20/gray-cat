import 'jest';
import { unitHelper } from './unit-helper';

describe('Unit helper', () => {
    const coefficient = 0.45359237;

    describe('Kg to lbs', () => {
        it('0 kg', () => {
            expect(unitHelper.convertKgToLbs(10)).toBe(10 / coefficient);
        });

        it('100 kg', () => {
            expect(unitHelper.convertKgToLbs(100)).toBe(100 / coefficient);
        });
    });

    describe('Lbs to kg', () => {
        it('0 lbs', () => {
            expect(unitHelper.convertLbsToKg(10)).toBe(10 * coefficient);
        });

        it('100 lbs', () => {
            expect(unitHelper.convertLbsToKg(100)).toBe(100 * coefficient);
        });
    });

    describe('Get value', () => {
        it('Input - 0 kg, output - kg', () => {
            expect(unitHelper.getValue(0, 'kg', 'kg')).toBe(0);
        });

        it('Input - 100 kg, output - kg', () => {
            expect(unitHelper.getValue(100, 'kg', 'kg')).toBe(100);
        });

        it('Input - 0 lbs, output - lbs', () => {
            expect(unitHelper.getValue(0, 'lb', 'lb')).toBe(0);
        });

        it('Input - 100 lbs, output - lbs', () => {
            expect(unitHelper.getValue(100, 'lb', 'lb')).toBe(100);
        });

        it('Input - 0 kg, output - lbs', () => {
            expect(unitHelper.getValue(0, 'kg', 'lb')).toBe(0);
        });

        it('Input - 0 lbs, output - kg', () => {
            expect(unitHelper.getValue(0, 'lb', 'kg')).toBe(0);
        });

        it('Input - 100 kg, output - lbs', () => {
            unitHelper.convertKgToLbs = jest.fn(() => 200);

            expect(unitHelper.getValue(100, 'kg', 'lb')).toBe(200);
            expect(unitHelper.convertKgToLbs).toHaveBeenCalledTimes(1);
        });

        it('Input - 100 lbs, output - kg', () => {
            unitHelper.convertLbsToKg = jest.fn(() => 50);

            expect(unitHelper.getValue(100, 'lb', 'kg')).toBe(50);
            expect(unitHelper.convertLbsToKg).toHaveBeenCalledTimes(1);
        });
    });
});
