interface ClassMap {
  [key: string]: boolean | undefined | null;
}

export function csn(...classes: Array<string|null|undefined|ClassMap|false>): string {
  return classes.map((item) => {
    if (item) {
      if (typeof item === 'object') {
        return Object.keys(item as ClassMap).filter((key) => (item as ClassMap)[key]).join(' ');
      } else {
        return item;
      }
    } else {
      return '';
    }
  }).filter((item) => item).join(' ');
}
