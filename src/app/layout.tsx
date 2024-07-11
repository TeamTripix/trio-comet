import type { Metadata } from "next";
import Head from "next/head";
import Script from "next/script";
import { ReduxProvider } from "./ReduxProvider";
import AuthProvider from "./AuthProvider";
import { CustomThemeProvider } from "./CustomThemeProvider"
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme } from "@/utils/CustomTheme";
import "./globals.css"
import { CssBaseline } from "@mui/material";

export const metadata: Metadata = {
  title: "Online Fashion Shopping for Men | Buy Mens Clothing – Triocomet",
  description:
    "The hottest trends in men's fashion at Triocomet. Shop stylish, Online fashion shopping for men. Shop now and stand out. ✔ Free Shipping ✔ COD Available!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5V45F9TN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </Head>
      <ReduxProvider>
        <AuthProvider>
          <CssBaseline />
          <ThemeProvider theme={LightTheme}>
            <body>
              {children}
            </body>
          </ThemeProvider>;
        </AuthProvider>
      </ReduxProvider>
    </html>
  );
}
