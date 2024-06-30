"use client"
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import For0for from "../../icons/for0for";
import PageSpacing from "@components/PageSpacing";
import { lightColor } from "@/utils/CustomTheme/color";
import Link from "next/link";
import styled from "@emotion/styled";

const LI = styled.li<any>`
  color: ${ lightColor.text.primary};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 3rem;
  letter-spacing: 0.05rem;
  list-style: none;
`;


const Page = () => {
  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <For0for />
      </Box>
      <Container>
        {/* <Box display="flex" justifyContent="center" alignItems="center"> */}
        <Box sx={{marginBottom:"2.5rem"}}>
          <Typography>Maybe you`&apos;`ll find it in one of these categories:</Typography>
        </Box>
        <Grid item xs={3} >
             
              {/* <LI theme={theme}>+919650001541</LI> */}
              <Link href={"/new-arrivals"}>
                <LI>New Arrivals</LI>
              </Link>
              {/* <Link target="_blank" href={"mailto:info@triocomet.com"}>
                <LI theme={theme}>Email</LI>
              </Link> */}
              <Link href={"/men"}>
                <LI>Men</LI>
              </Link>
              <Link href={"/combos"}>
                <LI>Combo</LI>
              </Link>
              <Link href={"/product-collection/new-drop"}>
                <LI>New Drop</LI>
              </Link>
              <Link href={"/product-collection/trending"}>
                <LI>Trending</LI>
              </Link>
              <Link href={"/product-collection/best-seller"}>
                <LI>Best Seller</LI>
              </Link>
            </Grid>
      </Container>
    </>
  );
};

export default Page;
