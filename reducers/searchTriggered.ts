const initialState = false;

type toggleAction = { type: "TOGGLE"; payload: any };

export const searchToggle: any = (
  state: boolean = initialState,
  action: toggleAction
) => {
  switch (action.type) {
    case "TOGGLE": {
      const newToggle = !action.payload.toggle;
      return { refresh: newToggle };
    }

    default:
      return state;
  }
};
