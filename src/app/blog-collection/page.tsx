"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PageSpacing from "@components/PageSpacing";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import BlogCard from "@components/BlogCard";
import BreadCrumb from "@components/BreadCrumb";
import axios from "axios";
import ProductCardSkeleton from "@components/Skeleton/ProductCardSkeleton";
import { useSelector } from "react-redux";
import { useMobile } from "@/utils/responsive";

const BlogCollection = ({ params }: { params: { slug: string } }) => {
  const [blogApiRes, setBlogApiRes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const isMobile = useMobile();

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/blog",
    })
      .then((res) => {
        setIsLoading(false);
        setBlogApiRes(res.data.data);
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
            {"Blogs"}
          </Typography>
        </Box>

        <Grid container spacing={isMobile ? 2 : 4}>
          {isLoading === true
            ? [...Array(3)].map((data, index) => {
              return (
                <Grid
                  key={`${index}+BlogCardSkeleton`}
                  item
                  xs={isMobile ? 6 : 4}
                >
                  <ProductCardSkeleton />
                </Grid>
              );
            })
            : blogApiRes.length === 0
              ? "no blog found"
              : blogApiRes.map((data, index) => {
                return (
                  <Grid
                    key={`${index}blog`}
                    item
                    xs={isMobile ? 6 : 4}
                    margin={isMobile ? "1rem 0" : "5rem 0"}
                  >
                    <BlogCard data={data} />
                  </Grid>
                );
              })}
        </Grid>
      </PageSpacing>
    </>
  );
};

export default BlogCollection;
