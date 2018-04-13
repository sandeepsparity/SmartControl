import { LOCATION } from '../actions/location';
const initialState = {
  overrideLocation: null,
  isOverrideLocation : true
}

const locationReducer = (state = initialState, action) => {
  switch(action.type) {
  case LOCATION:
    return {...state, 
      overrideLocation:
      action.location.updatedLocation,
      isOverrideLocation: action.location.isOverrideLocation
    };
  default:
    return state; 
  }
}
export default locationReducer;
