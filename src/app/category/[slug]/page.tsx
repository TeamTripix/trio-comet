"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PageSpacing from "@components/PageSpacing";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import Card from "@components/Card";
import axios from "axios";
import BreadCrumb from "@components/BreadCrumb";
import NoProduct from "../../../../icons/noProduct";
import { useMobile } from "@/utils/responsive";
import ProductCardSkeleton from "@components/Skeleton/ProductCardSkeleton";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const ProductCollection = ({ params }: { params: { slug: string } }) => {
  const queryParams = useSearchParams();
  const pid = queryParams.get("pid");
  const [productApiRes, setProductApiRes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryNameApiRes, setCategoryNameApiRes] = useState("");
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const isMobile = useMobile();

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/product/?category=${pid}`,
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

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/category/?cid=${pid}`,
    })
      .then((res) => {
        if (res.status === 200) {
          setCategoryNameApiRes(res.data.data[0].name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.slug]);

  return (
    <>
      <PageSpacing>
        <Box paddingLeft="2rem" marginTop="2rem">
          <BreadCrumb />
        </Box>

        <Box paddingLeft="2rem" margin="10rem 0">
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
            letterSpacing="0.02rem">
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

        <Grid container>
          {isLoading ? (
            [...Array(4)].map((data, index: number) => {
              return (
                <Grid
                  key={`${index}+ProductCardNewArrivalsSkeleton`}
                  item
                  xs={3}>
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
                  justifyItems="center">
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
