export function addToCartAction(params) {
  return {
    type: 'ADD_TO_CART_REQUEST',
    payload: params,
  }
}

// Dùng với kiểu không cần đăng nhập mà vẫn bỏ vào giỏ hàng được
export function getCartListAction(params) {
  return {
    type: 'GET_CART_LIST_REQUEST',
    payload: params,
  }
}
