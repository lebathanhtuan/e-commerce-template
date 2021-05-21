import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';

import * as Style from './styles';

function PrivateLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.id) {
    if (userInfo.role !== 'admin') {
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header {...routeProps} />
            <Sidebar {...routeProps} />
            <Style.MainContainer>
              <Component {...other} {...routeProps} />
            </Style.MainContainer>
          </>
        )
      }}
    />
  );
}

export default PrivateLayout;
