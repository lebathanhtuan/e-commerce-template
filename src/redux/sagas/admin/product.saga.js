import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductListAdminSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/products',
      params: {
        _expand: 'category',
        _embed: 'productOptions',
      }
    });
    yield put({
      type: "ADMIN/GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADMIN/GET_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getCategoryListAdminSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/categories',
    });
    yield put({
      type: "ADMIN/GET_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADMIN/GET_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* createProductAdminSaga(action) {
  try {
    const { name, categoryId, price } = action.payload;
    const createResult = yield axios({
      method: 'POST',
      url: 'http://localhost:3001/products',
      data: {
        name,
        categoryId,
        price,
      }
    });
    yield put({ type: "ADMIN/GET_PRODUCT_LIST_REQUEST" });
    yield put({
      type: "ADMIN/CREATE_PRODUCT_SUCCESS",
      payload: {
        data: createResult.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADMIN/CREATE_PRODUCT_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* editProductAdminSaga(action) {
  try {
    const { id, name, categoryId } = action.payload;
    const editResult = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/products/${id}`,
      data: {
        name,
        categoryId,
      }
    });
    yield put({ type: "ADMIN/GET_PRODUCT_LIST_REQUEST" });
    yield put({
      type: "ADMIN/EDIT_PRODUCT_SUCCESS",
      payload: {
        data: editResult.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADMIN/EDIT_PRODUCT_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteProductAdminSaga(action) {
  try {
    const { id } = action.payload;
    yield axios({
      method: 'DELETE',
      url: `http://localhost:3001/products/${id}`,
    });
    yield put({ type: "ADMIN/GET_PRODUCT_LIST_REQUEST" });
    yield put({
      type: "ADMIN/DELETE_PRODUCT_SUCCESS",
      payload: {},
    });
  } catch (e) {
    yield put({
      type: "ADMIN/DELETE_PRODUCT_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* createOptionAdminSaga(action) {
  try {
    const { productId, title, price } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3001/productOptions',
      data: {
        productId,
        title,
        price,
      }
    });
    yield put({
      type: "ADMIN/CREATE_OPTION_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield put({ type: "ADMIN/GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "ADMIN/CREATE_OPTION_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* editOptionAdminSaga(action) {
  try {
    const { id, productId, title, price } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/productOptions/${id}`,
      data: {
        productId,
        title,
        price,
      }
    });
    yield put({
      type: "ADMIN/EDIT_OPTION_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield put({ type: "ADMIN/GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "ADMIN/EDIT_OPTION_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteOptionAdminSaga(action) {
  try {
    const { id } = action.payload;
    yield axios({
      method: 'DELETE',
      url: `http://localhost:3001/productOptions/${id}`,
    });
    yield put({
      type: "ADMIN/DELETE_OPTION_SUCCESS",
      payload: {
        data: { id },
      },
    });
    yield put({ type: "ADMIN/GET_PRODUCT_LIST_REQUEST" });
  } catch (e) {
    yield put({
      type: "ADMIN/DELETE_OPTION_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* adminProductSaga() {
  yield takeEvery('ADMIN/GET_PRODUCT_LIST_REQUEST', getProductListAdminSaga);
  yield takeEvery('ADMIN/GET_CATEGORY_LIST_REQUEST', getCategoryListAdminSaga);
  yield takeEvery('ADMIN/CREATE_PRODUCT_REQUEST', createProductAdminSaga);
  yield takeEvery('ADMIN/EDIT_PRODUCT_REQUEST', editProductAdminSaga);
  yield takeEvery('ADMIN/DELETE_PRODUCT_REQUEST', deleteProductAdminSaga);
  yield takeEvery('ADMIN/CREATE_OPTION_REQUEST', createOptionAdminSaga);
  yield takeEvery('ADMIN/EDIT_OPTION_REQUEST', editOptionAdminSaga);
  yield takeEvery('ADMIN/DELETE_OPTION_REQUEST', deleteOptionAdminSaga);
}
