import type { Metadata } from "next";
import Head from "next/head";
import { ReduxProvider } from "./ReduxProvider";
import AuthProvider from "./AuthProvider";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme } from "@/utils/CustomTheme";
import "./globals.css";
import { Box, CssBaseline, Typography } from "@mui/material";
import Navbar from "@components/Navbar";
import BlackBanner from "@components/BlackBanner";
import Footer from "@components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EdgeStoreProvider } from "@components/EdgeStore";
import LoaderProvider from "./LoaderProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
export const metadata: Metadata = {
  title: "Online Fashion Shopping for Men | Buy Mens Clothing – Triocomet",
  description:
    "The hottest trends in men's fashion at Triocomet. Shop stylish, Online fashion shopping for men. Shop now and stand out. ✔ Free Shipping ✔ COD Available!",
    verification: {
      google: "_kYmh_pf4WXGLIQ7OUe6ANa_k7L6Uh_vso_LR312ZPU",
    },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LoaderProvider>
        <ReduxProvider>
          <AuthProvider>
            <CssBaseline />
            <ThemeProvider theme={LightTheme}>
              <EdgeStoreProvider>
                {/* <NextTopLoader
                color="black"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                easing="ease"
                speed={200}
                template="loader...."
              /> */}
                {/* <ScreenProvider/> */}

                <body>
                  <GoogleTagManager gtmId="GTM-5V45F9TN" />
                  <BlackBanner />
                  <Navbar />
                  {children}
                  <Footer />
                  <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  <GoogleAnalytics gaId="'G-JCEYHJ8L95" />
                </body>
              </EdgeStoreProvider>
            </ThemeProvider>
          </AuthProvider>
        </ReduxProvider>
      </LoaderProvider>
    </html>
  );
}
