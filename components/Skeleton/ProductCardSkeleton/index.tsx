import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTablet } from "../../../src/utils/responsive";

function SkeletonChildrenDemo() {
  const isTablet = useTablet();
  return (
    <>
      <Skeleton
        sx={{
          width: isTablet ? "35rem" : "100%",
          height: "55rem",
          borderTopLeftRadius: "1.6rem",
          borderTopRightRadius: "1.6rem",
        }}
        variant="rectangular"
      ></Skeleton>

      <Box
        display="flex"
        padding="0.9rem 1.6rem"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        gap="0.8rem"
        flex="1 0 0"
        alignSelf="stretch"
        borderRadius="0rem 0rem 1.6rem 1.6rem"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          gap="0.8rem"
          width="90%"
        >
          <Skeleton
            sx={{ width: "5rem", height: "1rem" }}
            variant="rectangular"
          ></Skeleton>
          <Skeleton
            sx={{ width: "100%", height: "3rem" }}
            variant="rectangular"
          ></Skeleton>

          <Skeleton
            sx={{ width: "50%", height: "3rem" }}
            variant="rectangular"
          ></Skeleton>
          <Skeleton
            sx={{ width: "100%", height: "4.2rem", borderRadius: "10px" }}
            variant="rectangular"
          ></Skeleton>
        </Box>
      </Box>
    </>
  );
}

export default function Index() {
  return <SkeletonChildrenDemo />;
}
