import { UsiUnion } from '../types';

interface LastModified {
  lastModified?: number;
}

export function isFreshOrEqual(newEntity: LastModified, oldEntity?: LastModified): boolean {
  const newLastModified = newEntity.lastModified || 0;
  const oldLastModified = oldEntity ? oldEntity.lastModified || 0 : 0;
  return newLastModified >= oldLastModified;
}

export function isFresh(newEntity: LastModified, oldEntity?: LastModified): boolean {
  const newLastModified = newEntity.lastModified || 0;
  const oldLastModified = oldEntity ? oldEntity.lastModified || 0 : 0;
  return newLastModified > oldLastModified;
}

export function mergeFreshUsi(oldItems: Array<UsiUnion>, newItems: Array<UsiUnion>): Array<UsiUnion> {
  const getId = (item: UsiUnion) => `${item.kind}_${item.id || ''}`;
  const findItem = (item: UsiUnion, items: Array<UsiUnion>) => items.find((value) => getId(value) === getId(item));

  const freshOldItems = oldItems.filter(
    (item) => {
      const newItem = findItem(item, newItems);
      return !(newItem && isFresh(newItem, item));
    },
  );

  const freshNewItems = newItems.filter(
    (item) => {
      const oldItem = findItem(item, oldItems);
      return !(oldItem && isFreshOrEqual(oldItem, item));
    },
  );

  return [...freshOldItems, ...freshNewItems];
}
