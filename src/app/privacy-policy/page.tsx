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
              Privacy Policy
            </Typography>
            <Typography paragraph>
              We know how valuable and confidential your information is. Thus, we take certain measures to make sure that it never reaches the wrong hands.
            </Typography>
            <Typography paragraph>
              First off, every policy at Trio Comet is made to be in accordance with the prevailing law and legislation. Since you trust us with your information when using our website, we also make sure that it stays safe and secure. We aim to be responsible when collecting and storing user information.
            </Typography>
            <Typography paragraph>
              To value your privacy, Trio Comet NEVER shares personal data, information, or credentials with any third-party apps, websites, companies, brands, or agencies. So, details such as your name, email, phone number, address, and so on and so forth will stay only with us. Only Trio Comet would use this information to send you relevant offers, newsletters, deals, and discounts, as well as information about policies and upcoming products. We would never sell this data to a third party that might try to use this data to spam or scam you.
            </Typography>
            <Typography paragraph>
              Furthermore, we collect your data for the following reasons:
            </Typography>
            <Typography sx={{ paddingLeft: '2rem' }}>
              <li>To improve the technicalities of our website,</li>
              <li>To improve the user experience,</li>
              <li>To improve our customer service,</li>
              <li>And to promote certain services to you.</li>
            </Typography>
            <Typography paragraph margin="2rem 0">
              In case we need to use your data for something else, we will ALWAYS ask for your consent before doing anything.
            </Typography>
            <Typography paragraph>
              However, Trio Comet is under a legal obligation to share your personal information if the law or the government requires us to do so.
            </Typography>
            <Typography paragraph>
              We try our best to keep every transaction and transmission secure. However, we cannot guarantee total safety, as no website on the internet is 100% safe from external threats. So, Trio Comet cannot guarantee the total security of your private data. If you wish to transmit data to us, you would be doing so at your own risk.
            </Typography>
            <Typography paragraph>
              Fortunately, if you wish to get your personal data or information deleted from our database, or if you wish to get anything updated, you can always reach out to us. We will be glad to help you out!
            </Typography>
          </Box>
        </PageSpacing>
      </Box>
    </>
  );
};

export default Page;
