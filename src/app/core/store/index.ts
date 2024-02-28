import { AuthReducer, authFeatureKey } from './auth/reducers/index';
export const appReducers = {
  [authFeatureKey]: AuthReducer
}