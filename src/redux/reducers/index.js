import { combineReducers } from 'redux';

import adminProductReducer from './admin/product.reducer';

import productReducer from './user/product.reducer';
import userReducer from './user/user.reducer';
import cartReducer from './user/cart.reducer';

export default combineReducers({
  adminProductReducer,
  productReducer,
  userReducer,
  cartReducer,
});
