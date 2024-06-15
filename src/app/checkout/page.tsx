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
import { useSelector } from "react-redux";

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
  const totalPrice: any = useSelector<any>((state) => state.totalCost);
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
    axios
      .post("/api/payment", { ...data })
      .then((res) => {
        if (
          res.data &&
          res.data.data.data.instrumentResponse.redirectInfo.url
        ) {
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
