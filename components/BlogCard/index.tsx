import React from "react";
import { Box, Typography } from "@mui/material";
import { darkColor, lightColor } from "../../src/utils/CustomTheme/color";
import Image from "next/legacy/image";
import ForwardIcon from "../../icons/forwardIcon";
import Link from "next/link";
import { useMobile, useTablet } from "../../src/utils/responsive";
import { useSelector } from "react-redux";
const Index = (props: any) => {
  const isTablet = useTablet();
  const isMobile = useMobile();
  const { isHomePage, index } = props;
  const { heading, _id, desc, createdAt, banner } = props.data;
  const splitDate = createdAt.slice(0, 10).split("-");
  const date = splitDate.reverse();
  const theme: any = useSelector<any>((state) => state.themeToggle);

  return (
    <Link href={`/blog/${heading}?pid=${_id}`}>
      <Box
        display="flex"
        width={isTablet ? (isMobile ? "26rem" : "43.7rem") : "100%"}
        height={"auto"}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="1.6rem"
        border={
          theme === "light" ? lightColor.borderColor : darkColor.borderColor
        }
        bgcolor={theme === "light" ? lightColor.cardBG : darkColor.cardBG}
        overflow="hidden"
        marginLeft={isHomePage ? (index === 0 ? "2rem" : 0) : 0}
        marginRight={isHomePage ? (index === 2 ? "2rem" : 0) : 0}>
        <Box width="100%" height="auto">
          <Image
            src={banner}
            loading="lazy"
            alt="blog thumbnail"
            width={1900}
            height={750}
            layout="responsive"
          />
        </Box>
        <Box
          display="flex"
          width="100%"
          height="auto"
          padding="0.7rem 1.6rem"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          gap="1.6rem"
          borderRadius="0rem 0rem 1.6rem 1.6rem">
          <Typography
            color={
              theme === "light"
                ? lightColor.text.primary
                : darkColor.text.primary
            }
            textAlign="center"
            fontSize={isMobile ? "1.6rem" : "2rem"}
            fontStyle="normal"
            fontWeight={isMobile ? "700" : "500"}
            lineHeight="normal"
            letterSpacing="0.05rem">
            {heading}
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="0.8rem">
            <Typography
              color={
                theme === "light" ? lightColor.text.fade : darkColor.text.secondary
              }
              fontSize={isMobile ? "0.8rem" : "1.2rem"}
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
              letterSpacing="0.05rem"
              width="6.8rem">
              {date.map((item: any) => `${item}/`)}
            </Typography>
            <Box
              height={"1rem"}
              width={"1rem"}
              borderRadius={"50%"}
              bgcolor={theme === "light" ? lightColor.text.offer : darkColor.text.offer}></Box>
            <Typography
              color={theme === "light" ? lightColor.text.fade : darkColor.text.secondary}
              fontSize={isMobile ? "0.8rem" : "1.2rem"}
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
              letterSpacing="0.05rem"
              width="13.4rem">
              2 minutes read
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              color={theme === "light" ? lightColor.text.fade : darkColor.text.secondary}
              fontSize={isMobile ? "0.8rem" : "1.4rem"}
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
              letterSpacing="0.05rem"
              alignSelf="stretch"
              dangerouslySetInnerHTML={{
                __html: desc.slice(0, 250),
              }}></Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap="0.4rem"
            flexShrink="0">
            <Typography
              color={theme === "light" ? lightColor.text.link : darkColor.text.link }
              textAlign="center"
              fontSize={isMobile ? "1.2rem" : "1.6rem"}
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
              letterSpacing="0.05rem"
              display="flex"
              alignItems="center">
              Read More
              <ForwardIcon />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Index;
