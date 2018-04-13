export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOCATION = 'USER_LOCATION'
export const OVERRIDE_LOCATION = 'OVERRIDE_LOCATION'
export const loginAction = (user, dispatch) => {
  dispatch({
    type: USER_LOGIN,
    user
  })
}
export const logoutAction = (dispatch) => {
  dispatch({
    type: USER_LOGOUT
  })
}
export const userLocationAction = (user, dispatch) => {
  dispatch({
    type: USER_LOCATION,
    user
  })
}
export const overrideUserLocation = (user, dispatch) => {
  dispatch({
    type: OVERRIDE_LOCATION,
    user
  })
}
