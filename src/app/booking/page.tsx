"use client";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import { useTablet, useMobile } from "../../utils/responsive";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const shipToken: any = localStorage.getItem("accessToken");
  const isMobile = useMobile();
  const data: any = useSelector<any>((state) => state.orderData);
  const [shipRocketToken, setShipRocketToken] = useState(shipToken);
  const queryParams = useSearchParams();
  const merchantID = queryParams.get("id");
  const router = useRouter();
  const LoadingContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: isMobile ? "60vh" : "80vh",
  });

  useEffect(() => {
    if (shipRocketToken) {
      axios
        .get("https://apiv2.shiprocket.in/v1/external/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + shipRocketToken,
          },
        })
        .then(function (response) {
          // console.log("responseereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee : ",response)
          axios({
            method: "post",
            url: "/api/shiprocket-middleware",
            data: { data, token:shipRocketToken },
          })
            .then((response) => {
              if (response.data.success) {
                router.push(`/order/${response.data.data.order_id}`, {
                  scroll: false,
                });
              } else {
                router.push("/");
              }
            })
            .catch((err) => {
              router.push("/");
              console.log("error : ", err);
            });
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            const data = {
              email: "marketing@triocomet.com",
              password: "ivHSFughsyt457e@Y%$@#&I#",
            };
            axios
              .post("https://apiv2.shiprocket.in/v1/external/auth/login", data)
              .then(function (response) {
                if (response.status === 200) {
                  setShipRocketToken(response.data.token);
                  localStorage.setItem("accessToken", response.data.token);
                  router.refresh()
                }
                // setOrderData(response.data.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
    } else {
      const data = {
        email: "marketing@triocomet.com",
        password: "ivHSFughsyt457e@Y%$@#&I#",
      };
      axios
        .post("https://apiv2.shiprocket.in/v1/external/auth/login", data)
        .then(function (response) {
          if (response.status === 200) {
            setShipRocketToken(response.data.token);
            localStorage.setItem("accessToken", response.data.token);
            router.refresh()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
