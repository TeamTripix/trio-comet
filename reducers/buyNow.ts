export interface productState {
    cartData: Array<any>;
  }
  
  const initialState = {
    cartData: [],
  };
  
  type addBuyNowAction = { type: "BUY_NOW"; payload: any };
  type emptyBuyNowAction = {type: "BUY_NOW_EMPTY"}
  
  export const buyNow: any = (
    state: productState = initialState,
    action: addBuyNowAction | emptyBuyNowAction
  ) => {
    switch (action.type) {
      case "BUY_NOW":
        const existingItemIndex = state.cartData.findIndex(
          (item: any) =>
            item.product._id === action.payload.product._id &&
            item.isCouponApply === action.payload.isCouponApply &&
            item.product.colorId === action.payload.product.colorId
        );
  
        if (existingItemIndex !== -1) {
          const updatedItem: any = {
            ...state.cartData[existingItemIndex],
            product: {
              ...state.cartData[existingItemIndex].product,
            },
            quantity:
              state.cartData[existingItemIndex].quantity +
              action.payload.quantity,
          };
          return {
            ...state,
            cartData: [
              ...state.cartData.slice(0, existingItemIndex),
              updatedItem,
              ...state.cartData.slice(existingItemIndex + 1),
            ],
          };
        }
        return {
          ...state,
          cartData: [...state.cartData, action.payload],
        };

      case "BUY_NOW_EMPTY":
        return {
          ...state,
          cartData: [],
        };

  
      default:
        return state;
    }
  };
  