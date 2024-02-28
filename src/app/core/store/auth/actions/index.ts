import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../../../layouts/dashboard/pages/users/models/user";

export const AuthAction = createActionGroup({
  source: 'Auth',
  events: {
    'Set auth user': props<{user: User}>(),
    'Logout': emptyProps(),
  }
})