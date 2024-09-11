"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import { useTablet, useMobile } from "../../utils/responsive";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
 
  const isMobile = useMobile();
  const data: any = useSelector<any>((state) => state.orderData);
  const [shipRocketToken, setShipRocketToken] = useState();
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
    if (localStorage.getItem("accessToken")) {
     const reqData = {
        url:"https://apiv2.shiprocket.in/v1/external/orders",
        token:localStorage.getItem("accessToken")
      }
      axios
        .post("/api/shiprocket-fetching", reqData)
        .then(function (response) {
          if(response.status === 200){
            
            axios({
              method: "post",
              url: "/api/shiprocket-middleware",
              data: { data, token:localStorage.getItem("accessToken") },
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
          }
        })
        .catch(function (error) {
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
                window.location.reload();
              }
            })
            .catch(function (error) {
              console.log(error);
              toast.error("Your token is not regenerate, There was some error in Delivery agent")
            });
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
            window.location.reload();
          }
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Your token is not regenerate, There was some error in Delivery agent")
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
