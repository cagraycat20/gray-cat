import { dateUtils } from '../../../web-ui/src/shared';
import { DBUser } from '../types';

const userTemplate = {
  creationTime: dateUtils.getCurrentUnixTime(),
  lastUpdateTime: dateUtils.getCurrentUnixTime(),
};

export const users: Array<DBUser> = [
  {
    ...userTemplate,
    userId: 'evgsil@gmail.com',
    isAdmin: true,
    settingItems: [],
  },
  {
    ...userTemplate,
    userId: 'thebiktop@gmail.com',
    isAdmin: true,
    settingItems: [],
  },
  {
    ...userTemplate,
    userId: 'gray.cat.user@gmail.com',
    isAdmin: true,
    settingItems: [],
  },
  {
    ...userTemplate,
    userId: 'andriy.prudyus@gmail.com',
    isAdmin: true,
    settingItems: [],
  },
];
