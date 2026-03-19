import 'jest';
import { mathUtils } from './math.utils';

describe('Round', () => {
    it('-10 without precision equals -10', () => {
        expect(mathUtils.round(-10)).toBe(-10);
    });

    it('0 without precision equals 0', () => {
        expect(mathUtils.round(0)).toBe(0);
    });

    it('10 without precision equals 10', () => {
        expect(mathUtils.round(10)).toBe(10);
    });

    it('-10 with precision 5 equals -10', () => {
        expect(mathUtils.round(-10, 5)).toBe(-10);
    });

    it('0 with precision 5 equals 5', () => {
        expect(mathUtils.round(0, 5)).toBe(0);
    });

    it('10 with precision 5 equals 10', () => {
        expect(mathUtils.round(10, 5)).toBe(10);
    });

    it('-10.123456789 without precision equals -10.1', () => {
        expect(mathUtils.round(-10.123456789)).toBe(-10.1);
    });

    it('10.123456789 without precision equals 10.1', () => {
        expect(mathUtils.round(10.123456789)).toBe(10.1);
    });

    it('-10.123456789 with precision 5 equals -10.12346', () => {
        expect(mathUtils.round(-10.123456789, 5)).toBe(-10.12346);
    });

    it('10.123456789 with precision 5 equals 10.12346', () => {
        expect(mathUtils.round(10.123456789, 5)).toBe(10.12346);
    });

    it('-10.123456789 with precision 2 equals -10.12', () => {
        expect(mathUtils.round(-10.123456789, 2)).toBe(-10.12);
    });

    it('10.123456789 with precision 2 equals 10.12', () => {
        expect(mathUtils.round(10.123456789, 2)).toBe(10.12);
    });
});
