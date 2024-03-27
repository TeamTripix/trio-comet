export interface favProductState {
  favCartData: Array<any>;
}

const initialState = {
  favCartData: [],
};

type addToFavCartAction = { type: "ADD_TO_FAV_CART"; payload: object };
type removeFromFavCartAction = {
  type: "REMOVE_FROM_FAV_CART";
  payload: object;
};

export const addToFavCart: any = (
  state: favProductState = initialState,
  action: addToFavCartAction | removeFromFavCartAction
) => {
  switch (action.type) {
    case "ADD_TO_FAV_CART": {
      return { ...state, favCartData: [...state.favCartData, action.payload] };
    }

    case "REMOVE_FROM_FAV_CART": {
      const newList = state.favCartData.filter(
        (elem) => elem._id !== action.payload
      );
      return {
        ...state,
        favCartData: newList,
      };
    }

    default:
      return state;
  }
};
