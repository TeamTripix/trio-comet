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
  const LoadingContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: isMobile ? "60vh" : "80vh",
  });

  useEffect(() => {
    axios({
      method: "post",
      url: "/api/shiprocket-middleware",
      data: { merchantID, data },
    })
      .then((response) => {
        if (response.data.success) {
          // setIsLoading(false);
          // setOpenOTPDialogBox(true);
          // toast(response.data.message);
        } else {
          // toast(response.data.message);
          // setIsLoading(false);
        }
      })
      .catch((err) => {
        // toast("some error occured");
        // setIsLoading(false);
        console.log(err);
      });
  }, []);
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
