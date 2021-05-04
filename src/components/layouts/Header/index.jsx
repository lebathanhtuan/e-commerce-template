import { connect } from 'react-redux';
import { Space, Button } from 'antd';

import history from '../../../utils/history';

function Header({ userInfo }) {
  return (
    <div>
      {userInfo.data.id 
        ? (
          <Space>
            <p>{`Tên đăng nhập: ${userInfo.data.name}`}</p>
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
  console.log('🚀 ~ file: index.jsx ~ line 13 ~ mapStateToProps ~ userInfo', userInfo);
  return {
    userInfo,
  }
};

export default connect(mapStateToProps)(Header);
