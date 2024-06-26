import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';

function PaymentForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" label="Card number" fullWidth autoComplete="cc-number" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cvv" label="CVV" helperText="Last three digits on signature strip" fullWidth autoComplete="cc-csc" variant="outlined" />
        </Grid>
      </Grid>
    </>
  );
}

export default PaymentForm;
