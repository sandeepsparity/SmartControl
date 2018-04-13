import { USER_LOGIN, USER_LOCATION, OVERRIDE_LOCATION } from '../actions/user'
export const userReducer = (state = {}, { user, type }) => {
  switch (type) {
    case USER_LOCATION:
    case OVERRIDE_LOCATION:
      return { ...state, ...user }
    case USER_LOGIN:
      return { ...user }
    default:
      return state
  }
}
