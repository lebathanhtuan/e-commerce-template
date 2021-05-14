import { connect } from 'react-redux';
import { Space, Button } from 'antd';

import history from '../../../utils/history';

import * as Style from './styles';

function Header({ userInfo, cartList }) {
  return (
    <Style.HeaderContainer>
      <h3>Brand</h3>
      {userInfo.data.id 
        ? (
          <Space>
            <p>{`Tên đăng nhập: ${userInfo.data.name}`}</p>
            <p onClick={() => history.push('/carts')}>{`Giỏ hàng: ${cartList.data.length}`}</p>
            <Button>Đăng xuất</Button>
          </Space>
        )
        : (
          <Space size={32}>
            <Button onClick={() => history.push('/login')}>Đăng nhập</Button>
          </Space>
        )
      }
    </Style.HeaderContainer>
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
