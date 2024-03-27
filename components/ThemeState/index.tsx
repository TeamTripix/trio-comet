import react from "react";
import { useSelector } from "react-redux";

const ThemeState = (props: any) => {
  const { themeValue } = props;
  const state: any = useSelector<any>((state) => state.themeToggle);
  themeValue(state);
  return "";
};

export default ThemeState;

// export default Index;
