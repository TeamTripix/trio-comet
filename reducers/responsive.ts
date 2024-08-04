const initialState = {
    isMobile:false,
    isTable:false
};

type screenAction = { type: "CHANGE_VIEW_SIZE"; payload: any };

export const screenSize: any = (
  state: any = initialState,
  action: screenAction
) => {
  switch (action.type) {
    case "CHANGE_VIEW_SIZE": {
      const screen = action.payload;
      return screen;
    }

    default:
      return state;
  }
};
