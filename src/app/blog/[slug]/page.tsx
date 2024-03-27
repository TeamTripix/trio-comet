"use client";
import { useState, useEffect } from "react";
import { Box, Breadcrumbs, Typography, Grid } from "@mui/material";
import PageSpacing from "@components/PageSpacing";
import BreadCrumb from "@components/BreadCrumb";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import Image from "next/image";
import Link from "next/link";
import ForwardIcon from "../../../../icons/forwardIcon";
import BlogCard from "@components/BlogCard";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const Blog = ({ params }: { params: { slug: string } }) => {
  const queryParams = useSearchParams();
  const pid = queryParams.get("pid");
  const [blogApiRes, setBlogApiRes] = useState<any>([]);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/blog?bid=${pid}`,
    })
      .then((res) => {
        setBlogApiRes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {blogApiRes.length === 0 ? (
        "loading..."
      ) : (
        <>
          <PageSpacing>
            <Box margin="2.7rem 0">
              <BreadCrumb />
            </Box>
          </PageSpacing>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="5.6rem"
            alignSelf="stretch">
            <Box>
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize="4rem"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem">
                {blogApiRes[0].heading}
              </Typography>
            </Box>
            <Box width="100%" height="auto">
              <Image
                width={"1536"}
                height={"500"}
                src={blogApiRes[0].banner}
                alt="blogThumbnail"
                layout="responsive"
              />
            </Box>
            <PageSpacing>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                gap="3.2rem">
                <Typography
                  color={
                    theme === "light"
                      ? lightColor.text.fade
                      : darkColor.text.secondary
                  }
                  textAlign="center"
                  fontSize="1.4rem"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="normal"
                  letterSpacing="0.02rem">
                  15/01/2024
                </Typography>
                <Typography
                color={theme === "light"
                ? lightColor.text.primary
                : darkColor.text.primary}
                  dangerouslySetInnerHTML={{
                    __html: blogApiRes[0].desc,
                  }}></Typography>
              </Box>
              <Box
                display="flex"
                padding="8rem 0"
                flexDirection="column"
                justifyContent="center"
                // bgcolor="#FFF"
                >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  margin="6rem 0">
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary
                    }
                    textAlign="center"
                    fontSize="2.8rem"
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="normal"
                    letterSpacing="0.05rem">
                    Blogs
                  </Typography>
                  <Link href={"blog-collection"}>
                    <Box
                      display="flex"
                      // width="67.3rem"
                      justifyContent="flex-end"
                      alignItems="center"
                      gap="0.4rem"
                      flexShrink="0">
                      <Typography
                        color={lightColor.text.link}
                        textAlign="center"
                        fontSize="1.8rem"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                        letterSpacing="0.05rem"
                        display="flex"
                        alignItems="center">
                        View more
                        <ForwardIcon />
                      </Typography>
                    </Box>
                  </Link>
                </Box>
                {/* <Grid height="52.1rem" container spacing={4}>
              <Grid item xs={4}>
                <BlogCard />
              </Grid>
              <Grid item xs={4}>
                <BlogCard />
              </Grid>
              <Grid item xs={4}>
                <BlogCard />
              </Grid>
            </Grid> */}
              </Box>
            </PageSpacing>
          </Box>
        </>
      )}
    </>
  );
};

export default Blog;
