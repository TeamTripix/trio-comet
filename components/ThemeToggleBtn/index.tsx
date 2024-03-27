import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { Dispatch } from "redux";

// import { BiWorld } from '@react-icons/all-files/bi/BiWorld';
// import { GiJapan } from '@react-icons/all-files/gi/GiJapan';
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SunIcon from "../../icons/sunIcon";
import MoonIcon from "../../icons/moonIcon";
const primaryDark = "#1D394F";
const primaryDeep = "#587A95";
const primaryPale = "#F6F8F8";
const primaryLight = "#E0E7EB";

const BaseSwitch = styled(Switch)({
  width: 45,
  height: 22,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(23px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: primaryPale,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
    borderRadius: "25px",
    backgroundColor: "transparent",
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    borderRadius: "25px",
    border: `1px solid ${primaryLight}`,
    backgroundColor: primaryPale,
    boxSizing: "border-box",
  },
});

const convertSvg = (svg: React.ReactElement) => {
  const markup = renderToStaticMarkup(svg);
  const encoded = encodeURIComponent(markup);
  const dataUri = `url('data:image/svg+xml;utf8,${encoded}')`;
  return dataUri;
};

const SwitchWithIcons = styled(BaseSwitch)({
  // track上のアイコンの指定
  "& .MuiSwitch-track": {
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
      top: 11,
    },
    "&:before": {
      //   backgroundImage: convertSvg(<GiJapan color={primaryDeep} />),
      left: 3,
    },
    "&:after": {
      //   backgroundImage: convertSvg(<BiWorld color={primaryDeep} />),
      right: 3,
    },
  },
  // thumb上のアイコンの指定
  "& .MuiSwitch-thumb:before": {
    content: "''",
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: convertSvg(<SunIcon />),
  },
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& .MuiSwitch-thumb:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: convertSvg(<MoonIcon />),
      },
    },
  },
});

export default function CustomizedSwitches() {
  const dispatch = useDispatch();
  const theme: any = useSelector<any>((state) => state.themeToggle);

  const handleThemeToggle = () => {
    if (theme === "light") {
      dispatch({ type: "THEME_TOGGLE", payload: { theme: "dark" } });
    } else {
      dispatch({ type: "THEME_TOGGLE", payload: { theme: "light" } });
    }
  };
  return (
    <SwitchWithIcons
      onChange={handleThemeToggle}
      checked={theme === "dark" ? true : false}
    />
  );
}
