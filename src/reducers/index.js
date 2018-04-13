import { combineReducers } from 'redux'
import { userReducer } from './user'
import { USER_LOGOUT } from '../actions/user'

export default (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined
  }
  return combineReducers({ user: userReducer })(state, action)
}
