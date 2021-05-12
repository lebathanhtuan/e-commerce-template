import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Space, Card, InputNumber , Button } from 'antd';

import history from '../../../utils/history';

function CartListPage({
  getCartList,
  cartList
}) {
  function renderCartList(params) {
    return cartList.data.map((cartItem, cartIndex) => {
      return (
        <Card>
          <Space size={32}>
            <p>{cartItem.name}</p>
            <InputNumber value={cartItem.count} />
          </Space>
        </Card>
      )
    })
  }

  return (
    <div>
      {renderCartList()}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { cartList } = state.cartReducer;
  return {
    cartList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getCartList: (params) => dispatch(getCartListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartListPage);
