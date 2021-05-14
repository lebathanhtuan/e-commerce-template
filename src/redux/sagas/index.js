import { fork } from 'redux-saga/effects';

import adminProductSaga from './admin/product.saga';

import userSaga from './user/user.saga';
import productSaga from './user/product.saga';
import cartSaga from './user/cart.saga';

export default function* mySaga() {
  yield fork(adminProductSaga);
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(cartSaga);
}
