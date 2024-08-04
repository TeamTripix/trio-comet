"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import PageSpacing from "@components/PageSpacing";
import BreadCrumb from "@components/BreadCrumb";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import Image from "next/image";
import BlogCard from "@components/BlogCard";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useMobile, useTablet } from "@/utils/responsive";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  WhatsappIcon,
  LinkedinIcon,
  WhatsappShareButton,
} from "next-share";

const Blog = ({ params }: { params: { slug: string } }) => {
  const queryParams = useSearchParams();
  const pid = queryParams.get("pid");
  const [blogApiRes, setBlogApiRes] = useState<any>([]);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const [otherBlogsData, setOtherBlogsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isTablet = useTablet();
  const isMobile = useMobile();

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/blog?slug=${params.slug}`,
    })
      .then((res) => {
        setBlogApiRes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      method: "GET",
      url: "/api/blog",
    })
      .then((res) => {
        setIsLoading(false);
        setOtherBlogsData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [params.slug]);

  return (
    <>
      {blogApiRes.length === 0 ? (
        "loading..."
      ) : (
        <>
          {isMobile ? (
            ""
          ) : (
            <PageSpacing>
              <Box margin="1.7rem 1rem">
                <BreadCrumb />
              </Box>
            </PageSpacing>
          )}

          <Grid container spacing={2}>
            {isMobile || isTablet ? (
              <>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="3.6rem"
                    width="100%"
                    overflow="hidden"
                    padding="0 2rem"
                  >
                    <Box>
                      <Typography
                        variant="h1"
                        color={
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary
                        }
                        textAlign="center"
                        fontSize="2.4rem"
                        fontStyle="normal"
                        fontWeight="700"
                        lineHeight="normal"
                        letterSpacing="0.05rem"
                      >
                        {blogApiRes[0].heading}
                      </Typography>
                    </Box>
                    <Box width="100%" height="auto">
                      <Image
                        width={"1836"}
                        height={"800"}
                        src={blogApiRes[0].banner}
                        alt="blogThumbnail"
                        layout="responsive"
                      />
                    </Box>
                    <PageSpacing>
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap="2.2rem"
                        padding="0 1rem"
                      >
                        <Typography
                          color={
                            theme === "light"
                              ? lightColor.text.fade
                              : darkColor.text.secondary
                          }
                          textAlign="left"
                          fontSize="1.4rem"
                          fontStyle="normal"
                          fontWeight="500"
                          lineHeight="normal"
                          letterSpacing="0.02rem"
                          padding="0 2rem"
                        >
                          15/01/2024
                        </Typography>
                        <Typography
                          style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            width: isMobile ? "90vw" : "100%",
                            boxSizing: "border-box",
                            marginLeft: isMobile ? "5vw" : "0",
                          }}
                          color={
                            theme === "light"
                              ? lightColor.text.primary
                              : darkColor.text.primary
                          }
                          dangerouslySetInnerHTML={{
                            __html: blogApiRes[0].desc,
                          }}
                        ></Typography>
                      </Box>
                    </PageSpacing>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    padding="auto"
                    margin="auto"
                    alignItems={"center"}
                  >
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
                      letterSpacing="0.02rem"
                      display={"flex"}
                      gap={1}
                      flexDirection={"row"}
                    >
                      <FacebookShareButton
                        url={"https://github.com/next-share"}
                        quote={
                          "next-share is a social share buttons for your next React apps."
                        }
                        hashtag={"#nextshare"}
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <PinterestShareButton
                        url={"https://github.com/next-share"}
                        media={
                          "next-share is a social share buttons for your next React apps."
                        }
                      >
                        <PinterestIcon size={32} round />
                      </PinterestShareButton>
                      <TelegramShareButton
                        url={"https://github.com/next-share"}
                        title={
                          "next-share is a social share buttons for your next React apps."
                        }
                      >
                        <TelegramIcon size={32} round />
                      </TelegramShareButton>
                      <TwitterShareButton
                        url={"https://github.com/next-share"}
                        title={
                          "next-share is a social share buttons for your next React apps."
                        }
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <WhatsappShareButton
                        url={"https://github.com/next-share"}
                        title={
                          "next-share is a social share buttons for your next React apps."
                        }
                        separator=":: "
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <LinkedinShareButton
                        url={"https://github.com/next-share"}
                      >
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    // padding="0 0 0 10px"
                    justifyContent="center"
                    alignItems="center"
                  >
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
                      letterSpacing="0.02rem"
                    >
                      {isLoading ? (
                        "loading..."
                      ) : (
                        <Grid container>
                          {otherBlogsData.length === 0
                            ? "No other blogs found."
                            : otherBlogsData.map((blog, index) => (
                                <Grid key={`blog-${index}`} item xs={12}>
                                  <BlogCard data={blog} />
                                </Grid>
                              ))}
                        </Grid>
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={2}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    padding="0px 0px"
                    margin="2.7rem 2.7rem"
                  >
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
                      letterSpacing="0.02rem"
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <FacebookShareButton
                        url={"https://github.com/next-share"}
                        quote={
                          "next-share is a social share buttons for your next React apps."
                        }
                        hashtag={"#nextshare"}
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <PinterestShareButton
                        url={"https://github.com/next-share"}
                        media={
                          "next-share is a social share buttons for your next React apps."
                        }
                      >
                        <PinterestIcon size={32} round />
                      </PinterestShareButton>
                      <TelegramShareButton
                        url={"https://github.com/next-share"}
                        title={
                          "next-share is a social share buttons for your next React apps."
                        }
                      >
                        <TelegramIcon size={32} round />
                      </TelegramShareButton>
                      <TwitterShareButton
                        url={"https://github.com/next-share"}
                        title={
                          "next-share is a social share buttons for your next React apps."
                        }
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <WhatsappShareButton
                        url={"https://github.com/next-share"}
                        title={
                          "next-share is a social share buttons for your next React apps."
                        }
                        separator=":: "
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <LinkedinShareButton
                        url={"https://github.com/next-share"}
                      >
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap="3.6rem"
                    width="100%"
                    margin="0 2.7rem"
                    overflow="hidden"
                  >
                    <Box>
                      <Typography
                        variant="h1"
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
                        letterSpacing="0.05rem"
                      >
                        {blogApiRes[0].heading}
                      </Typography>
                    </Box>
                    <Box width="100%" height="auto">
                      <Image
                        width={"1836"}
                        height={"800"}
                        src={blogApiRes[0].banner}
                        alt="blogThumbnail"
                        layout="responsive"
                      />
                    </Box>
                    <PageSpacing>
                      <Box display="flex" flexDirection="column" gap="2.2rem">
                        <Typography
                          color={
                            theme === "light"
                              ? lightColor.text.fade
                              : darkColor.text.secondary
                          }
                          textAlign="left"
                          fontSize="1.4rem"
                          fontStyle="normal"
                          fontWeight="500"
                          lineHeight="normal"
                          letterSpacing="0.02rem"
                        >
                          15/01/2024
                        </Typography>
                        <Typography
                          textAlign="left"
                          style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                          color={
                            theme === "light"
                              ? lightColor.text.primary
                              : darkColor.text.primary
                          }
                          dangerouslySetInnerHTML={{
                            __html: blogApiRes[0].desc,
                          }}
                        ></Typography>
                      </Box>
                    </PageSpacing>
                  </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    padding="0 0 0 10px"
                  >
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
                      letterSpacing="0.02rem"
                    >
                      {isLoading ? (
                        "loading..."
                      ) : (
                        <Grid container>
                          {otherBlogsData.length === 0
                            ? "No other blogs found."
                            : otherBlogsData.map((blog, index) => (
                                <Grid key={`blog-${index}`} item xs={12}>
                                  <BlogCard data={blog} />
                                </Grid>
                              ))}
                        </Grid>
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Blog;
