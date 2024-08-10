"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Grid,
  Skeleton,
  Button,
} from "@mui/material";
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
import { NextSeo } from "next-seo";
import Seo from "@components/Seo";
// import { Head } from "next/document";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: 'Acme Dashboard',
//   description: 'The official Next.js Course Dashboard, built with App Router.',
//   metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
// };

// export function getStaticProps() {
//   const seoData = {
//     title: "Your Homepage Title",
//     description: "Your homepage description",
//     keywords: "keyword1, keyword2, keyword3",
//     author: "Your Name",
//   };
//   console.log("in getStaticProps ",seoData)

//   return {
//     props: {
//       seoData,
//     },
//   };
// }

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

export default function Home(props: any) {
  const { banner, newDrop, trending, bestSeller, newArrival, category, blog } =
    props;
  const [value, setValue] = useState(0);
  const [newDropApiRes, setNewDropApiRes] = useState<any[]>(newDrop.data);
  const [trendingApiRes, setTrendingApiRes] = useState<any[]>(
    trending.data
  );
  const [bestSellerApiRes, setBestSellerApiRes] = useState<any[]>(
    bestSeller.data
  );
  const [newArraivalApiRes, setNewArraivalApiRes] = useState<any[]>(
    newArrival.data
  );
  const [caregoryApiRes, setCaregoryApiRes] = useState<any[]>(category.data);
  const [blogApiRes, setBlogApiRes] = useState<any[]>(blog.data);
  const [bannerHeight, setBannerHeight] = useState(760);
  const [bannerWidth, setBannerWidth] = useState(1920);
  const [isOnSaleLoading, setIsOnsaleLoading] = useState(false);
  const [isDailyDealsLoading, setIsDailyDealsLoading] = useState(false);
  const [isBestSellerLoading, setIsBestSellerLoading] = useState(false);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [bannerApiRes, setBannerApiRes] = useState<any>(banner.data);
  const [bannerApiLoading, setBannerApiLoading] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const [count, setCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const isTablet = useTablet();
  const isMobile = useMobile();
  const AutoplaySlider: any = withAutoplay(AwesomeSlider);
  const theme: any = useSelector<any>((state) => state.themeToggle);

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

  const settings = {
    dots: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: isMobile ? 1 : 2,
    centerMode: true,
    centerPadding: 0,
    arrows: !isMobile,
    beforeChange: (current: any, next: any) => setImageIndex(next),
  };

  const TredingProdSettings = {
    dots: true,
    centerPadding: 0,
    arrows: true,
    speed: 300,
    slidesToShow: isMobile ? 2 : 5,
    slidesToScroll: 1,
  };

  const mobileBannerSettings = {
    dots: true,
    centerPadding: 0,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  const desktopBannerSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const categorySettings = {
    dots: true,
    // centerPadding: 0,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
  };

  function chunkArray(array: any, chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  return (
    <>
      <Box>
        {isMobile ? (
          bannerApiLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                height: "60vh",
                borderRadius: "0.8rem",
              }}
            ></Skeleton>
          ) : bannerApiRes.length === 0 ? (
            ""
          ) : (
            <Slider className="mobileBanner" {...mobileBannerSettings}>
              {bannerApiRes.map((data: any, index: number) => (
                <Link href={data.link} key={data.mobileImageURL} >
                <img
                  
                  src={data.mobileImageURL}
                  alt="mobile banner"
                  style={{ width: "100vw", height: "auto" }}
                />
                </Link>
              ))}
            </Slider>
          )
        ) : bannerApiLoading ? (
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
          <Slider {...desktopBannerSettings}>
            {bannerApiRes.map((data: any) => {
              return (
                <Box key={data.id}>
                  <Link href={data.link}>
                    <Image
                      ref={ref}
                      src={data.imageURL}
                      alt="banner"
                      loading="lazy"
                      width={320}
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
          </Slider>
        )}

        {/* Categories */}
        <Box
          display="flex"
          justifyContent={isMobile ? "start" : "center"}
          margin="2rem 1rem"
        >
          <Typography
            color={
              theme === "light"
                ? lightColor.text.primary
                : darkColor.text.primary
            }
            // textAlign="center"
            fontSize={isMobile ? "1.8rem" : "2.8rem"}
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.05rem"
          >
            {isMobile ? "Trending Categories" : "TRENDING CATEGORIES"}
          </Typography>
        </Box>
        {isMobile ? (
          <>
            {isCategoryLoading ? (
              <>
                <Grid
                  container
                  justifyContent="center"
                  padding="0 0.5rem"
                  spacing={0.5}
                >
                  {[...Array(4)].map((data, index) => {
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
                  })}
                </Grid>
              </>
            ) : caregoryApiRes.length === 0 ? (
              <Box width="100%" textAlign="center">
                <NoProduct isMobile={isMobile} />
              </Box>
            ) : (
              <>
                <Slider {...categorySettings}>
                  {chunkArray(caregoryApiRes, 4).map((data, index) => {
                    return (
                      <>
                        <Grid
                          container
                          justifyContent="center"
                          padding="0 1rem"
                          spacing={1}
                          marginBottom="1rem"
                        >
                          {data.map((categoryData: any, index: number) => {
                            return (
                              <Grid
                                xs={6}
                                key={data._id}
                                item
                                justifyItems="center"
                              >
                                <CategoryCard
                                  data={categoryData}
                                  indexes={index}
                                  categoryArrayLength={
                                    caregoryApiRes.length - 1
                                  }
                                />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </>
                    );
                  })}
                </Slider>
              </>
            )}
          </>
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
                    <Grid key={`categorySkeletonMobile+${index}`} item xs={3}>
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
            sx={{
              overflowY: "hidden",
            }}
          >
            <Box display="flex">
              {isCategoryLoading ? (
                [...Array(3)].map((data, index) => {
                  return (
                    <Grid key={`categorySkeletonMobile+${index}`} item xs={4}>
                      <CategorySkeleton />
                    </Grid>
                  );
                })
              ) : caregoryApiRes.length === 0 ? (
                <Box width="100%" textAlign="center">
                  <NoProduct isMobile={isMobile} />
                </Box>
              ) : (
                <Box>
                  <Grid container spacing={2} sx={{ padding: "0 3rem" }}>
                    {caregoryApiRes.slice(0, 3).map((data, index) => {
                      return (
                        <>
                          <Grid item xs={4} key={data._id}>
                            <CategoryCard
                              data={data}
                              isHomePage={true}
                              indexes={index}
                              categoryArrayLength={caregoryApiRes.length - 1}
                            />
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                  <Grid container spacing={2} sx={{ padding: "0 3rem" }}>
                    {caregoryApiRes.slice(3, 7).map((data, index) => {
                      return (
                        <>
                          <Grid item xs={3} key={data._id}>
                            <CategoryCard
                              data={data}
                              isHomePage={true}
                              indexes={index}
                              categoryArrayLength={caregoryApiRes.length - 1}
                            />
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        )}

        <>
          <Box sx={{ margin: "5rem 0", marginTop: "3rem" }}>
            <Box
              display="flex"
              justifyContent={isMobile ? "start" : "center"}
              alignItems="center"
            >
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "1.8rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
                margin="1rem 0"
                marginLeft={isMobile || isTablet ? "1rem" : 0}
              >
                {isMobile ? "New Drops" : "NEW DROPS"}
              </Typography>
             
            </Box>

            {isMobile || isTablet? (
              // is mobile and tablet size is active
              <Grid
                container
                justifyContent="center"
                padding="0 0.5rem"
                spacing={0.5}
              >
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
                ) : newDropApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  newDropApiRes.slice(0, isTablet && isMobile ? 6 : 4).map((data, index) => {
                    return (
                        <Grid
                          item
                          xs={6}
                          sm={4}
                          key={data._id}
                          margin="1rem 0"
                          justifyItems="center"
                        >
                          <Card data={data} index={index} />
                        </Grid>
                    );
                  })
                )}
              </Grid>
            ) : 
             (
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
                ) : newDropApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct />
                  </Box>
                ) : (
                  newDropApiRes.slice(0, 8).map((data, index) => {
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
            )}
            <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
              <Link href="product-collection/new-drop">
                <Button>View All</Button>
              </Link>
            </Box>
          </Box>
        </>

        {isMobile ? (
          <Box>
            <Image
              src="/assets/mobileLabel.webp"
              alt="label"
              layout="responsive"
              width="1920"
              height="20"
            />
          </Box>
        ) : (
          <Box>
            <Image
              src="/assets/label.png"
              alt="label"
              layout="responsive"
              width="1920"
              height="50"
            />
          </Box>
        )}

        <HomePageSpacing>
          <Box sx={{ margin: "1rem 0" }}>
            <Box
              display="flex"
              justifyContent={isMobile ? "start" : "center"}
              alignItems="center"
            >
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "1.8rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
                margin="1rem 0"
                marginLeft={isMobile || isTablet ? "1rem" : 0}
              >
                {isMobile ? "Trending" : "TRENDING"}
              </Typography>
             
            </Box>

            {isMobile || isTablet? (
              // Mobile view
              <Grid container justifyContent="center" padding="0 0.5rem">
                {isTrendingLoading ? (
                  [...Array(4)].map((data, index) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      key={`${index}+ProductCardTrendingSkeletonOnMobileView`}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ProductCardSkeleton />
                    </Grid>
                  ))
                ) : trendingApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  <Slider
                    {...TredingProdSettings}
                    arrows={false}
                    infinite={trendingApiRes.length > 2}
                    style={{ width: "100%" }}
                  >
                    {trendingApiRes.slice(0, 4).map((data, index) => (
                      <Grid
                        xs={11.8}
                        item
                        key={data._id}
                        margin="1rem 0"
                        justifyItems="center"
                      >
                        <Card data={data} index={index} />
                      </Grid>
                    ))}
                  </Slider>
                )}
              </Grid>
            ) :  (
              // is desktop size is active

              <Grid container spacing={2}>
                {isTrendingLoading ? (
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
                ) : trendingApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct />
                  </Box>
                ) : (
                  trendingApiRes.slice(0, 4).map((data, index) => {
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
            <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
              <Link href="product-collection/trending">
                <Button>View All</Button>
              </Link>
            </Box>
          </Box>
        </HomePageSpacing>

        <HomePageSpacing>
          <Box sx={{ margin: "5rem 0" }}>
            <Box
              display="flex"
              justifyContent={isMobile ? "start" : "center"}
              alignItems="center"
            >
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "1.8rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
                margin="1rem 0"
                marginLeft={isMobile || isTablet ? "1rem" : 0}
              >
                {isMobile ? "Best Seller" : "BEST SELLER"}
              </Typography>
            </Box>
            {isMobile || isTablet ? (
              // is mobile size is active
              <Grid
                container
                padding="0 0.5rem"
                spacing={0.5}
              >
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
                  bestSellerApiRes.slice(0, isTablet && isMobile ? 4 : 6).map((data, index) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        key={data._id}
                        margin="1rem 0"
                        justifyItems="center"
                      >
                        <Card data={data} index={index} />
                      </Grid>
                    );
                  })
                )}
              </Grid>
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
            <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
              <Link href="product-collection/best-seller">
                <Button>View All</Button>
              </Link>
            </Box>
          </Box>
        </HomePageSpacing>
      
       
        <HomePageSpacing>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{ margin: "5rem 0" }}
          >
            <Box
              display="flex"
              justifyContent={isMobile ? "start" : "center"}
              alignItems="center"
            >
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "1.8rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
                margin="1rem 0"
                marginLeft={isMobile || isTablet ? "1rem" : 0}
              >
                {isMobile ? "Our Blogs" : "OUR BLOGS"}
              </Typography>
            
            </Box>

            {isMobile || isTablet ? (
              // Mobile view with carousel
              <Box >
                {isBlogLoading ? (
                  [...Array(3)].map((_, index) => (
                    <Box key={`${index}+BlogCardSkeleton`}>
                      <ProductCardSkeleton />
                    </Box>
                  ))
                ) : blogApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  <Slider
                    {...settings}
                    arrows={false}
                    // infinite={blogApiRes.length > 1}
                  >
                    {blogApiRes.slice(0, 2).map((data, index) => (
                      <Box key={index} padding="0 1rem">
                        <BlogCard data={data} index={index} isHomePage={true} />
                      </Box>
                    ))}
                  </Slider>
                )}
              </Box>
            ) :  (
              // is desktop size is active
              <Grid container spacing={3}>
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

          <Box height="40rem">
            <Box
              display="flex"
              justifyContent={isMobile ? "start" : "center"}
              alignItems="center"
            >
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "1.8rem" : "2.8rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem"
                marginLeft={isMobile ? "1rem" : 0}
              >
                What our customer says
              </Typography>
            </Box>

            {isMobile ? (
              // Mobile view with carousel
              <Slider {...settings} infinite={"true"}>
                <Box>
                    <TestimonialCard content="Absolutely love this t-shirt! The print is vibrant, and the fabric feels amazing." />
                  </Box>
                  <Box>
                    <TestimonialCard content="Dragon print is stunning, and the oversized fit is super comfortable! Amazing fabric."/>
                  </Box>
                  <Box>
                    <TestimonialCard content="I am so delighted in your clothing! It is absolutely gorgeous... everything."/>
                  </Box>
              </Slider>
            ) : isTablet ? (
              // is tablet size is active
              <Box
                height="35rem"
                sx={{
                  overflowY: "hidden",
                }}
              >
                <Box display="flex" gap="4rem">
                  <Box>
                    <TestimonialCard content="Absolutely love this t-shirt! The print is vibrant, and the fabric feels amazing." />
                  </Box>
                  <Box>
                    <TestimonialCard content="Dragon print is stunning, and the oversized fit is super comfortable! Amazing fabric."/>
                  </Box>
                  <Box>
                    <TestimonialCard content="I am so delighted in your clothing! It is absolutely gorgeous... everything."/>
                  </Box>
                </Box>
              </Box>
            ) : (
              // is desktop size is active

              <Grid container spacing={4}>
                <Grid item xs={4}>
                <TestimonialCard content="Absolutely love this t-shirt! The print is vibrant, and the fabric feels amazing." />
                </Grid>

                <Grid item xs={4}>
                <TestimonialCard content="Dragon print is stunning, and the oversized fit is super comfortable! Amazing fabric."/>
                </Grid>

                <Grid item xs={4}>
                <TestimonialCard content="I am so delighted in your clothing! It is absolutely gorgeous... everything."/>
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
