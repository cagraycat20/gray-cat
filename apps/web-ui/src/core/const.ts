import { Hint } from '../types';

export type HintType = 'test';
export const hints: Map<HintType, Hint> = new Map([
  ['test', { id: 1, image: 'image-gag', title: 'Test hint' }],
  // Add here incrementing id
]);
