export interface productState {
  cartData: Array<any>;
}

const initialState = {
  cartData: [],
};

type addToCartAction = { type: "ADD_TO_CART"; payload: any };
type removeFromCartAction = { type: "REMOVE_FROM_CART"; payload: any };
type editCartAction = { type: "EDIT_CART"; payload: any };

export const addToCart: any = (
  state: productState = initialState,
  action: addToCartAction | removeFromCartAction | editCartAction
) => {
  switch (action.type) {
    case "ADD_TO_CART":
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

    case "REMOVE_FROM_CART":
      const newList = state.cartData.filter(
        (data) => data.product._id !== action.payload.product.id
      );
      return {
        ...state,
        cartData: newList,
      };

    case "EDIT_CART":
      const editCartIndex = state.cartData.findIndex(
        (item: any) =>
          item.product._id === action.payload._id &&
          item.isCouponApply === action.payload.isCouponApply &&
          item.product.colorId === action.payload.colorId
      );

      const updatedItem: any = {
        ...state.cartData[editCartIndex],
        product: {
          ...state.cartData[editCartIndex].product,
          productColor: action.payload.productColor,
          productSize: action.payload.productSize,
        },
      };
      return {
        ...state,
        cartData: [
          ...state.cartData.slice(0, editCartIndex),
          updatedItem,
          ...state.cartData.slice(editCartIndex + 1),
        ],
      };

    default:
      return state;
  }
};

const totalCostInitialState = 0;

type addInTotalCostAction = { type: "ADD_IN_TOTAL_COST"; payload: any };
type subtractInTotalCostAction = {
  type: "SUBTRACT_IN_TOTAL_COST";
  payload: any;
};
type checkOutInTotalCostAction = {
  type: "CHECK_OUT_IN_TOTAL_COST";
  payload: any;
};

export const totalCost: any = (
  state: any = totalCostInitialState,
  action:
    | addInTotalCostAction
    | subtractInTotalCostAction
    | checkOutInTotalCostAction
) => {
  switch (action.type) {
    case "ADD_IN_TOTAL_COST":
      return state + parseInt(action.payload);

    case "SUBTRACT_IN_TOTAL_COST":
      return state - parseInt(action.payload);

    case "CHECK_OUT_IN_TOTAL_COST":
      return 0;
    default:
      return state;
  }
};
