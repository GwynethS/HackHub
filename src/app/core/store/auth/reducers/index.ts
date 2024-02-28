import { createReducer, on } from "@ngrx/store";
import { User } from "../../../../layouts/dashboard/pages/users/models/user";
import { AuthAction } from "../actions";

export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
}

export const AuthReducer = createReducer(
  initialState,
  on(AuthAction.setAuthUser, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(AuthAction.logout, () => initialState)
);