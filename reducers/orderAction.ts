const initialState = {};

type orderDataAction = { type: "ADD_ORDER_DATA"; payload: any };

export const orderData: any = (
  state: any = initialState,
  action: orderDataAction
) => {
  switch (action.type) {
    case "ADD_ORDER_DATA": {
      const orderData = action.payload;
      return orderData;
    }

    default:
      return state;
  }
};
