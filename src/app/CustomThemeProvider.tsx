import React from "react";
import { LightTheme } from "@/utils/CustomTheme";
import { ThemeProvider } from "@mui/material/styles";
export function CustomThemeProvider({children} : {children: React.ReactNode}) {
    return <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>;
}