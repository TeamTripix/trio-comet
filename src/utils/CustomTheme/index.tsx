"use client";
import { createTheme } from "@mui/material/styles";
import { lightColor, darkColor } from "./color";
// import { store } from "../../../store";
// import { useSelector } from "react-redux";
// const themeState = store.getState();
export const LightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#1D1D1F",
      // secondary:""
    },
  },
  typography: {
    h1: {},
    htmlFontSize: 10, // Change this to your desired base font size in pixels
    // fontFamily: ["Montserrat","SF Pro Display", "Roboto"].join(","),
    fontFamily: ["SF Pro Display", "Roboto"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "0rem 1.6rem",
          alignItems: "center",
          background: "rgb(55, 56, 61)",
          borderRadius: 4,
          color: "white",
          height: 40,
          textTransform: "none",
          "&:hover": {
            background: "rgb(68 69 75)",
          },
          "&:disabled": {
            background: "rgb(116 116 116)",
          },
        },
      },
    },
  },
  zIndex: {
    modal: 999,
  },
});

// export const DarkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     text: {
//       primary: "#1D1D1F",
//       // secondary:""
//     },
//   },
//   typography: {
//     h1: {},
//     htmlFontSize: 10, // Change this to your desired base font size in pixels
//     fontFamily: ["SF Pro Display", "Roboto"].join(","),
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           padding: "0rem 1.6rem",
//           alignItems: "center",
//           background: "#FBC02D",
//           borderRadius: 4,
//           color: "white",
//           height: 40,
//           textTransform: "none",
//           "&:hover": {
//             background: "#f3ae00",
//           },
//           "&:disabled": {
//             background: "#ffe095",
//           },
//         },
//       },
//     },
//   },
//   zIndex: {
//     modal: 999,
//   },
// });
