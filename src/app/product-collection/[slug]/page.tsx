"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PageSpacing from "@components/PageSpacing";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import Card from "@components/Card";
import axios from "axios";
import BreadCrumb from "@components/BreadCrumb";
import { useMobile } from "../../../utils/responsive";
import ProductCardSkeleton from "@components/Skeleton/ProductCardSkeleton";
import NoProduct from "../../../../icons/noProduct";
import { useSelector } from "react-redux";
const ProductCollection = ({ params }: { params: { slug: string } }) => {
  const [productApiRes, setProductApiRes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMobile = useMobile();
  const theme: any = useSelector<any>((state) => state.themeToggle);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/${params.slug === "daily_deals" ? "daily-deals-product" : "product" }/?tag=${params.slug}`,
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setProductApiRes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [params.slug]);
  return (
    <>
      <PageSpacing>
        <Box paddingLeft="2rem" marginTop="2rem">
          <BreadCrumb />
        </Box>

        <Box paddingLeft="2rem" margin="3rem 0">
          <Typography
            color={theme==="light" ? lightColor.text.primary: darkColor.text.primary}
            fontSize="2.8rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.02rem"
            textTransform="capitalize"
          >
            {params.slug.split("_").join(" ")}
          </Typography>
        </Box>

        {/* Filter feature UI   */}
        {/* <Box
          textAlign={isMobile ? "start" : "end"}
          gap="0.5rem"
          margin="1.5rem 0"
        >
          <Typography
            color={color.text.primary}
            fontSize={isMobile ? "1.6rem" : "2rem"}
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.02rem"
            paddingLeft="2rem"
          >
            Filter
          </Typography>
        </Box> */}

        <Grid justifyContent="center" padding="0 0.5rem" container spacing={isMobile? 0.5 : 2}>
          {isLoading ? (
            [...Array(4)].map((data, index: number) => {
              return (
                <Grid
                  key={`${index}+ProductCardNewArrivalsSkeleton`}
                  item
                  xs={3}
                >
                  <ProductCardSkeleton />
                </Grid>
              );
            })
          ) : productApiRes.length === 0 ? (
            <Box width="100%" textAlign="center">
              <NoProduct isMobile={isMobile} />
            </Box>
          ) : (
            productApiRes.map((data) => {
              return (
                <Grid
                  key={data._id}
                  item
                  margin={isMobile ? "1rem 0" : "5rem 0rem"}
                  justifyItems="center"
                >
                  <Card fullDetailCard={true} data={data} />
                </Grid>
              );
            })
          )}
        </Grid>
      </PageSpacing>
    </>
  );
};

export default ProductCollection;
