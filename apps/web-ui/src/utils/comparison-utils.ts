class ComparisonUtils {

  public areArraysEqual<T>(
    array1: Array<T>,
    array2: Array<T>,
    comparer?: (item1: T, item2: T) => boolean,
  ): boolean {
    if (array1 && array2 && array1.length === array2.length) {
      for (let index = 0; index < array1.length; index++) {
        if (comparer) {
          if (!comparer(array1[index], array2[index])) {
            return false;
          }
        } else if (array1[index] !== array2[index]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  // shallow comparison (1st level only)
  public areObjectsEqual<T extends {}>(
    object1: T,
    object2: T,
    comparer: (
      property1: T[keyof T],
      property2: T[keyof T],
    ) => boolean,
  ): boolean {
    if (object1 === object2) {
      return true;
    }

    const obj1Keys = Object.keys(object1);
    const obj2Keys = Object.keys(object2);

    if (obj1Keys.length !== obj2Keys.length) {
      return false;
    }

    for (const key of obj1Keys) {
      if (object1.hasOwnProperty(key)) {
        if (!comparer(object1[key], object2[key])) {
          return false;
        }
      }
    }
    return true;
  }
}

export const comparisonUtils = new ComparisonUtils();
