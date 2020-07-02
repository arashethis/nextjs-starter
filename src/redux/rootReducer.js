import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import { getReducers } from './utils-redux';

const reducers = getReducers();

function reducer(state = {}, action) {
  switch (action.type) {
    case HYDRATE: {
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}

export default combineReducers({
  root: reducer,
  ...reducers,
});
