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
import axios from "axios";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <ReviewOrder />;
    default:
      throw new Error("Unknown step");
  }
}

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePaymentBTN = async () => {
    // if (activeStep === steps.length - 1) {
    const data = {
      name: "Vikas",
      amount: 1,
      number: "9999999999",
      MUID: "MUID" + Date.now(),
      transactionId: "T" + Date.now(),
    };
    let res = await axios
      .post("/api/payment", { ...data })
      .then((res) => {
        console.log(res);
        if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
          window.location.href =
            res.data.data.instrumentResponse.redirectInfo.url;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <CssBaseline />
      {/* <AppBar position="absolute" color="default" elevation={0} sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company Name
          </Typography>
        </Toolbar>
      </AppBar> */}
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
                {getStepContent(activeStep)}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  {activeStep === steps.length - 1 ? (
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
