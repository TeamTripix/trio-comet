"use client";
// import React from 'react'
// import { Container, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';

// const order = {
//     orderId: '123456',
//     date: '2024-06-15',
//     customer: 'John Doe',
//     items: [
//         { name: 'Product 1', quantity: 2, price: 50 },
//         { name: 'Product 2', quantity: 1, price: 30 },
//     ],
//     total: 130,
// };

// const Page = ({ params }: { params: { merchantID: string } }) => {
//   return (
//     <Container maxWidth="md" style={{ marginTop: '2rem' }}>
//     <Typography variant="h4" gutterBottom>
//         Order Details
//     </Typography>
//     <Card>
//         <CardContent>
//             <Typography variant="h6">Order ID: {order.orderId}</Typography>
//             <Typography variant="subtitle1">Date: {order.date}</Typography>
//             <Typography variant="subtitle1">Customer: {order.customer}</Typography>
//         </CardContent>
//     </Card>
//     <Card style={{ marginTop: '1rem' }}>
//         <CardContent>
//             <Typography variant="h6">Items</Typography>
//             <List>
//                 {order.items.map((item, index) => (
//                     <React.Fragment key={index}>
//                         <ListItem>
//                             <ListItemText
//                                 primary={item.name}
//                                 secondary={`Quantity: ${item.quantity} - Price: $${item.price}`}
//                             />
//                         </ListItem>
//                         {index < order.items.length - 1 && <Divider />}
//                     </React.Fragment>
//                 ))}
//             </List>
//             <Divider />
//             <Grid container justifyContent="flex-end" style={{ marginTop: '1rem' }}>
//                 <Typography variant="h6">Total: ${order.total}</Typography>
//             </Grid>
//         </CardContent>
//     </Card>
// </Container>
//   )
// }

// export default Page

// src/components/OrderPage.js
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

const OrderPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [shipRocketToken, setShipRocketToken] = useState();
  const session: any = useSession();
  if (session.status === "unauthenticated") {
    window.location.href = "/login";
  }

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios
        .get("https://apiv2.shiprocket.in/v1/external/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .then(function (response) {
          setOrderData(response.data.data);
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
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  const handleTrack = (order_id: number,channel_id:number) => {
    axios
      .get(
        `https://apiv2.shiprocket.in/v1/external/courier/track?order_id=${order_id}&channel_id=${channel_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log("eeeeeeeeeeeee : ",response.data);
          window.location.href = response.data.tracking_data.track_url;
        }
      })
      .catch(function (error) {
        console.log(error);
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
                      onClick={() => handleTrack(order.id,order.channel_id)}
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
