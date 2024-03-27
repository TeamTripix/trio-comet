import React from "react";
import { useMediaQuery } from "react-responsive";

export function useTablet() {
  return useMediaQuery({ query: "(min-width: 0px) and (max-width: 1024px)" });
}

export function useMobile() {
  return useMediaQuery({ query: "(min-width: 0px) and (max-width: 786px)" });
}
