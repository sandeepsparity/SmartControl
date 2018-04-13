export const LOCATION = 'LOCATION';
export const locationAction = (location, dispatch) => {
  dispatch({
      type: LOCATION,
      location
  })
}