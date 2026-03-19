import { dateUtils } from '..';
import {
  BodyWeightPoint,
  ConsumedProduct,
  DayInfo,
  Product,
} from '../../types';

interface BodyWeightInfo {
  date: string;
  bodyWeight: number;
  desiredBodyWeight: number;
}

interface TimeDetails {
  hours: number;
  minutes: number;
  suffix: string;
}

const minutesInHour = 60;

class DayInfoHelper {

  public getDayBodyWeightInfo(date: string, weightInfo: Array<BodyWeightPoint>): BodyWeightInfo {
    const result: BodyWeightPoint = {
      date,
      bodyWeight: 0 ,
      desiredBodyWeight: 0,
    };

    if (weightInfo.length > 0) {
      let foundBodyWeight = false;
      let foundDesiredBodyWeight = false;

      if (dateUtils.isAfter(date, weightInfo[weightInfo.length - 1].date)) {

        for (let index = weightInfo.length - 1; index >= 0; index--) {
          if (!foundBodyWeight && weightInfo[index].bodyWeight !== undefined) {
            result.bodyWeight = weightInfo[index].bodyWeight;
            foundBodyWeight = true;
          }
          if (!foundDesiredBodyWeight && weightInfo[index].desiredBodyWeight !== undefined) {
            result.desiredBodyWeight = weightInfo[index].desiredBodyWeight;
            foundDesiredBodyWeight = true;
          }
          if (foundBodyWeight && foundDesiredBodyWeight) {
            break;
          }
        }
      } else if (dateUtils.isBefore(date, weightInfo[0].date)) {

          for (const weightInfoIter of weightInfo) {
            if (!foundBodyWeight && weightInfoIter.bodyWeight !== undefined) {
              result.bodyWeight = weightInfoIter.bodyWeight;
              foundBodyWeight = true;
            }
            if (!foundDesiredBodyWeight && weightInfoIter.desiredBodyWeight !== undefined) {
              result.desiredBodyWeight = weightInfoIter.desiredBodyWeight;
              foundDesiredBodyWeight = true;
            }
            if (foundBodyWeight && foundDesiredBodyWeight) {
              break;
            }
          }
      } else {
        for (const weightInfoIter of weightInfo) {
          if (dateUtils.isBefore(date, weightInfoIter.date)) {
            break;
          }
          if (weightInfoIter.bodyWeight !== undefined) {
            result.bodyWeight = weightInfoIter.bodyWeight;
          }
          if (weightInfoIter.desiredBodyWeight !== undefined) {
            result.desiredBodyWeight = weightInfoIter.desiredBodyWeight;
          }
        }
      }
    }
    return result as BodyWeightInfo;
  }

  public findDayWeightInfo = (date: string, weightInfo: Array<BodyWeightPoint>) =>
    weightInfo.find((iter) => iter.date === date)

  public findDay = (date: string, days: Array<DayInfo>) => {
    for (let index = days.length - 1; index >= 0; index--) {
      if (days[index].date === date) {
        return days[index];
      }
    }
    return undefined;
  }

  public findConsumedIndex(
    productId: Product['id'],
    mealTime: number | undefined,
    consumedProducts: Array<ConsumedProduct>,
  ) {
    return consumedProducts.findIndex((iter) =>
      ((iter.productId === productId) &&
      dayInfoHelper.sameMealTime(mealTime, iter.time)),
    );
  }

  public sameMealTime(meal1: number | undefined, meal2: number | undefined) {
    return (meal1 || 0) === (meal2 || 0);
  }

  public padTimeUnitWithZero = (value: number) => {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  }

  public mealTimeDetails(mealTime: number): TimeDetails {
    let hours = Math.floor(mealTime / minutesInHour);
    let suffix = ' AM';
    if (hours >= 12) {
      if (hours > 12) {
        hours = hours - 12;
      }
      suffix = ' PM';
    }
    const minutes = mealTime % minutesInHour;

    if (!hours && !minutes) {
      suffix = ' Midnight';
    } else if (hours === 12 && !minutes) {
      suffix = ' Noon';
    }

    return {
      hours,
      minutes,
      suffix,
    };
  }

  public formatMealTime(mealTime: number): string {
    const {hours, minutes, suffix} = this.mealTimeDetails(mealTime);
    const result =
      dayInfoHelper.padTimeUnitWithZero(hours) + ':' +
      dayInfoHelper.padTimeUnitWithZero(minutes) + suffix;
    return result;
  }

  public determineMeals(meals: Array<number>, day?: DayInfo): Array<number> {
    const result: Array<number> = [...meals];
    if (day && day.consumed.length > 0) {
      return day.consumed.reduce(this.mealsReduceCallback, result);
    }
    return result;
  }

  private mealsReduceCallback = (result: Array<number>, item: ConsumedProduct) => {
    const time = item.time ? item.time : 0;
    if (!result.find((iter) => iter === time)) {
      result.push(time);
    }
    return result;
  }
}

export const dayInfoHelper = new DayInfoHelper();
