"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PageSpacing from "@components/PageSpacing";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import Card from "@components/Card";
import axios from "axios";
import BreadCrumb from "@components/BreadCrumb";
import NoProduct from "../../../../icons/noProduct";
import { useMobile, useTablet } from "@/utils/responsive";
import ProductCardSkeleton from "@components/Skeleton/ProductCardSkeleton";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const ProductCollection = (props: any) => {
  const { params, product,categoryName } = props
  
  const queryParams = useSearchParams();
  const pid = queryParams.get("pid");
  const [productApiRes, setProductApiRes] = useState<any[]>(product.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryNameApiRes, setCategoryNameApiRes] = useState(categoryName);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const isMobile = useMobile();
  const isTablet = useTablet();


  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: `/api/category/?cid=${params.slug}`,
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         if (!res.data.data[0]._id) {
  //           return;
  //         }
  //         axios({
  //           method: "GET",
  //           url: `/api/product/?category=${res.data.data[0]._id}`,
  //         })
  //           .then((res) => {
  //             if (res.status === 200) {
  //               setIsLoading(false);
  //               setProductApiRes(res.data.data);
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             setIsLoading(false);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [params.slug]);

  return (
    <>
      <PageSpacing>
        <Box paddingLeft="2rem" marginTop="2rem">
          <BreadCrumb />
        </Box>

        <Box paddingLeft="2rem" margin={isMobile ? "5rem 0" : "2rem 0"}>
          <Typography
            color={
              theme === "light"
                ? lightColor.text.primary
                : darkColor.text.primary
            }
            fontSize="2.8rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.02rem"
          >
            {categoryNameApiRes}
          </Typography>
        </Box>

        {/* Filter feature UI */}
        {/* <Box textAlign="end" gap="0.5rem">
          <Typography
            color={color.text.primary}
            fontSize="2rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.02rem"
          >
            Filter
          </Typography>
        </Box> */}
        {isMobile ? (
          // is mobile size is active
          <Grid container spacing={1}>
            {isLoading ? (
              [...Array(4)].map((data, index) => {
                return (
                  <Grid
                    key={`${index}+ProductCardNewArrivalsSkeleton`}
                    item
                    xs={6}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
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
                  <>
                    <Grid
                      xs={6}
                      item
                      key={data._id}
                      justifyItems="center"
                      alignItems="center"
                    >
                      <Card buyButton={false} data={data} />
                    </Grid>
                  </>
                );
              })
            )}
          </Grid>
        ) : isTablet ? (
          // is tablet size is active
          <Box
            sx={{
              overflowY: "hidden",
            }}
          >
            <Box display="flex" gap="1rem">
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
                <Grid container spacing={1}>
                  {productApiRes.map((data, index) => {
                    return (
                      <>
                        <Grid
                          xs={4}
                          item
                          key={data._id}
                          justifyItems="center"
                          alignItems="center"
                        >
                          <Card data={data} />
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              )}
            </Box>
          </Box>
        ) : (
          <Grid container>
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
                    margin="5rem 0rem"
                    xs={3}
                    justifyItems="center"
                  >
                    <Card fullDetailCard={true} data={data} />
                  </Grid>
                );
              })
            )}
          </Grid>
        )}
      </PageSpacing>
    </>
  );
};

export default ProductCollection;
