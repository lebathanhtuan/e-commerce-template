import { useEffect } from 'react';
import { connect } from 'react-redux';
import Router from './Router';

import {
  getUserInfoAction,
  // getCartListAction,
} from './redux/actions';

function App({ getUserInfo, getCartList }) {
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.id) {
      getUserInfo({ id: userInfo.id });
    }
    // Dùng với kiểu không cần đăng nhập mà vẫn bỏ vào giỏ hàng được
    // getCartList();
  }, []);

  return (
    <div>
      <Router />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    // Dùng với kiểu không cần đăng nhập mà vẫn bỏ vào giỏ hàng được
    // getCartList: (params) => dispatch(getCartListAction(params)),
  };
}

export default connect(null, mapDispatchToProps)(App);
