
import { useEffect, useState } from 'react';
import { Card, Radio, Button } from 'antd';
import { connect } from 'react-redux';

import {
  getProductDetailAction,
  addToCartAction,
} from '../../../redux/actions';

function ProductDetailPage({
  productDetail,
  getProductDetail,
  match,
  cartList,
  addToCart,
}) {
  const productId = match.params.id;
  const [optionSelected, setOptionSelected] = useState({});

  useEffect(() => {
    getProductDetail({ id: productId });
  }, [])

  useEffect(() => {
    if (productDetail.data.id) {
      setOptionSelected(productDetail.data.productOptions[0] || {})
    }
  }, [productDetail.data])

  function handleAddToCart() {
    if (optionSelected.id) {
      const existOptionIndex = cartList.data.findIndex((item) => item.option.id === optionSelected.id);
      if (existOptionIndex !== -1) {
        const newCart = cartList.data;
        newCart.splice(existOptionIndex, 1, {
          productId: parseInt(productId),
          count: cartList.data[existOptionIndex].count + 1,
          name: productDetail.data.name,
          price: productDetail.data.price,
          option: {
            id: optionSelected.id,
            title: optionSelected.title,
            price: optionSelected.price
          }
        })
        addToCart({
          orderId: cartList.orderId,
          carts: newCart,
        })
      } else {
        addToCart({
          orderId: cartList.orderId,
          carts: [
            ...cartList.data,
            {
              productId: parseInt(productId),
              count: 1,
              name: productDetail.data.name,
              price: productDetail.data.price,
              option: {
                id: optionSelected.id,
                title: optionSelected.title,
                price: optionSelected.price
              }
            }
          ]
        })
      }
    } else {
      const existProductIndex = cartList.data.findIndex((item) => item.productId === parseInt(productId));
      if (existProductIndex !== -1) {
        const newCart = cartList.data;
        newCart.splice(existProductIndex, 1, {
          productId: parseInt(productId),
          count: cartList.data[existProductIndex].count + 1,
          name: productDetail.data.name,
          price: productDetail.data.price,
          option: {}
        })
        addToCart({
          orderId: cartList.orderId,
          carts: newCart,
        })
      } else {
        addToCart({
          orderId: cartList.orderId,
          carts: [
            ...cartList.data,
            {
              productId: parseInt(productId),
              count: 1,
              name: productDetail.data.name,
              price: productDetail.data.price,
              option: {
                id: optionSelected.id,
                title: optionSelected.title,
                price: optionSelected.price
              }
            }
          ]
        })
      }
    }
  }

  function renderProductOptions() {
    return productDetail.data.productOptions.map((item, index) => {
      return (
        <Radio.Button value={item}>
          {item.title}
        </Radio.Button>
      )
    })
  }

  return (
    <Card title={productDetail.data.name}>
      <p>Hãng: {productDetail.data.category.name}</p>
      <Radio.Group
        onChange={(e) => setOptionSelected(e.target.value)}
        value={optionSelected}
      >
        {renderProductOptions()}
      </Radio.Group>
      <p>Giá: 
        {productDetail.data.price + (optionSelected.price || 0)}
      </p>
      <Button type="primary" onClick={() => handleAddToCart()}>Add to cart</Button>
    </Card>
  );
}

const mapStateToProps = (state) => {
  const { productDetail } = state.productReducer;
  const { cartList } = state.cartReducer;
  return {
    productDetail,
    cartList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    addToCart: (params) => dispatch(addToCartAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
