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
  const { name, _id, image } = props.data;
  const { isHomePage, categoryArrayLength, indexes } = props;
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const isMobile = useMobile()
  return (
    <Box
      height="50rem"
      marginLeft={isHomePage ? "2rem" : 0}
      marginRight={
        isHomePage ? (indexes === categoryArrayLength ? "2rem" : 0) : 0
      }
    >
      <Link href={`/category/${name}?pid=${_id}`}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2.4rem"
        >
          <Box>
            <Box
              width={isMobile ? "15rem" : "20rem"}
              height={isMobile ? "15rem" : "20rem"}
              borderRadius="10rem"
            >
              <Image width={isMobile ? "150" : "200"} height={isMobile ? "150" : "200"} alt="category" src={image} />
            </Box>
          </Box>
          {/* <Typography
            color={
              theme === "light"
                ? lightColor.text.primary
                : darkColor.text.primary
            }
            textAlign="center"
            fontSize="1.4rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.05rem"
          >
            {name}
          </Typography> */}
        </Box>
      </Link>
    </Box>
  );
};

export default Index;
