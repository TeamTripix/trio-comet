"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Tab, Tabs, Grid, Skeleton } from "@mui/material";
import Image from "next/image";
import Card from "@components/Card";
import ForwardIcon from "../../icons/forwardIcon";
import CategoryCard from "@components/CategoryCard";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import YTPlayer from "@components/YTPlayer";
import BlogCard from "@components/BlogCard";
import TestimonialCard from "@components/TestimonialCard";
import HomePageSpacing from "@components/HomePageSpacing";
import PageSpacing from "@components/PageSpacing";
import Link from "next/link";
import axios from "axios";
import { useTablet, useMobile } from "../utils/responsive";
import ProductCardSkeleton from "@components/Skeleton/ProductCardSkeleton";
import CategorySkeleton from "@components/Skeleton/CategorySkeleton";
import NoProduct from "../../icons/noProduct";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import RightIcon from "../../icons/rightIcon";
import LeftIcon from "../../icons/leftIcon";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box>
//           <Box>{children}</Box>
//         </Box>
//       )}
//     </div>
//   );
// }

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = useState(0);
  const [onSaleApiRes, setOnSaleApiRes] = useState<any[]>([]);
  const [dailyDealsApiRes, setDailyDealsApiRes] = useState<any[]>([]);
  const [bestSellerApiRes, setBestSellerApiRes] = useState<any[]>([]);
  const [newArraivalApiRes, setNewArraivalApiRes] = useState<any[]>([]);
  const [caregoryApiRes, setCaregoryApiRes] = useState<any[]>([]);
  const [blogApiRes, setBlogApiRes] = useState<any[]>([]);
  const [bannerHeight, setBannerHeight] = useState(760);
  const [bannerWidth, setBannerWidth] = useState(1920);
  const [isOnSaleLoading, setIsOnsaleLoading] = useState(true);
  const [isDailyDealsLoading, setIsDailyDealsLoading] = useState(true);
  const [isBestSellerLoading, setIsBestSellerLoading] = useState(true);
  const [isNewArrivalLoading, setIsNewArrivalLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isBlogLoading, setIsBlogLoading] = useState(true);
  const [bannerApiRes, setBannerApiRes] = useState<any>([]);
  const [bannerApiLoading, setBannerApiLoading] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const [count, setCount] = useState(0);

  const isTablet = useTablet();
  const isMobile = useMobile();
  const AutoplaySlider: any = withAutoplay(AwesomeSlider);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  useEffect(() => {
    // get banner
    axios({
      method: "GET",
      url: `/api/banner`,
    })
      .then((res) => {
        setBannerApiRes(res.data.data);
        setBannerApiLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setBannerApiLoading(false);
      });

    // get sale product api
    axios({
      method: "GET",
      url: `/api/product/?on-sale=true`,
    })
      .then((res) => {
        setOnSaleApiRes(res.data.data);
        setIsOnsaleLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsOnsaleLoading(false);
      });

    // get dailt deals product api
    axios({
      method: "GET",
      url: "/api/daily-deals-product",
    })
      .then((res) => {
        setDailyDealsApiRes(res.data.data);
        setIsDailyDealsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsDailyDealsLoading(false);
      });

    // get best seller product api
    axios({
      method: "GET",
      url: "/api/product/?tag=best_seller",
    })
      .then((res) => {
        setBestSellerApiRes(res.data.data);
        setIsBestSellerLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsBestSellerLoading(false);
      });

    // get new arrival product api
    axios({
      method: "GET",
      url: "/api/product/?tag=new_arrivals",
    })
      .then((res) => {
        setNewArraivalApiRes(res.data.data);
        setIsNewArrivalLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsNewArrivalLoading(false);
      });

    // get category api
    axios({
      method: "GET",
      url: "/api/category",
    })
      .then((res) => {
        setCaregoryApiRes(res.data.data);
        setIsCategoryLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsCategoryLoading(false);
      });

    // get blog api
    axios({
      method: "GET",
      url: "/api/blog",
    })
      .then((res) => {
        setBlogApiRes(res.data.data);
        setIsBlogLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsBlogLoading(false);
      });
  }, []);

  const ref = useRef<HTMLImageElement>(null);
  const updateHeight = () => {
    if (ref.current) {
      const heightValue = ref.current.getBoundingClientRect().height;
      const widthValue = ref.current.getBoundingClientRect().width;
      setBannerHeight(heightValue);
      setBannerWidth(widthValue);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const NextArrow = (props: any) => {
    return (
      <div
        className={`${theme === "light" ? "arrow" : "arrow-dark"} arrow  next`}
        onClick={props.onClick}
      >
        <RightIcon />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <div
        className={`${theme === "light" ? "arrow" : "arrow-dark"} arrow  prev`}
        onClick={props.onClick}
      >
        <LeftIcon />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: isMobile ? 1 : 5,
    centerMode: true,
    centerPadding: 0,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    beforeChange: (current: any, next: any) => setImageIndex(next),
  };

  return (
    <>
      <Box>
        {bannerApiLoading ? (
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "76rem",
              borderRadius: "0.8rem",
            }}
          ></Skeleton>
        ) : bannerApiRes.length === 0 ? (
          ""
        ) : (
          <AutoplaySlider
            bullets={false}
            play={true}
            cancelOnInteraction={false}
            interval={6000}
            style={{ height: bannerHeight - 10 }}
          >
            {bannerApiRes.map((data: any) => {
              return (
                // <Box key={data.id} width="100%" height={bannerHeight}>
                <Box key={data.id}>
                  <Link href={data.link}>
                    <Image
                      ref={ref}
                      src={data.imageURL}
                      alt="banner"
                      loading="lazy"
                      width={1920}
                      height={bannerHeight}
                      onLoadingComplete={(img) => {
                        setBannerHeight(img.naturalHeight);
                        setBannerWidth(img.naturalWidth);
                      }}
                      layout="responsive"
                    />
                  </Link>
                </Box>
              );
            })}
          </AutoplaySlider>
          // <Slider data={bannerApiRes}/>
        )}

        {/* Categories */}
        <HomePageSpacing>
          <Box display="flex" justifyContent="center" margin="1rem">
            <Typography
              color={
                theme === "light"
                  ? lightColor.text.primary
                  : darkColor.text.primary
              }
              // textAlign="center"
              fontSize={isMobile ? "2.2rem" : "2.8rem"}
              fontStyle="normal"
              fontWeight="700"
              lineHeight="normal"
              letterSpacing="0.05rem"
            >
              TRENDING CATEGORIES
            </Typography>
          </Box>
          {isMobile ?
            (<Grid container spacing={2}>
              {isCategoryLoading ? (
                [...Array(4)].map((data, index) => {
                  return (
                    <Grid
                      key={`categorySkeletonMobile+${index}`}
                      item
                      xs={6}
                      sm={4}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CategorySkeleton />
                    </Grid>
                  );
                })
              ) : caregoryApiRes.length === 0 ? (
                <Box width="100%" textAlign="center">
                  <NoProduct isMobile={isMobile} />
                </Box>
              ) : (
                caregoryApiRes.slice(0, 5).map((data, index) => {
                  return (
                    <Grid
                      key={data._id}
                      item
                      xs={6}
                      sm={4}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CategoryCard
                        data={data}
                        isHomePage={true}
                        indexes={index}
                        categoryArrayLength={caregoryApiRes.length - 1}
                      />
                    </Grid>
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
                  {isCategoryLoading ? (
                    [...Array(4)].map((data, index) => {
                      return (
                        <Grid
                          key={`categorySkeletonMobile+${index}`}
                          item
                          xs={3}
                        >
                          <CategorySkeleton />
                        </Grid>
                      );
                    })
                  ) : caregoryApiRes.length === 0 ? (
                    <Box width="100%" textAlign="center">
                      <NoProduct isMobile={isMobile} />
                    </Box>
                  ) : (
                    caregoryApiRes.slice(0, 5).map((data, index) => {
                      return (
                        <>
                          <Box key={data._id}>
                            <CategoryCard
                              data={data}
                              isHomePage={true}
                              indexes={index}
                              categoryArrayLength={caregoryApiRes.length - 1}
                            />
                          </Box>
                        </>
                      );
                    })
                  )}
                </Box>
              </Box>
            ) : (
              <Box
                display="flex"
                width="100%"
                alignItems="flex-start"
                overflow="scroll"
              >
                {isCategoryLoading ? (
                  [...Array(11)].map((d, i) => {
                    return (
                      <Box key={`categorySkeleton+${i}`}>
                        <CategorySkeleton />
                      </Box>
                    );
                  })
                ) : caregoryApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  <Grid container sx={{ width: "100vw" }} spacing={10}>
                    {caregoryApiRes.slice(0, 5).map((data, index) => {
                      return (
                        <Grid key={data._id} item xs={2.3}>
                          <CategoryCard
                            data={data}
                            isHomePage={true}
                            indexes={index}
                            categoryArrayLength={caregoryApiRes.length - 1}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </Box>)}
        </HomePageSpacing>

        <>
          <Box sx={{ margin: "5rem 0", marginTop: "3rem" }}>
            {/* <Box display="flex" justifyContent="center">
              <Box
                sx={{
                  width: "21rem",
                  marginTop: "2rem",
                  marginBottom: isMobile ? "6rem" : 0,
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    sx={{
                      textAlign: "center",
                      fontSize: "1.6rem",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                      letterSpacing: "0.05rem",
                      textTransform: "capitalize",
                      height: "1.9rem",
                    }}
                    label="On sale"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{
                      textAlign: "center",
                      fontSize: "1.6rem",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                      letterSpacing: "0.05rem",
                      textTransform: "capitalize",
                      height: "1.9rem",
                    }}
                    label="Daily deals"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
            </Box> */}

            {/* <CustomTabPanel value={value} index={0}> */}
            {/* {isMobile ? (
                ""
              ) : ( */}
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "2.2rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
                margin="1rem 0"
                marginLeft={isMobile || isTablet ? "2rem" : 0}
              >
                NEW DROPS
              </Typography>
              {/* {isMobile ? (
                    ""
                  ) : ( */}
              {/* <Link href="product-collection/sale">
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  gap="0.4rem"
                  flexShrink="0"
                >
                  <Typography
                    color={lightColor.text.link}
                    textAlign="center"
                    fontSize={isMobile ? "1.4rem" : "1.8rem"}
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                    letterSpacing="0.05rem"
                    display="flex"
                    alignItems="center"
                    marginRight={isMobile ? "2rem" : ""}
                  >
                    View more
                    {!isMobile && <ForwardIcon />}
                  </Typography>
                </Box>
              </Link> */}
              {/* )} */}
            </Box>
            {/* )} */}

            {isMobile ? (
              // is mobile size is active
              <Grid container spacing={2}>
                {isOnSaleLoading ? (
                  [...Array(4)].map((data, index) => {
                    return (
                      <Grid
                        key={`${index}+ProductCardOnSaleSkeletonMobile`}
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
                ) : onSaleApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct />
                  </Box>
                ) : (
                  onSaleApiRes.slice(0, 4).map((data, index) => {
                    return (
                      <Grid
                        key={data._id}
                        item
                        xs={6}
                        sm={4}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Card data={data} isHomePage={true} />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            ) : (
              isTablet ? (
                // is tablet size is active
                <Box
                  sx={{
                    overflowY: "hidden",
                  }}
                >
                  <Box display="flex" gap="1rem">
                    {isOnSaleLoading ? (
                      [...Array(8)].map((data, index) => {
                        return (
                          <Grid
                            key={`${index}+ProductCardOnSaleSkeletonOnTabView`}
                            item
                            xs={3}
                          >
                            <ProductCardSkeleton />
                          </Grid>
                        );
                      })
                    ) : onSaleApiRes.length === 0 ? (
                      <Box width="100%" textAlign="center">
                        <NoProduct isMobile={isMobile} />
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {onSaleApiRes.slice(0, 8).map((data, index) => {
                          return (
                            <>
                              <Box key={data._id}>
                                <Card
                                  data={data}
                                  index={index}
                                  isHomePage={true}
                                />
                              </Box>
                            </>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                </Box>
              ) : (
                // is desktop size is active
                <Grid container spacing={2}>
                  {isOnSaleLoading ? (
                    [...Array(8)].map((data, index) => {
                      return (
                        <Grid
                          key={`${index}+ProductCardOnSaleSkeleton`}
                          item
                          xs={3}
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
                  ) : onSaleApiRes.length === 0 ? (
                    <Box width="100%" textAlign="center">
                      <NoProduct />
                    </Box>
                  ) : (
                    onSaleApiRes.slice(0, 8).map((data, index) => {
                      return (
                        <>
                          <Grid
                            key={data._id}
                            item
                            xs={3}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Card data={data} isHomePage={true} />
                          </Grid>
                        </>
                      );
                    })
                  )}
                </Grid>
              ))}
          </Box>
        </>

        {isMobile ?
          <Box>
            <Image
              src="/assets/mobileLabel.webp"
              alt="label"
              layout="responsive"
              width="1920"
              height="50"
            />
          </Box>
          : <Box>
            <Image
              src="/assets/label.png"
              alt="label"
              layout="responsive"
              width="1920"
              height="50"
            />
          </Box>

        }

        <HomePageSpacing>
          <Box sx={{ margin: "5rem 0" }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "2.2rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
                margin="1rem 0"
                marginLeft={isMobile || isTablet ? "2rem" : 0}
              >
                TRENDING
              </Typography>
              {/* <Link href="product-collection/new_arrivals">
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  gap="0.4rem"
                  flexShrink="0"
                >
                  <Typography
                    color={lightColor.text.link}
                    textAlign="center"
                    fontSize={isMobile ? "1.4rem" : "1.8rem"}
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                    letterSpacing="0.05rem"
                    display="flex"
                    alignItems="center"
                    marginRight={isMobile ? "2rem" : ""}
                  >
                    View more
                    {!isMobile && <ForwardIcon />}
                  </Typography>
                </Box>
              </Link> */}
              {/*  )} */}
            </Box>

            {isMobile ? (
              // Mobile view
              <Grid container spacing={2}>
                {isNewArrivalLoading ? (
                  [...Array(4)].map((data, index) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      key={`${index}+ProductCardNewArrivalSkeletonOnMobileView`}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ProductCardSkeleton />
                    </Grid>
                  ))
                ) : newArraivalApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  newArraivalApiRes.slice(0, 4).map((data, index) => (
                    <Grid item xs={6} sm={4} key={data._id} sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <Card data={data} index={index} isHomePage={true} />
                    </Grid>
                  ))
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
                  {isNewArrivalLoading ? (
                    [...Array(4)].map((data, index) => {
                      return (
                        <Grid
                          key={`${index}+ProductCardNewArrivalSkeletonOnTabView`}
                          item
                          xs={3}
                        >
                          <ProductCardSkeleton />
                        </Grid>
                      );
                    })
                  ) : newArraivalApiRes.length === 0 ? (
                    <Box width="100%" textAlign="center">
                      <NoProduct isMobile={isMobile} />
                    </Box>
                  ) : (
                    newArraivalApiRes.slice(0, 4).map((data, index) => {
                      return (
                        <>
                          <Box key={data._id}>
                            <Card data={data} index={index} isHomePage={true} />
                          </Box>
                        </>
                      );
                    })
                  )}
                </Box>
              </Box>
            ) : (
              // is desktop size is active

              <Grid container spacing={2}>
                {isNewArrivalLoading ? (
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
                ) : newArraivalApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct />
                  </Box>
                ) : (
                  newArraivalApiRes.slice(0, 4).map((data, index) => {
                    return (
                      <Grid
                        key={data._id}
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        xs={3}
                      >
                        <Card data={data} />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            )}
          </Box>
        </HomePageSpacing>

        <HomePageSpacing>
          <Box sx={{ margin: "5rem 0" }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "2.2rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
                margin="1rem 0"
                marginLeft={isMobile || isTablet ? "2rem" : 0}
              >
                BEST SELLER
              </Typography>
              {/* <Link href="product-collection/best_seller">
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  gap="0.4rem"
                  flexShrink="0"
                >
                  <Typography
                    color={lightColor.text.link}
                    textAlign="center"
                    fontSize={isMobile ? "1.4rem" : "1.8rem"}
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                    letterSpacing="0.05rem"
                    display="flex"
                    alignItems="center"
                    marginRight={isMobile ? "2rem" : ""}
                  >
                    View more
                    {!isMobile && <ForwardIcon />}
                  </Typography>
                </Box>
              </Link> */}
            </Box>
            {isMobile ? (
              // is mobile size is active
              <Grid container spacing={2}>
                {isBestSellerLoading ? (
                  [...Array(4)].map((data, index) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        key={`${index}+ProductCardNewArrivalSkeletonOnMobileView`}
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
                ) : bestSellerApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  bestSellerApiRes.slice(0, 4).map((data, index) => {
                    return (
                      <Grid
                        key={data._id}
                        item
                        xs={6}
                        sm={4}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Card data={data} index={index} isHomePage={true} />
                      </Grid>
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
                  {isBestSellerLoading ? (
                    [...Array(4)].map((data, index) => {
                      return (
                        <Grid
                          key={`${index}+ProductCardBestSellerSkeletonOnTabView`}
                          item
                          xs={3}
                        >
                          <ProductCardSkeleton />
                        </Grid>
                      );
                    })
                  ) : bestSellerApiRes.length === 0 ? (
                    <Box width="100%" textAlign="center">
                      <NoProduct isMobile={isMobile} />
                    </Box>
                  ) : (
                    bestSellerApiRes.slice(0, 8).map((data, index) => {
                      return (
                        <>
                          <Box key={data._id}>
                            <Card data={data} index={index} isHomePage={true} />
                          </Box>
                        </>
                      );
                    })
                  )}
                </Box>
              </Box>
            ) : (
              // is desktop size is active

              <Grid container spacing={2}>
                {isBestSellerLoading ? (
                  [...Array(4)].map((data, index) => {
                    return (
                      <Grid
                        key={`${index}+ProductCardBestSellerSkeleton`}
                        item
                        xs={3}
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
                ) : bestSellerApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct />
                  </Box>
                ) : (
                  bestSellerApiRes.slice(0, 4).map((data, index) => {
                    return (
                      <Grid
                        key={data._id}
                        item
                        xs={3}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Card data={data} />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            )}
          </Box>
        </HomePageSpacing>
        {/* --------------------------------------------- */}
        {/* <div className="App">
            <Slider {...settings}>
              {isCategoryLoading ? (
                [...Array(11)].map((d, i) => {
                  return (
                    <Box key={`categorySkeleton+${i}`}>
                      <CategorySkeleton />
                    </Box>
                  );
                })
              ) : caregoryApiRes.length === 0 ? (
                <Box width="100%" textAlign="center">
                  <NoProduct isMobile={isMobile} />
                </Box>
              ) : (
                caregoryApiRes.map((data, index) => {
                  return (
                    <>
                      <div
                        className={
                          index === imageIndex ? "slide activeSlide" : "slide"
                        }
                      >
                        <CategoryCard
                          key={data._id}
                          data={data}
                          isHomePage={true}
                          indexes={index}
                          categoryArrayLength={caregoryApiRes.length - 1}
                        />
                      </div>
                    </>
                  );
                })
              )}
            </Slider>
          </div> */}

        {/* +++++++++++++++++++++++++++++++++++ */}

        {/* <div style={{ padding: `0 ${chevronWidth}px` }}>
              <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={6}
                gutter={20}
                leftChevron={<button>{"<"}</button>}
                rightChevron={<button>{">"}</button>}
                outsideChevron
                chevronWidth={chevronWidth}
              >
                {isCategoryLoading ? (
                  [...Array(11)].map((d, i) => {
                    return (
                      <Box key={`categorySkeleton+${i}`}>
                        <CategorySkeleton />
                      </Box>
                    );
                  })
                ) : caregoryApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  caregoryApiRes.map((data, index) => {
                    return (
                      <>
                        <CategoryCard
                          key={data._id}
                          data={data}
                          isHomePage={true}
                          indexes={index}
                          categoryArrayLength={caregoryApiRes.length - 1}
                        />
                      </>
                    );
                  })
                )}
                {/* <div style={{ height: 200, background: "#EEE" }}>
                  First card
                </div>
                <div style={{ height: 200, background: "#EEE" }}>
                  Second card
                </div>
                <div style={{ height: 200, background: "#EEE" }}>
                  Third card
                </div>
                <div style={{ height: 200, background: "#EEE" }}>
                  Fourth card
                </div> */}
        {/* </ItemsCarousel>
            </div> */}

        {/* <Box width={10} height={"auto"}>
          <YTPlayer videoId="bmD-tZe8HBA" />
        </Box> */}

        <HomePageSpacing>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ margin: "5rem 0" }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "2.2rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
                margin="1rem 0"
                marginLeft={isMobile || isTablet ? "2rem" : 0}
              >
                OUR BLOGS
              </Typography>
              {/* <Link href={"blog-collection"}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  gap="0.4rem"
                  flexShrink="0"
                >
                  <Typography
                    color={lightColor.text.link}
                    textAlign="center"
                    fontSize={isMobile ? "1.4rem" : "1.8rem"}
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                    letterSpacing="0.05rem"
                    display="flex"
                    alignItems="center"
                    marginRight={isMobile ? "2rem" : ""}
                  >
                    View more
                    {!isMobile && <ForwardIcon />}
                  </Typography>
                </Box>
              </Link> */}
            </Box>

            {isMobile ? (
              // Mobile view with carousel
              <Slider {...settings}>
                {isBlogLoading ? (
                  [...Array(3)].map((_, index) => (
                    <Box key={`${index}+BlogCardSkeleton`} sx={{ padding: "0 1rem" }}>
                      <ProductCardSkeleton />
                    </Box>
                  ))
                ) : blogApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  blogApiRes.slice(0, 3).map((data, index) => (
                    <Box key={data._id} sx={{ padding: "0 1rem" }}>
                      <BlogCard data={data}  index={index} isHomePage={true} />
                    </Box>
                  ))
                )}
              </Slider>
            ) : isTablet ? (
              // is tablet size is active
              <Box
                sx={{
                  overflowY: "hidden",
                }}
              >
                <Box display="flex" gap="1rem">
                  {isBlogLoading ? (
                    [...Array(3)].map((data, index) => {
                      return (
                        <Grid key={`${index}+BlogCardSkeleton`} item xs={4}>
                          <ProductCardSkeleton />
                        </Grid>
                      );
                    })
                  ) : blogApiRes.length === 0 ? (
                    <Box width="100%" textAlign="center">
                      <NoProduct isMobile={isMobile} />
                    </Box>
                  ) : (
                    blogApiRes.slice(0, 3).map((data, index) => {
                      return (
                        <Box key={data._id}>
                          <BlogCard
                            data={data}
                            isHomePage={true}
                            index={index}
                          />
                        </Box>
                      );
                    })
                  )}
                </Box>
              </Box>
            ) : (
              // is desktop size is active
              <Grid container spacing={0}>
                {isBlogLoading ? (
                  [...Array(3)].map((data, index) => {
                    return (
                      <Grid key={`${index}+BlogCardSkeleton`} item xs={4}>
                        <ProductCardSkeleton />
                      </Grid>
                    );
                  })
                ) : blogApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct />
                  </Box>
                ) : (
                  blogApiRes.slice(0, 3).map((data) => {
                    return (
                      <Grid key={data._id} item xs={4}>
                        <BlogCard data={data} />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            )}
          </Box>

          <Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "2.2rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
              >
                What our customer says
              </Typography>
            </Box>

            {isTablet ? (
              // is tablet size is active
              <Box
                height="35rem"
                sx={{
                  overflowY: "hidden",
                }}
              >
                <Box display="flex" gap="4rem">
                  <Box>
                    <TestimonialCard />
                  </Box>
                  <Box>
                    <TestimonialCard />
                  </Box>
                  <Box>
                    <TestimonialCard />
                  </Box>
                </Box>
              </Box>
            ) : (
              // is desktop size is active

              <Grid container spacing={4}>
                <Grid item xs={4}>
                  <TestimonialCard />
                </Grid>

                <Grid item xs={4}>
                  <TestimonialCard />
                </Grid>

                <Grid item xs={4}>
                  <TestimonialCard />
                </Grid>
              </Grid>
            )}
          </Box>
        </HomePageSpacing>
      </Box>
    </>
  );
  // return (
  //   <Box
  //     sx={{ display: "flex", justifyContent: "center", alignItems: "center", width:"100vw", height:"100vh" }}
  //   >
  //     <Typography sx={{ textAlign: "center" }}>Server Error 500</Typography>
  //   </Box>
  // );
}
