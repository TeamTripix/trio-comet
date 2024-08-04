import { useMobile, useTablet } from "@/utils/responsive";
import React from "react";
// import { useDispatch } from "react-redux";

const ScreenProvider = () => {
//   const dispatch = useDispatch();
  const isMobile = useMobile();
  const isTablet = useTablet();
//   dispatch({ type: "ADD_TO_FAV_CART", payload: { isMobile, isTablet } });
  return <></>;
};

export default ScreenProvider;
