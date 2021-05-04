import { fork } from 'redux-saga/effects';

import userSaga from './user.saga';
import productSaga from './product.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(productSaga);
}
