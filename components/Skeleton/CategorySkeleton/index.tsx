import React from "react";
import { Box, Skeleton } from "@mui/material";
import { useMobile, useTablet } from "@/utils/responsive";
const Index = () => {
  const isMobile = useMobile();
  const isTablet = useTablet();
  return (
    <Box gap="2.4rem">
      <Skeleton
        variant="rectangular"
        sx={{
          width: isMobile ? "15rem" : "35rem",
          height: isMobile ? "25rem" : "40rem",
          borderTopLeftRadius: "1.6rem",
          borderTopRightRadius: "1.6rem",
          margin: isMobile ? "0 auto" : "0",
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{ width: "10rem", height: "1.7rem" }}
      />
    </Box>
  );
};
export default Index;
