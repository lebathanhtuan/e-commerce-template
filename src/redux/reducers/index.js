import { combineReducers } from 'redux';

import adminCommonReducer from './admin/common.reducer';
import adminProductReducer from './admin/product.reducer';

import productReducer from './user/product.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './user/cart.reducer';

export default combineReducers({
  adminCommonReducer,
  adminProductReducer,
  productReducer,
  userReducer,
  cartReducer,
});
