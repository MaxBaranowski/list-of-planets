import { createAction, props } from '@ngrx/store';

export const savePlanets = createAction(
  '[Planet] savePlanets',
  (payload: any) => ({payload})
);

export const getPlanets = createAction(
  '[Planet] GetPlanets',
  (payload: any) => ({payload})
);
