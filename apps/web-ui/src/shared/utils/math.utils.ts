class MathUtils {
  public round(value: number, precision: number = 1): number {
    const base = Math.pow(10, precision);
    return Math.round(value * base) / base;
  }

  public formatValue = (value: number, precision: number = 1) => {
    if (value >= 100000) {
      return Math.floor(value / 1000) + 'M';
    }
    if (value >= 10000) {
      return Math.floor(value / 1000) + 'K';
    }
    if (value >= 1000) {
      return Math.floor(value);
    }
    return mathUtils.round(value, precision);
  }
}

export const mathUtils = new MathUtils();
