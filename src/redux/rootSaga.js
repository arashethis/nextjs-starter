import { all, fork } from 'redux-saga/effects';
import { getSagas } from './utils-redux';

const sagas = getSagas();

function* rootSaga() {
  try {
    yield all(sagas.map(fork));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error in rootSaga.js:', err);
  }
}

export default rootSaga;
