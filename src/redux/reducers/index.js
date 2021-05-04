import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import userReducer from './user.reducer';

export default combineReducers({
  productReducer,
  userReducer,
});
