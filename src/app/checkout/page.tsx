"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  CssBaseline,
} from "@mui/material";
import AddressForm from "@components/AddressForm";
import PaymentForm from "@components/PaymentForm";
import ReviewOrder from "@components/ReviewOrder";
import PageSpacing from "@components/PageSpacing";
import { redirect } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { orderDataAction } from "../../../reducers/orderAction";

const steps = ["Shipping address", "Review your order", "Payment"];
const defaultState = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  phoneNumber: "",
};
function getStepContent(step: number, setState: any, iState: any) {
  // const [iState, setState] = useState(defaultState);
  const { firstName, lastName, address1, address2, city, state, zip, country } =
    iState;

  switch (step) {
    case 0:
      return <AddressForm setState={setState} iState={iState} />;
    case 1:
      return <ReviewOrder address1={address1} address2={address2} />;
    case 2:
      return "";
    default:
      throw new Error("Unknown step");
  }
}

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [iState, setState] = useState(defaultState);
  const cartData: any = useSelector<any>((state) => state.addToCart.cartData);
  const totalPrice: any = useSelector<any>((state) => state.totalCost);
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    phoneNumber,
  } = iState;

  const productArray: any = [];

  for (let item of cartData) {
    const data = {
      name: item.product.name,
      sku: item.product._id,
      units: item.quantity,
      selling_price: item.product.price,
      discount: "",
      tax: "",
      hsn: "",
    };
    productArray.push(data);
  }

  function generateOrderId() {
    const prefix = "TCID";
    const uniqueNumber = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
    const orderId = `${prefix}${uniqueNumber}`;
    return orderId;
  }

  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDateTime;
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePaymentBTN = async () => {
    const data = {
      name: `${firstName} ${lastName}`,
      amount: totalPrice,
      number: phoneNumber,
      MUID: "MUID" + Date.now(),
      transactionId: "TID" + Date.now(),
    };

    const orderID = generateOrderId();
    const currentTimeAndDate = getCurrentDateTime();
    const orderData = {
      order_id: orderID,
      order_date: currentTimeAndDate,
      pickup_location: "Primary",
      channel_id: "5134827",
      // comment: "",
      // reseller_name: "",
      // company_name: "",
      billing_customer_name: firstName,
      billing_last_name: lastName,
      billing_address: `${address1} ${address2}`,
      // billing_address_2: "",
      // billing_isd_code: "",
      billing_city: city,
      billing_pincode: zip,
      billing_state: state,
      billing_country: country,
      // billing_email: "",
      billing_phone: phoneNumber,
      // billing_alternate_phone: "",
      shipping_is_billing: true,
      // shipping_customer_name: "",
      // shipping_last_name: "",
      // shipping_address: "",
      // shipping_address_2: "",
      // shipping_city: "",
      shipping_pincode: zip,
      // shipping_country: "",
      // shipping_state: "",
      // shipping_email: "",
      // shipping_phone: "",
      order_items: productArray,
      payment_method: "prepaid",
      // shipping_charges: "",
      // giftwrap_charges: "",
      // transaction_charges: "",
      // total_discount: "",
      sub_total: "10",
      length: 0.5,
      breadth: 0.5,
      height: 0.5,
      weight: "0.5",
      // ewaybill_no: "",
      // customer_gstin: "",
      // invoice_number: "",
      // order_type: ""
    };

    dispatch({ type: "ADD_ORDER_DATA", payload: orderData });
    axios
      .post("/api/payment", { ...data })
      .then((res) => {
        if (
          res.data &&
          res.data.data.data.instrumentResponse.redirectInfo.url
        ) {
          window.location.href =
            res.data.data.data.instrumentResponse.redirectInfo.url;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <CssBaseline />
      <PageSpacing>
        <main>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
            ) : (
              <>
                {getStepContent(activeStep, setState, iState)}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  {activeStep === steps.length - 2 ? (
                    <Button
                      variant="contained"
                      onClick={handlePaymentBTN}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Place order
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </>
            )}
          </Paper>
        </main>
      </PageSpacing>
    </>
  );
}

export default Checkout;
