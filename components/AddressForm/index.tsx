import React, { useState } from "react";
import { TextField, Grid, Typography } from "@mui/material";

function AddressForm(props: any) {
  const { setState, iState, errorState, setErrorState } = props;
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

  const {
    firstNameError,
    lastNameError,
    address1Error,
    cityError,
    stateError,
    zipError,
    countryError,
    phoneNumberError,
  } = errorState
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={firstNameError}
            onChange={(e) => setState({ ...iState, firstName: e.target.value })}
            value={firstName}
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={lastNameError}
            onChange={(e) => setState({ ...iState, lastName: e.target.value })}
            value={lastName}
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={address1Error}
            onChange={(e) => setState({ ...iState, address1: e.target.value })}
            value={address1}
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={phoneNumberError}
            type="number"
            onChange={(e) =>
              setState({ ...iState, phoneNumber: e.target.value })
            }
            value={phoneNumber}
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            autoComplete="phone number-line1"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setState({ ...iState, address2: e.target.value })}
            value={address2}
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={cityError}
            onChange={(e) => setState({ ...iState, city: e.target.value })}
            value={city}
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={stateError}
            onChange={(e) => setState({ ...iState, state: e.target.value })}
            value={state}
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={zipError}
            onChange={(e) => setState({ ...iState, zip: e.target.value })}
            value={zip}
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={countryError}
            onChange={(e) => setState({ ...iState, country: e.target.value })}
            value={country}
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AddressForm;
