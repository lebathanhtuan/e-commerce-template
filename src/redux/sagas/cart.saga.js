import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getCartListSaga(action) {
  try {
    const { userId } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/orders',
      params: {
        userId,
        isPay: false,
      }
    });
    if (result.data.length === 0) {
      const newResult = yield axios({
        method: 'POST',
        url: 'http://localhost:3001/orders',
        data: {
          userId,
          isPay: false,
          carts: [],
        }
      });
      yield put({
        type: "GET_CART_LIST_SUCCESS",
        payload: {
          data: newResult.data.carts,
          orderId: newResult.data.id,
        },
      });
    } else {
      yield put({
        type: "GET_CART_LIST_SUCCESS",
        payload: {
          data: result.data[0].carts,
          orderId: result.data[0].id,
        },
      });
    }
  } catch (e) {
    yield put({
      type: "GET_CART_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* addToCartSaga(action) {
  try {
    const { orderId, carts } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/orders/${orderId}`,
      data: {
        carts: carts,
      }
    });
    yield put({
      type: "ADD_TO_CART_SUCCESS",
      payload: {
        data: result.data.carts,
        orderId: orderId,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_TO_CART_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery('GET_CART_LIST_REQUEST', getCartListSaga);
  yield takeEvery('ADD_TO_CART_REQUEST', addToCartSaga);
}
