import { fork } from 'redux-saga/effects';

import userSaga from './user.saga';
import productSaga from './product.saga';
import cartSaga from './cart.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(cartSaga);
}
