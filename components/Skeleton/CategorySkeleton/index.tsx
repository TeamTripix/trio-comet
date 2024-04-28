import React from "react";
import { Box, Skeleton } from "@mui/material";
const Index = () => {
  return (
    <Box gap="2.4rem">
      <Skeleton
        variant="rectangular"
        sx={{ width: "35rem", height: "40rem", marginBottom: "2.4rem" }}
      />
      <Skeleton
        variant="rectangular"
        sx={{ width: "10rem", height: "1.7rem" }}
      />
    </Box>
  );
};
export default Index;
