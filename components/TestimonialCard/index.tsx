"use client"
import React from "react";
import { Box, Typography } from "@mui/material";
import { lightColor, darkColor } from "../../src/utils/CustomTheme/color";
import Image from "next/legacy/image";
import { useMobile, useTablet } from "../../src/utils/responsive";
import { useSelector } from "react-redux";
const Index = () => {
  const isTablet = useTablet();
  const isMobile = useMobile();
  const theme: any = useSelector<any>((state) => state.themeToggle);
  return (
    <Box
      width={isMobile ? "70vw" :isTablet ? "33rem" : "100%"}
      padding="1rem"
      height={isMobile ? "auto" : "20rem"}
      sx={{
        filter: "drop-shadow(0px 6px 15px rgba(0, 0, 0, 0.05))",
        marginLeft: isMobile ? "auto" : 0,
        marginRight: isMobile ? "auto" : 0,
      }}>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        position="relative"
        top="5rem">
        <Box
          width="11.1rem"
          height="11.1rem"
          flexShrink="0"
          borderRadius="11.1rem"
          border={`5px solid ${
            theme === "light" ? lightColor.borderColor : darkColor.borderColor
          }`}
          overflow="hidden">
          <Image
            src="/assets/testimonialCustomerImage/1.webp"
            loading="lazy"
            alt="customer'sImages"
            width={111}
            height={111}
          />
        </Box>
      </Box>

      <Box
        width="100%"
        height="20rem"
        flexShrink="0"
        borderRadius="1.6rem"
        border={`2px solid ${
          theme === "light" ? lightColor.borderColor : darkColor.borderColor
        }`}
        bgcolor={theme === "light" ? lightColor.cardBG : darkColor.cardBG}
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Typography
          color={
            theme === "light" ? lightColor.text.primary : darkColor.text.primary
          }
          textAlign="center"
          fontSize="1.6rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="normal"
          letterSpacing="0.05rem"
          width="100%"
          position="relative"
          top="2rem">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none">
            <path
              d="M5.083 17.321C4.053 16.227 3.5 15 3.5 13.011C3.5 9.511 5.957 6.374 9.53 4.823L10.423 6.201C7.088 8.005 6.436 10.346 6.176 11.822C6.713 11.544 7.416 11.447 8.105 11.511C9.909 11.678 11.331 13.159 11.331 15C11.331 15.9283 10.9623 16.8185 10.3059 17.4749C9.6495 18.1313 8.75926 18.5 7.831 18.5C7.31766 18.4955 6.81034 18.389 6.33856 18.1866C5.86679 17.9841 5.43999 17.6899 5.083 17.321ZM15.083 17.321C14.053 16.227 13.5 15 13.5 13.011C13.5 9.511 15.957 6.374 19.53 4.823L20.423 6.201C17.088 8.005 16.436 10.346 16.176 11.822C16.713 11.544 17.416 11.447 18.105 11.511C19.909 11.678 21.331 13.159 21.331 15C21.331 15.9283 20.9623 16.8185 20.3059 17.4749C19.6495 18.1313 18.7593 18.5 17.831 18.5C17.3177 18.4955 16.8103 18.389 16.3386 18.1866C15.8668 17.9841 15.44 17.6899 15.083 17.321Z"
              fill="#FBC02D"
            />
          </svg>
          Lorem ipsum dolor sit amet consectetur. Leo nunc cursus posuere mi
          turpis eget. Ultrices rutrum turpis dui commodo orci eleifend
          venenatis.
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none">
            <path
              d="M19.917 6.679C20.947 7.773 21.5 9 21.5 10.989C21.5 14.489 19.043 17.626 15.47 19.177L14.577 17.799C17.912 15.995 18.564 13.654 18.824 12.178C18.287 12.456 17.584 12.553 16.895 12.489C15.091 12.322 13.669 10.841 13.669 9C13.669 8.07174 14.0377 7.18151 14.6941 6.52513C15.3505 5.86875 16.2407 5.5 17.169 5.5C17.6823 5.50449 18.1897 5.61104 18.6614 5.81345C19.1332 6.01586 19.56 6.31008 19.917 6.679ZM9.917 6.679C10.947 7.773 11.5 9 11.5 10.989C11.5 14.489 9.043 17.626 5.47 19.177L4.577 17.799C7.912 15.995 8.564 13.654 8.824 12.178C8.287 12.456 7.584 12.553 6.895 12.489C5.091 12.322 3.669 10.841 3.669 9C3.669 8.07174 4.03775 7.18151 4.69413 6.52513C5.3505 5.86875 6.24074 5.5 7.169 5.5C7.68234 5.50449 8.18966 5.61104 8.66144 5.81345C9.13321 6.01586 9.56001 6.31008 9.917 6.679Z"
              fill="#FBC02D"
            />
          </svg>
        </Typography>
      </Box>
    </Box>
  );
};

export default Index;
