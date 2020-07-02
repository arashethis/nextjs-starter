import { call, takeLatest, put } from 'redux-saga/effects';
import { getCount } from '../../apis/example';

const FETCH_COUNT_REQUEST = 'FETCH_COUNT_REQUEST';
const FETCH_COUNT_SUCCESS = 'FETCH_COUNT_SUCCESS';
const FETCH_COUNT_FAILURE = 'FETCH_COUNT_FAILURE';

export const fetchCountAction = () => ({
  type: FETCH_COUNT_REQUEST,
});

export function fetchCountReducer(state, action) {
  switch (action.type) {
    case FETCH_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
      };
    case FETCH_COUNT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function* fetchCount() {
  try {
    const data = yield call(getCount);
    yield put({ type: FETCH_COUNT_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: FETCH_COUNT_FAILURE, payload: err });
  }
}

export function* fetchCountWatcher() {
  yield takeLatest(FETCH_COUNT_REQUEST, fetchCount);
}
