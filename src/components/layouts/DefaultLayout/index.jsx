import { Route } from 'react-router-dom';
import Header from '../Header';

import * as Style from './styles';

function DefaultLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header {...routeProps} />
            <Style.MainContainer>
              <Component {...other} {...routeProps} />
            </Style.MainContainer>
          </>
        )
      }}
    />
  );
}

export default DefaultLayout;
