
import { useEffect, useState } from 'react';
import { Card, Radio, Button, notification } from 'antd';
import { connect } from 'react-redux';

import history from '../../../utils/history';

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
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [optionSelected, setOptionSelected] = useState({});

  useEffect(() => {
    getProductDetail({ id: productId });
  }, [])

  useEffect(() => {
    if (productDetail.data.id) {
      setOptionSelected(productDetail.data.productOptions[0] || {})
    }
  }, [productDetail.data])

  /// Dùng với kiểu cần đăng nhập để bỏ vào giỏ hàng
  function handleAddToCart() {
    if (!userInfo) {
      const key = `open${Date.now()}`;
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thêm vào giỏ hàng',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push('/login');
            }}
          >
            Đăng nhập
          </Button>
        ),
      });
    }
    if (optionSelected.id) {
      const existOptionIndex = cartList.data.findIndex((item) => item.option.id === optionSelected.id);
      if (existOptionIndex !== -1) {
        const newCartList = cartList.data;
        newCartList.splice(existOptionIndex, 1, {
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
          userId: userInfo.id,
          carts: newCartList,
        })
      } else {
        addToCart({
          userId: userInfo.id,
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
          userId: userInfo.id,
          carts: newCart,
        })
      } else {
        addToCart({
          userId: userInfo.id,
          carts: [
            ...cartList.data,
            {
              productId: parseInt(productId),
              count: 1,
              name: productDetail.data.name,
              price: productDetail.data.price,
              option: {}
            }
          ]
        })
      }
    }
  }

  /// Dùng với kiểu không cần đăng nhập mà vẫn bỏ vào giỏ hàng được
  // function handleAddToCart() {
  //   if (optionSelected.id) {
  //     const existOptionIndex = cartList.data.findIndex((item) => item.option.id === optionSelected.id);
  //     if (existOptionIndex !== -1) {
  //       const newCartList = cartList.data;
  //       newCartList.splice(existOptionIndex, 1, {
  //         productId: parseInt(productId),
  //         count: cartList.data[existOptionIndex].count + 1,
  //         name: productDetail.data.name,
  //         price: productDetail.data.price,
  //         option: {
  //           id: optionSelected.id,
  //           title: optionSelected.title,
  //           price: optionSelected.price
  //         }
  //       });
  //       localStorage.setItem('carts', JSON.stringify(newCartList));
  //       addToCart({
  //         carts: newCartList,
  //       })
  //     } else {
  //       localStorage.setItem('carts', JSON.stringify([
  //         ...cartList.data,
  //         {
  //           productId: parseInt(productId),
  //           count: 1,
  //           name: productDetail.data.name,
  //           price: productDetail.data.price,
  //           option: {
  //             id: optionSelected.id,
  //             title: optionSelected.title,
  //             price: optionSelected.price
  //           }
  //         }
  //       ]));
  //       addToCart({
  //         carts: [
  //           ...cartList.data,
  //           {
  //             productId: parseInt(productId),
  //             count: 1,
  //             name: productDetail.data.name,
  //             price: productDetail.data.price,
  //             option: {
  //               id: optionSelected.id,
  //               title: optionSelected.title,
  //               price: optionSelected.price
  //             }
  //           }
  //         ]
  //       })
  //     }
  //   } else {
  //     const existProductIndex = cartList.data.findIndex((item) => item.productId === parseInt(productId));
  //     if (existProductIndex !== -1) {
  //       const newCartList = cartList.data;
  //       newCartList.splice(existProductIndex, 1, {
  //         productId: parseInt(productId),
  //         count: cartList.data[existProductIndex].count + 1,
  //         name: productDetail.data.name,
  //         price: productDetail.data.price,
  //         option: {}
  //       })
  //       localStorage.setItem('carts', JSON.stringify(newCartList));
  //       addToCart({
  //         carts: newCartList,
  //       })
  //     } else {
  //       localStorage.setItem('carts', JSON.stringify([
  //         ...cartList.data,
  //         {
  //           productId: parseInt(productId),
  //           count: 1,
  //           name: productDetail.data.name,
  //           price: productDetail.data.price,
  //           option: {}
  //         }
  //       ]));
  //       addToCart({
  //         carts: [
  //           ...cartList.data,
  //           {
  //             productId: parseInt(productId),
  //             count: 1,
  //             name: productDetail.data.name,
  //             price: productDetail.data.price,
  //             option: {}
  //           }
  //         ]
  //       })
  //     }
  //   }
  // }

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
