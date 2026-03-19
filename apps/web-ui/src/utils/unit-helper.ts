import { BodyWeightUnit } from '../types';

const coefficient = 0.45359237;

class UnitHelper {

    public convertKgToLbs(value: number): number {
        return value / coefficient;
    }

    public convertLbsToKg(value: number): number {
        return value * coefficient;
    }

    public getValue(value: number, inputUnit: BodyWeightUnit, outputUnit: BodyWeightUnit) {
        if (inputUnit === outputUnit) {
            return value;
        }

        return outputUnit === 'kg' ? this.convertLbsToKg(value) : this.convertKgToLbs(value);
    }

    public getBodyWeightUnitTitle(bodyWeightUnit: BodyWeightUnit): string {
        return bodyWeightUnit.charAt(0).toUpperCase() + bodyWeightUnit.slice(1);
    }
}

export const unitHelper = new UnitHelper();
