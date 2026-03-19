import { dateUtils } from '../../web-ui/src/shared';
import { mergeFreshUsi } from '../../web-ui/src/shared/utils/merge.utils';
import { db } from './lib/db-client';
import { createHandler } from './lib/lambda-handler';
import { getUser, HttpError, putUser } from './lib/util';
import {
  DBUser,
  Omit,
  RemoteSettings,
  UserSettingsView,
  UsiBodyWeightPoint,
  UsiFavorite,
  UsiMeal,
  UsiPrice,
  UsiUnion,
} from './types';

type RemoteSettingsSimple = Omit<RemoteSettings, 'view'>;

function convertOldSettings(user: DBUser) {
  // temporary convert function
  try {
    // tslint:disable-next-line:no-any
    const oldSettings = (user as any).settings as UserSettingsView;
    if (oldSettings) {
      const convertedItems: Array<UsiUnion> = [];
      convertedItems.push(
        ...oldSettings.bodyWeightPoints.map(
          (bwp) =>
            ({
              kind: 'bodyWeightPoint',
              id: bwp.date,
              value: bwp,
            }) as UsiBodyWeightPoint,
        ),
      );

      convertedItems.push(
        ...oldSettings.favorites.map(
          (fav) =>
            ({
              kind: 'favorite',
              id: fav,
              value: fav,
            }) as UsiFavorite,
        ),
      );

      convertedItems.push(
        ...oldSettings.meals.map(
          (meal) =>
            ({
              kind: 'meal',
              id: String(meal),
              value: meal,
            }) as UsiMeal,
        ),
      );

      convertedItems.push(
        ...oldSettings.prices.map(
          (pi) =>
            ({
              kind: 'price',
              id: pi.productId,
              value: pi,
            }) as UsiPrice,
        ),
      );

      user.settingItems = mergeFreshUsi(user.settingItems || [], convertedItems);

      // tslint:disable-next-line:no-any
      delete (user as any).settings;
    }
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error('convertOldSettings', e);
  }
}

export const handler = createHandler<RemoteSettingsSimple>(
  { required: true },
  {
    post: async (req) => {
      const { userId, body } = req;

      if (typeof body !== 'object') {
        throw new HttpError(400, 'Expected object');
      }

      let user = await getUser(db, { userId });
      const newUser = !user;

      const newSettings = body as RemoteSettingsSimple;

      if (!user) {
        user = await putUser(db, {
          userId,
          isAdmin: false,
          settingItems: newSettings.items,
          creationTime: dateUtils.getCurrentUnixTime(),
          lastUpdateTime: dateUtils.getCurrentUnixTime(),
        });
      } else {
        convertOldSettings(user);
        user = await putUser(db, {
          ...user,
          settingItems: mergeFreshUsi(user.settingItems || [], newSettings.items),
          lastUpdateTime: dateUtils.getCurrentUnixTime(),
        });
      }

      return {
        items: user.settingItems.filter((item) => !item.deleted), // return back only non deleted items
        isAdmin: user.isAdmin,
        newUser,
      };
    },
  },
);
