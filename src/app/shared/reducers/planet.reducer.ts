import { createReducer, on } from '@ngrx/store';
import { getPlanets, savePlanets } from '../actions/planet.actions';

export const initialState = {
  planets: [],
  page: 1,
  pageAmount: null,
  planetsPerPage: null
};

export const reducer = createReducer(
  initialState,
  on(savePlanets, (state, {payload}) => ({
    ...state,
    page: payload.page,
    pageAmount: payload.pageAmount,
    planetsPerPage: payload.planetsPerPage,
    planets: payload.planets
  })),
  on(getPlanets, state => state)
);

