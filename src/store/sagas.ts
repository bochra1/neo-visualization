import { all } from 'redux-saga/effects';
import { watchFetchAPISaga } from './visualisation/apiSaga';

export default function* rootSaga() {
  yield all([watchFetchAPISaga()]);
}
