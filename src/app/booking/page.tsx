"use client";
import axios from "axios";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import { useTablet, useMobile } from "../../utils/responsive";
import { useRouter, useSearchParams } from "next/navigation";

const Component = ()=>{
  const isMobile = useMobile();
  const data: any = useSelector<any>((state) => state.orderData);
  const queryParams = useSearchParams();
  const merchantID = queryParams.get("id");
  const router = useRouter()
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
        console.log("res : ",response)
        if (response.data.success) {
          router.push(`/order/${response.data.data.order_id}`, { scroll: false })
          // setIsLoading(false);
          // setOpenOTPDialogBox(true);
          // toast(response.data.message);
        } else {
          router.push("/")
          // toast(response.data.message);
          // setIsLoading(false);
        }
      })
      .catch((err) => {
        // toast("some error occured");
        // setIsLoading(false);
        router.push("/")
        console.log("error : ",err);
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
}

const Page = () => {
  <Suspense>
    <Component/>
  </Suspense>
};

export default Page;
