import React, { ReactNode } from "react";
import { Container, Box } from "@mui/material";
import { useTablet, useMobile } from "@/utils/responsive";

interface PageSpaceProps {
  children: ReactNode;
}
const Index: React.FC<PageSpaceProps> = ({ children }) => {
  const isTablet = useTablet();
  const isMobile = useMobile();
  if (isTablet || isMobile) {
    return <Box>{children}</Box>;
  }
  return <Container maxWidth="xl">{children}</Container>;
};

export default Index;
