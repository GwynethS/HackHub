import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/index';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);
