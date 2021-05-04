export function getProductListAction(params) {
  return {
    type: 'GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export function getProductDetailAction(params) {
  return {
    type: 'GET_PRODUCT_DETAIL_REQUEST',
    payload: params,
  }
}

export function getCategoryListAction(params) {
  return {
    type: 'GET_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}
