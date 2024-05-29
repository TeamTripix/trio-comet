"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import PageSpacing from "@components/PageSpacing";

const Page = () => {
  return (
    <>
      <Box margin="1rem 2rem">
        <PageSpacing>
          <Box>
            <Typography variant="h4" gutterBottom align="center">
              Trio Comet
            </Typography>
            <Typography variant="h5" gutterBottom margin="2rem 0">
              Shipping Policy
            </Typography>
            <Typography paragraph>
              After you successfully place an order from our website (www.triocomet.com), all that remains is the shipping of that product. Don’t worry, you can sit back and relax. We have got everything covered. We have explained everything here regarding our shipping policy.
            </Typography>
            <Typography sx={{ paddingLeft: '2rem' }}>
              <li>As soon as the order is placed, we will send you both an Email and a Text Message to confirm that the order has been placed. This process is instant.</li>
              <li>Next, it can take up to 24 hours for us to confirm the order. We would need to check if the product is available and if it can be shipped to the desired location.</li>
              <li>After we confirm the order from our end, it can take up to 7-10 days for the products to be delivered. The delivery time depends on the customer’s address, the number of products, and the number of working days in a week.</li>
              <li>Rest assured, we will always keep you updated with the progress of your delivery via either an Email or a Text Message. You will also receive a link through which you can easily track your order and stay updated.</li>
              <li>We ship all over India.</li>
              <li>If you have any more queries, you can contact us at: +91 9650001541 or info@triocomet.com.</li>
            </Typography>
            <Typography paragraph margin="2rem 0">
              We hope you have a good time buying from us!
            </Typography>
          </Box>
        </PageSpacing>
      </Box>
    </>
  );
};

export default Page;
