"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import { useTablet, useMobile } from "../../utils/responsive";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const isMobile = useMobile();
  const data: any = useSelector<any>((state) => state.orderData);
  const queryParams = useSearchParams();
  const merchantID = queryParams.get("id");
  console.log("🚀 ~ Page ~ orderData:", data);
  const LoadingContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: isMobile ? "60vh" : "80vh",
  });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ4MTAyMjUsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzE5NDEzMDQ2LCJqdGkiOiJJN2RtNHBRSU5KTVBjOGdVIiwiaWF0IjoxNzE4NTQ5MDQ2LCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcxODU0OTA0NiwiY2lkIjo0NTc5NTA4LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.lkygB8ybk5BO6ghMsjR8BCcT53YDhcwpRX3p2GuUIpc";
  if (merchantID) {
    axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        data
      )
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        // if (res.data && res.data.data.data.instrumentResponse.redirectInfo.url) {
        //   window.location.href =
        //     res.data.data.data.instrumentResponse.redirectInfo.url;
        // }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <LoadingContainer>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100rem"
        width={isMobile ? "40rem" : "70rem"}
        flexDirection="column"
      >
        <Image
          src="/assets/order_confirm.jpg"
          width="100"
          height="100"
          alt="order confirm image"
          layout="responsive"
        />
        <Typography variant="h5" gutterBottom>
          Booking your order...
        </Typography>
        <CircularProgress />
      </Box>
    </LoadingContainer>
  );
};

export default Page;
