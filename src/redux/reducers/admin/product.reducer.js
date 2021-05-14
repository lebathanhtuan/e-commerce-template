const initialState = {
  productList: {
    data: [],
    load: false,
    error: '',
  },
  categoryList: {
    data: [],
    load: false,
    error: '',
  },
};

export default function adminProductReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADMIN/GET_PRODUCT_LIST_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        },
      }
    }
    case 'ADMIN/GET_PRODUCT_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          data: data,
          load: false,
        },
      }
    }
    case 'ADMIN/GET_PRODUCT_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error,
        },
      }
    }

    case 'ADMIN/GET_CATEGORY_LIST_REQUEST': {
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          load: true,
        },
      }
    }
    case 'ADMIN/GET_CATEGORY_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          data: data,
          load: false,
        },
      }
    }
    case 'ADMIN/GET_CATEGORY_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          load: false,
          error: error,
        },
      }
    }
    default: {
      return state;
    }
  }
}
