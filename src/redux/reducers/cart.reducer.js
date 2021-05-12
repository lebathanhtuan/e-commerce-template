const initialState = {
  cartList: {
    orderId: NaN,
    data: [],
    load: false,
    error: '',
  },
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CART_LIST_REQUEST': {
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: true,
        },
      }
    }
    case 'GET_CART_LIST_SUCCESS': {
      const { data, orderId } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          orderId: orderId,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_CART_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          load: false,
          error: error,
        },
      }
    }

    case 'ADD_TO_CART_SUCCESS': {
      const { data, orderId } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          orderId: orderId,
          data: data,
          load: false,
        },
      }
    }
    default: {
      return state;
    }
  }
}
