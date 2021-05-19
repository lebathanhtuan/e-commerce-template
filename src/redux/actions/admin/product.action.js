export function getProductListAdminAction(params) {
  return {
    type: 'ADMIN/GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export function getCategoryListAdminAction(params) {
  return {
    type: 'ADMIN/GET_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}

export function editProductAdminAction(params) {
  return {
    type: 'ADMIN/EDIT_PRODUCT_REQUEST',
    payload: params,
  }
}

export function createProductAdminAction(params) {
  return {
    type: 'ADMIN/CREATE_PRODUCT_REQUEST',
    payload: params,
  }
}

export function deleteProductAdminAction(params) {
  return {
    type: 'ADMIN/DELETE_PRODUCT_REQUEST',
    payload: params,
  }
}
