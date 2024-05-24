import { Box, Typography } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";
import { lightColor, darkColor } from "../../src/utils/CustomTheme/color";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useMobile } from "@/utils/responsive";

interface IndexProps {
  data: any;
  isHomePage?: boolean;
  indexes?: number;
  categoryArrayLength?: number;
}

const Index = (props: IndexProps) => {
  const { name, _id, image,slug } = props.data;
  const { isHomePage, categoryArrayLength, indexes } = props;
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const isMobile = useMobile();
  return (
    <Box
      marginLeft={isHomePage ? "1rem" : 0}
      marginRight={
        isHomePage ? (indexes === categoryArrayLength ? "1rem" : 0) : 0
      }
    >
      <Link href={`/category/${slug}`}>
        {/* <Box
          // height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2.4rem"
        > */}
          <Box>
            <Box
              width={isMobile ? "15rem" : " 30vw"}
              height={isMobile ? "15rem" : "35vh"}
              borderRadius="10rem"
            >
              <img
                // width={isMobile ? "150" : " 250"}
                // height={isMobile ? "150" : "300"}
                alt="category"
                src={image}
                style={{maxHeight:"100%", maxWidth:"100%"}}
                // layout="responsive"
              />
            </Box>
          </Box>
          <Typography
            color={
              theme === "light"
                ? lightColor.text.primary
                : darkColor.text.primary
            }
            textAlign="center"
            fontSize="2.4rem"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
            letterSpacing="0.05rem"
          >
            {name}
          </Typography>
        {/* </Box> */}
      </Link>
    </Box>
  );
};

export default Index;
