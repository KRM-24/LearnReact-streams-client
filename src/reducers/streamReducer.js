import _ from 'lodash';
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // mapKeys transforms an array of objects to an object of objects with a key of 'id',
      //   which comes from the 'id' of the object in the array
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      // using key interpolation (i.e. [action.payload.id]) to specify the key dynamically
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      // the payload is the id
      return _.omit(state, action.payload);
    default:
      return state;
  }
}