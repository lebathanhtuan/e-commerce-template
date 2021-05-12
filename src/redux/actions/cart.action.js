export function addToCartAction(params) {
  return {
    type: 'ADD_TO_CART_REQUEST',
    payload: params,
  }
}

export function getCartListAction(params) {
  return {
    type: 'GET_CART_LIST_REQUEST',
    payload: params,
  }
}
