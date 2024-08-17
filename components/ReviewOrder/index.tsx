import React, { useEffect, useState } from "react";
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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useSelector } from "react-redux";

function ReviewOrder(props: any) {
  const cartData: any = useSelector<any>((state) => state.addToCart.cartData);
  const buyNowData: any = useSelector<any>((state) => state.buyNow.cartData);
  const totalPrice: any = useSelector<any>((state) => state.totalCost);
  const [Data, setData] = useState([]);
  const {
    address1,
    address2,
    handlePaymentMethodChange,
    paymentRadioValue,
    isBuyNow,
  } = props;

  useEffect(()=>{
console.log("isBuyNow : ",buyNowData)
    if (isBuyNow === "true") {
      setData(buyNowData)
    }else{
      setData(cartData)
    }
  },[])
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {Data.map((data: any) => (
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
                <Box
                  marginTop="1rem"
                  display="flex"
                  gap="2rem"
                  alignItems="center"
                >
                  <Typography
                    sx={{ fontWeight: "700" }}
                    variant="body1"
                    color="text.primary"
                  >
                    ₹{data.product.price * data.quantity}
                  </Typography>
                  <Box>
                    <Typography variant="body2">
                      Size : {data.product.productSize}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      Qty : {data.quantity}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Card>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            ₹{isBuyNow === "true" ? buyNowData[0].product.price : totalPrice}
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
      <Typography marginTop="2rem">Payment Method</Typography>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={paymentRadioValue}
        onChange={(e) => handlePaymentMethodChange(e.target.value)}
      >
        <FormControlLabel value="prepaid" control={<Radio />} label="Prepaid" />
        <FormControlLabel value="cod" control={<Radio />} label="COD" />
      </RadioGroup>
    </>
  );
}

export default ReviewOrder;
