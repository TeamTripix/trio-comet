const initialState = "light";

type themeToggleAction = { type: "THEME_TOGGLE"; payload: any };

export const themeToggle: any = (
  state: string = initialState,
  action: themeToggleAction
) => {
  switch (action.type) {
    case "THEME_TOGGLE":
      const newToggle = action.payload.theme;
      return newToggle;
    default:
      return state;
  }
};
