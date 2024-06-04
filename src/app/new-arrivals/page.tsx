"use client";
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Typography, Link, Stack, Grid } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PageSpacing from "@components/PageSpacing";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import Card from "@components/Card";
import axios from "axios";
import BreadCrumb from "@components/BreadCrumb";
import NoProduct from "../../../icons/noProduct";
import ProductCardSkeleton from "@components/Skeleton/ProductCardSkeleton";
import { useMobile } from "@/utils/responsive";
import { useSelector } from "react-redux";

const Page = ({ params }: { params: { slug: string } }) => {
  const [comboProductApiRes, setComboProductApiRes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const isMobile = useMobile();

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/product/?tag=combo",
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setComboProductApiRes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <PageSpacing>
        <Box paddingLeft="2rem" marginTop="2rem">
          <BreadCrumb />
        </Box>

        <Box paddingLeft="2rem" margin="1rem 0">
          <Typography
            color={theme === "light"
            ? lightColor.text.primary
            : darkColor.text.primary}
            fontSize="2.8rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.02rem"
          >
            New Arrivals
          </Typography>
        </Box>
        {/* <Box textAlign="end" gap="0.5rem">
          <Typography
            color={theme === "light"
            ? lightColor.text.primary
            : darkColor.text.primary}
            fontSize="2rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.02rem"
          >
            Filter
          </Typography>
        </Box> */}

        <Grid container spacing={1}>
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
          ) : comboProductApiRes.length === 0 ? (
            <Box width="100%" textAlign="center">
              <NoProduct isMobile={isMobile} />
            </Box>
          ) : (
            comboProductApiRes.map((data) => {
              return (
                <Grid key={data._id} item xs={3}>
                  <Card data={data} />
                </Grid>
              );
            })
          )}
        </Grid>
      </PageSpacing>
    </>
  );
};

export default Page;
