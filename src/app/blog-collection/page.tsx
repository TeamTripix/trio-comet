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
import { useMobile, useTablet } from "@/utils/responsive";

const BlogCollection = ({ params }: { params: { slug: string } }) => {
  const [blogApiRes, setBlogApiRes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const isMobile = useMobile();
  const isTablet = useTablet();

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
        {isMobile ? (
          ""
        ) : (
          <Box
            paddingLeft={isMobile || isTablet ? "1rem" : "2rem"}
            marginTop="2rem"
          >
            <BreadCrumb />
          </Box>
        )}

        <Box
          paddingLeft={isMobile || isTablet ? "1rem" : "2rem"}
          margin="2rem 0"
        >
          <Typography
            color={
              theme === "light"
                ? lightColor.text.primary
                : darkColor.text.primary
            }
            fontSize={isMobile ? "2rem" : "2.8rem" }
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.02rem"
            margin={isMobile || isTablet ? "0 1rem" : 0 }
          >
            {"Blogs"}
          </Typography>
        </Box>

        <Grid container spacing={isMobile || isTablet ? 2 : 4}>
          {isLoading === true
            ? [...Array(3)].map((data, index) => {
                return (
                  <Grid
                    key={`${index}+BlogCardSkeleton`}
                    item
                    xs={isMobile || isTablet ? 12  : 4}
                    display="flex"
                    justifyContent="center"
                  >
                    <ProductCardSkeleton />
                  </Grid>
                );
              })
            : blogApiRes.length === 0
            ? "no blog found"
            : blogApiRes.map((data, index) => {
                return isMobile ? (
                  <Grid
                    key={`${index}blog`}
                    item
                    xs={isMobile ? 12 : isTablet ? 6 : 4}
                    margin={isMobile ? "0" : "5rem 0"}
                    display="flex"
                    justifyContent="center"
                  >
                    <BlogCard data={data} />
                  </Grid>
                ) : (
                  <Grid
                    key={`${index}blog`}
                    item
                    xs={isTablet ? 6 : 4}
                    justifyContent="center"
                    alignItems="center"
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
