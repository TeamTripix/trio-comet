import React from "react";
import { Box, Skeleton } from "@mui/material";
const Index = () => {
  return (
    <Box gap="2.4rem">
      <Skeleton
        variant="circular"
        sx={{ width: "7rem", height: "7rem", marginBottom: "2.4rem" }}
      />
      <Skeleton
        variant="rectangular"
        sx={{ width: "8rem", height: "1.7rem" }}
      />
    </Box>
  );
};
export default Index;
