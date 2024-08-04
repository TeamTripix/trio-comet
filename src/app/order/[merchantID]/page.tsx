"use client"
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
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';



const OrderPage = () => {
    const [orderData,setOrderData] = useState([])
    const session:any = useSession()
    if(session.status === "unauthenticated"){
        window.location.href="/login"
    }
    

    useEffect(()=>{
        axios.get('https://apiv2.shiprocket.in/v1/external/orders',{
            headers: {
              'Content-Type': 'application/json',
              Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ4MTAyMjUsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzIzNjM4NDAxLCJqdGkiOiJoSmFvZVFwSzUzbmVvM1pwIiwiaWF0IjoxNzIyNzc0NDAxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyMjc3NDQwMSwiY2lkIjo0NTc5NTA4LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.MBtbiMQ9L0V1jktVr5zjqDgey5-sQ0jdRZpXhBoS3l8"
            },
          })
      .then(function (response) {
        setOrderData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
    },[])
    console.log(orderData)
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
            {orderData.filter((data:any)=>data.customer_phone===session?.data?.user?.userInfo?.number).map((order:any) => (
              <TableRow key={order.channel_order_id
              }>
                <TableCell>{order.channel_order_id
                }</TableCell>
                <TableCell>{order.products[0].name}</TableCell>
                <TableCell>{order.products[0].quantity}</TableCell>
                <TableCell>₹{order.products[0].price}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>{order.products[0].status}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" size='small'>
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
