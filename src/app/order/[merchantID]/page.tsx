"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const OrderPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [shipRocketToken, setShipRocketToken] = useState();
  const router = useRouter()
  const session: any = useSession();
  if (session.status === "unauthenticated") {
    window.location.href = "/login";
  }

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const reqData = {
        url: "https://apiv2.shiprocket.in/v1/external/orders",
        token: localStorage.getItem("accessToken"),
      };
      axios
        .post("/api/shiprocket-fetching", reqData)
        .then(function (response) {
          if (response.status === 200) {
            setOrderData(response.data.data.data);
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
              });
          }
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
                window.location.reload();
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
            window.location.reload();
          }
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Your token is not regenerate, There was some error in Delivery agent")
        });
    }
  }, []);
  const handleTrack = (order_id: number, channel_id: number) => {
    const reqData = {
      url: `https://apiv2.shiprocket.in/v1/external/courier/track?order_id=${order_id}&channel_id=${channel_id}`,
      token: localStorage.getItem("accessToken"),
    };
    axios
      .post(`/api/shiprocket-fetching`, reqData)
      .then(function (response) {
        if (response.status === 200) {
          window.location.href = response.data.tracking_data.track_url;
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData
              .filter(
                (data: any) =>
                  data.customer_phone === session?.data?.user?.userInfo?.number
              )
              .map((order: any) => (
                <TableRow key={order.channel_order_id}>
                  <TableCell>{order.channel_order_id}</TableCell>
                  <TableCell>{order.products[0].name}</TableCell>
                  <TableCell>{order.products[0].quantity}</TableCell>
                  <TableCell>₹{order.products[0].price}</TableCell>
                  <TableCell>{order.created_at}</TableCell>
                  <TableCell>{order.products[0].status}</TableCell>
                  <TableCell>
                    <Button
                      // onClick={() => handleTrack(order.shipments[0].id)}
                      onClick={() => handleTrack(order.id, order.channel_id)}
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      Track
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderPage;
