import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
const Index = () => {
  return (
    <Box position="fixed" zIndex="999" bottom="50px" right="50px">
        <Link target="_blank" href={`https://wa.me/+918076939952`}>
      <Box height="50px" width="50px">
        <Image src="/assets/logo/whatsAppIcon.png" alt="whatsappIcon" width="50" height="50" />
      </Box>
        </Link>
    </Box>
  );
};

export default Index;
