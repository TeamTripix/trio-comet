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
            <Typography variant="h4" gutterBottom margin="2rem 0" align="center">
              Return & Exchange Policy
              </Typography>
            <Typography paragraph>
              1. We initiate refunds within 48 hours of approval and the same can only be done within 7 days from the date of purchase. Shipping charges are NOT refundable.
            </Typography>
            <Typography paragraph>
              2. The entire order value will be refunded if the order is cancelled within 24 hours of placing the order, is lost, or undelivered to your preferred location.
            </Typography>
            <Typography paragraph>
              3. Each pickup for a return will be attempted twice. If we, for any reason, cannot pick up the return package, the customer will have to send it to the company’s address. The package will be picked up from the original address within 2-3 days.
            </Typography>
            <Typography paragraph>
              4. In the case of prepaid orders, the money will be refunded to the original source of payment within 48 hours. In the case of COD orders, we will credit the amount in your store wallet within 48 hours. These credits can be used in future orders and can be used instantly.
            </Typography>
            <Typography paragraph>
              5. Every product has to be shipped back in the same condition along with the outer packaging. If we receive products in poor, damaged conditions, or if one or more parts, accessories, items are missing, the refund would not be processed.
            </Typography>
            <Typography paragraph>
              6. After the refund has been processed from the Company’s end, we urge the customers to wait 3-4 days in case the money isn’t credited to them.
            </Typography>
            <Typography paragraph>
              7. All orders will only be cancelled if the package has not been dispatched from the Company’s warehouse.
            </Typography>
            <Typography paragraph>
              8. We, at Trio Comet, are always here to help you. If you have any queries regarding returns, you can reach out to us at: info@triocomet.com or call/message us at: +91 9650001541.
            </Typography>
            <Typography paragraph>
              9. Freebies will not be refunded.
            </Typography>
            <Typography paragraph>
              10. Wallet points/Credits are not refundable as well.
            </Typography>

            <Typography variant="h5" gutterBottom>
              Terms & Conditions
            </Typography>
            <Typography paragraph>
              1. The customer would be solely responsible if the bank details provided by him are incorrect or invalid. We will not hold any responsibility for any such action.
            </Typography>
            <Typography paragraph>
              2. In case any order(s) hasn’t been delivered to you but it shows as ‘Delivered’ on either our Website our on your SMS/E-mail, kindly contact us within 24 hours at: info@triocomet.com or +91 9650001541.
            </Typography>
            <Typography paragraph>
              3. As long as the customer has any item(s) in his possession, he is supposed to preserve their condition and return them in their original quality.
            </Typography>
            <Typography paragraph>
              4. After delivery, if the customer feels like the product(s) has been tampered with, is damaged, harmed, opened, scratched, defective, or simply not up to the standards, he may contact us within 1 day of delivery.
            </Typography>
            <Typography paragraph>
              5. For returns, we will conduct a thorough examination and notify the customer if the refund is applicable.
            </Typography>

            <Typography variant="h5" gutterBottom>
              Cancellation Policy
            </Typography>
            <Typography paragraph>
              1. Trio Comet reserves the right to cancel any order if any prior prerequisite on our end could not be met. In such a case, if the order was prepaid, we will process a refund within 24 hours.
            </Typography>
            <Typography paragraph>
              2. In usual circumstances, no order can be cancelled if it has been sent from our warehouse. However, if you still wish to cancel the order, you can write a mail to us at: info@triocomet.com.
            </Typography>
          </Box>
        </PageSpacing>
      </Box>
    </>
  );
};

export default Page;
