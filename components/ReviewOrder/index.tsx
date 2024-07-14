import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
  CardMedia,
  Card,
  CardContent,
} from "@mui/material";
import { useSelector } from "react-redux";
import Image from "next/image";
const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
];

const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

function ReviewOrder(props: any) {
  const cartData: any = useSelector<any>((state) => state.addToCart.cartData);
  const totalPrice: any = useSelector<any>((state) => state.totalCost);

  const { address1, address2 } = props;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartData.map((data: any) => (
          <Card
          key={data.product._id}
            sx={{
              display: "flex",
              gap: "2rem",
              borderRadius: "0.4rem",
              boxShadow: 3,
              p: 2,
              my: 2,
            }}
          >
            <CardMedia
              component="img"
              image={data.product.image}
              alt="cart thumbnail"
              sx={{
                borderRadius: "0.4rem",
                width: 108,
                height: 135,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h6">
                  {data.product.name}
                </Typography>
                <Typography
                  sx={{ lineHeight: "1" }}
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {data.product.description}
                </Typography>
                <Box marginTop="1rem" display="flex" gap="2rem" alignItems="center">
                  <Typography
                    sx={{ fontWeight: "700" }}
                    variant="body1"
                    color="text.primary"
                  >
                    ₹{data.product.price * data.quantity}
                  </Typography>
                  <Box>
                    <Typography variant="body2" >Size : {data.product.productSize}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" >Qty : {data.quantity}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Card>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            ₹{totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          {`${address1} ${address2}`}
        </Grid>
      </Grid>
    </>
  );
}

export default ReviewOrder;
