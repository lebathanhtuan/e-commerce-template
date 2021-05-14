const initialState = {
  cartList: {
    data: [],
    load: false,
    error: '',
  },
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    /// Dùng với kiểu cần đăng nhập để bỏ vào giỏ hàng

    case 'GET_USER_INFO_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data.carts,
          load: false,
        },
      }
    }
    case 'ADD_TO_CART_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: data,
          load: false,
        },
      }
    }

    // Dùng với kiểu không cần đăng nhập mà vẫn bỏ vào giỏ hàng được
    // case 'GET_CART_LIST_REQUEST': {
    //   const cartList = JSON.parse(localStorage.getItem('carts'));
    //   return {
    //     ...state,
    //     cartList: {
    //       ...state.cartList,
    //       data: cartList || [],
    //       load: false,
    //     },
    //   }
    // }

    case 'ADD_TO_CART_REQUEST': {
      const { carts } = action.payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: carts,
          load: false,
        },
      }
    }
    default: {
      return state;
    }
  }
}
