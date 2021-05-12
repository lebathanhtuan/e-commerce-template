import { connect } from 'react-redux';
import { Space, Button } from 'antd';

import history from '../../../utils/history';

function Header({ userInfo, cartList }) {
  return (
    <div>
      {userInfo.data.id 
        ? (
          <Space>
            <p>{`Tên đăng nhập: ${userInfo.data.name}`}</p>
            <p>{`Giỏ hàng: ${cartList.data.length}`}</p>
            <Button>Đăng xuất</Button>
          </Space>
        )
        : <Button onClick={() => history.push('/login')}>Đăng nhập</Button>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { cartList } = state.cartReducer;
  return {
    userInfo,
    cartList,
  }
};

export default connect(mapStateToProps)(Header);
