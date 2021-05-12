import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import userReducer from './user.reducer';
import cartReducer from './cart.reducer';

export default combineReducers({
  productReducer,
  userReducer,
  cartReducer,
});
