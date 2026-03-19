import { Action } from 'redux';
import { Epic, EpicMiddleware } from 'redux-observable';
import { StoreState } from '.';

export type GcEpicMiddleWare = EpicMiddleware<Action, Action, StoreState>;
export type GcEpic = Epic<Action, Action, StoreState>;
