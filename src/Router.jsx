import { Router, Switch, Route } from 'react-router-dom';
// utils
import history from './utils/history';
// components
import LoginLayout from './components/layouts/LoginLayout';
import DefaultLayout from './components/layouts/DefaultLayout';
import PrivateLayout from './components/layouts/PrivateLayout';

import UserProductListPage from './pages/user/ProductList';
import UserProductDetailPage from './pages/user/ProductDetail';
import UserCartListPage from './pages/user/CartList';

import AdminProductListPage from './pages/admin/ProductList';

import LoginPage from './pages/Login';

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path="/" component={UserProductListPage} />
        <DefaultLayout exact path="/product/:id" component={UserProductDetailPage} />
        <DefaultLayout exact path="/carts" component={UserCartListPage} />
        <PrivateLayout exact path="/admin/products" component={AdminProductListPage} />
        <LoginLayout exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default BrowserRouter;
