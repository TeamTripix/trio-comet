"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  ButtonBase,
  Tab,
  Tabs,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Skeleton,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import PageSpacing from "@components/PageSpacing";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@components/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import { useTablet, useMobile } from "../../../utils/responsive";
import ProductCardSkeleton from "@components/Skeleton/ProductCardSkeleton";
import BreadCrumb from "@components/BreadCrumb";
import CancelIcon from "../../../../icons/cancelIcon";
import NoProduct from "../../../../icons/noProduct";
import NoFaq from "../../../../icons/noFaq";
import NoReview from "../../../../icons/noReview";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import AdminIcon from "../../../../icons/adminIcon";
import ImageUploader from "@components/ImageUploader";
// import ReactImageMagnify from "react-image-magnify";
// import Carousel from "@components/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import FullSizeProductImage from "@components/FullSizeProductImage";
import "../../bulletStyle.module.css";
import StarIcon from "@mui/icons-material/Star";
import CopyToClipboard from "react-copy-to-clipboard";
import { NextSeo } from "next-seo";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: any;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface ReviewCardProps {
  isImageInReveiw?: boolean;
  data: any;
}

function FAQs(props: any) {
  const isTablet = useTablet();
  const [fAQApiRes, setFAQApiRes] = useState([]);
  const isMobile = useMobile();
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const { pid } = props;
  useEffect(() => {
    // fetching FAQ data
    axios({
      method: "GET",
      url: `/api/faq?id=${pid}`,
    })
      .then((res) => {
        setFAQApiRes(res.data.data[0].FAQs);
      })
      .catch(() => {});
  }, [pid]);
  return (
    <Box width={isTablet ? "100%" : "80%"} padding="0 2.4rem">
      {fAQApiRes.length === 0 ? (
        <Box width="100%" textAlign="center">
          <NoFaq isMobile={isMobile} isTablet={isTablet} />
        </Box>
      ) : (
        fAQApiRes.map((data: any) => {
          return (
            <Accordion key={data._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ bgcolor: "rgba(251, 192, 45, 0.30)" }}
              >
                <Typography
                  sx={{
                    color:
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary,
                    fontSize: "1.4rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    letterSpacing: "0.05rem",
                  }}
                >
                  {data.heading}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color:
                      theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron,
                    fontSize: "1.4rem",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    letterSpacing: "0.05rem",
                  }}
                >
                  {data.desc}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Box>
  );
}

const ReviewCard: React.FC<ReviewCardProps> = ({ isImageInReveiw, data }) => {
  const { heading, desc, rating, date, customerName, image } = data;
  const splitDate = date.slice(0, 10).split("-");
  const reverseDate = splitDate.reverse();
  const theme: any = useSelector<any>((state) => state.themeToggle);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap="0.2rem"
    >
      <Box display="flex" alignItems="center" gap="1.6rem">
        <Box borderRadius="50%">
          <AdminIcon color="#000" />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="0.8rem"
        >
          <Typography
            color={
              theme === "light" ? lightColor.text.fade : darkColor.text.fade
            }
            textAlign="center"
            fontSize="1.4rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.05rem"
          >
            {customerName === "" ? "Anonymous user" : customerName}
          </Typography>
          <Typography
            color={
              theme === "light" ? lightColor.text.fade : darkColor.text.fade
            }
            textAlign="center"
            fontSize="1.2rem"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="normal"
            letterSpacing="0.05rem"
          >
            {reverseDate.map((item: any) => `${item}/`)}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="0.4rem"
      >
        <Box width="8rem">
          <Rating
            name="simple-controlled"
            size="small"
            readOnly
            value={rating}
            sx={{ fontSize: "1.5rem" }}
          />
        </Box>
        <Typography
          color={
            theme === "light" ? lightColor.text.primary : darkColor.text.primary
          }
          textAlign="center"
          fontSize="1.4rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="2.4rem"
          letterSpacing="0.02rem"
        >
          {heading}
        </Typography>
      </Box>
      <Box>
        <Typography
          color={
            theme === "light" ? lightColor.text.primary : darkColor.text.primary
          }
          fontSize="1.4rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="2.4rem"
          letterSpacing="0.02rem"
        >
          {desc}
        </Typography>
      </Box>
      <Grid container alignContent="flex-start" gap="1.2rem">
        {isImageInReveiw ? (
          <>
            <Grid
              item
              width="10.1rem"
              height="8.7rem"
              borderRadius="0.8rem"
              overflow="hidden"
            >
              <Image
                src="/assets/productImages/84756fv84f6h73/1.png"
                alt="banner"
                loading="lazy"
                width={101}
                height={87}
                layout="responsive"
                style={{ borderRadius: "0.8rem" }}
              />
            </Grid>
            <Grid
              item
              width="10.1rem"
              height="8.7rem"
              borderRadius="0.8rem"
              overflow="hidden"
            >
              <Image
                src="/assets/productImages/84756fv84f6h73/1.png"
                alt="banner"
                loading="lazy"
                width={101}
                height={87}
                layout="responsive"
                style={{ borderRadius: "0.8rem" }}
              />
            </Grid>
          </>
        ) : (
          ""
        )}
      </Grid>
      {image === "" ? (
        ""
      ) : (
        <Box>
          <Image
            src={image}
            alt="review image"
            height={60}
            width={60}
            style={{ borderRadius: "0.8rem" }}
          />
        </Box>
      )}
    </Box>
  );
};

const Product = ({ params }: { params: { slug: string } }) => {
  const queryParams = useSearchParams();
  const subpageValue = queryParams.get("sub_page_id");
  const colorParamID: any = queryParams.get("color_id");
  const categoryID = queryParams.get("category_id");
  const pid = queryParams.get("pid");
  const offerTag = queryParams.get("offerTag");
  // const [colorId, setColorId] = useState<any>(colorParamID);
  const [value, setValue] = useState<any>(subpageValue);
  const [categoryId, setCategoryId] = useState(categoryID);
  const [pidState, setPidState] = useState(pid);
  const [comboApiRes, setComboApiRes] = useState<any[]>([]);
  const [isComboLoading, setIsComboLoading] = useState(true);
  const [productAPIRes, setProductAPIRes] = useState<any>([]);
  const [couponAPIRes, setCouponAPIRes] = useState<any[]>([]);
  const [isCouponApply, setIsCouponApply] = useState({
    offerValue: 0,
    state: false,
  });
  const [couponInputValue, setCouponInputValue] = useState("");
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [ratingStarValue, setRatingStarValue] = useState<number | null>(0);
  const [reviewHeading, setReviewHeading] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewApiRes, setReviewApiRes] = useState([]);
  const [sendReviewIsLoading, setSendReviewIsLoading] = useState(false);
  const [productImageHeight, setProductImageHeight] = useState(570);
  const [productImageWidth, setProductImageWidth] = useState();
  const [byCategoryProductApiRes, setByCategoryProductApiRes] = useState<any[]>(
    []
  );
  const [isByCategoryProductLoading, setIsByCategoryProductLoading] =
    useState(true);
  const [percentRating, setPercentRating] = useState<any>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [relatedProductAppear, setRelatedProductAppear] = useState(true);
  const [reviewImage, setReviewImage] = useState<any>();
  const [reviewURL, setReviewURL] = useState("");
  const [maxRating, setMaxRating] = useState(1);
  const [productHeight, setProductHeight] = useState(1470);
  const [productWidth, setProductWidth] = useState(1570);
  const cartData: any = useSelector<any>((state) => state.addToCart.cartData);
  const dispatch = useDispatch();
  const router = useRouter();
  const isTablet = useTablet();
  const isMobile = useMobile();
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const [expanded, setExpanded] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSizeSelection = (size: any) => {
    setSelectedSize(size);
  };

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
    };

  const handleCopy = () => {
    toast.success("Copied Succesfully");
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/product?tag=combo",
    })
      .then((res) => {
        setComboApiRes(res.data.data);
        setIsComboLoading(false);
      })
      .catch(() => {
        setIsComboLoading(false);
      });
  }, []);

  useEffect(() => {
    if (reviewImage) {
      setReviewURL(reviewImage.res.url);
    }
  }, [reviewImage]);

  // get daily-deals data
  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: `/api/${
  //       offerTag === "daily_deals" ? "daily-deals-product" : "product"
  //     }/?pid=${pidState}`,
  //   })
  //     .then((res) => {
  //       setProductAPIRes(res.data.data);
  //       setRelatedProductAppear(false);
  //     })
  //     .catch(() => {});
  // }, [params.slug]);

  // get product data
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/product?slug=${params.slug}`,
    })
      .then((res) => {
        setProductAPIRes(res.data.data);
        setRelatedProductAppear(false);
      })
      .catch(() => {});
  }, [params.slug]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/product/?category=${productAPIRes.category}`,
    })
      .then((res) => {
        if (res.status === 200) {
          setIsByCategoryProductLoading(false);
          setByCategoryProductApiRes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsByCategoryProductLoading(false);
      });
  }, [productAPIRes]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/coupon/?pid=${productAPIRes._id}`,
    })
      .then((res) => {
        console.log("coupons--", res.data);
        setCouponAPIRes(res.data.data);
      })
      .catch(() => {});
  }, [productAPIRes]);

  useEffect(() => {
    // fetching review data
    axios({
      method: "GET",
      url: `/api/review?id=${productAPIRes._id}`,
    })
      .then((res) => {
        setReviewApiRes(res.data.data[0].reviews.reverse());
      })
      .catch(() => {});
  }, [productAPIRes, isReviewDialogOpen]);

  useEffect(() => {
    const ratingArray: any = reviewApiRes.map((data: any) => {
      return data.rating;
    });

    var counts: any = {};
    ratingArray.forEach((x: any) => {
      counts[x] = (counts[x] || 0) + 1;
    });

    let mergedObject = { ...percentRating, ...counts };

    var ratingPer: any = {};
    Object.values(mergedObject).forEach((elem: any, i: any) => {
      ratingPer[Object.keys(mergedObject)[i]] = Math.floor(
        (elem / ratingArray.length) * 100
      );
      setPercentRating(ratingPer);
    });

    let largestValue = Math.max(...Object.values(percentRating).map(Number));
    const LargestRatingKey: any = Object.keys(percentRating).find(
      (key) => percentRating[key] === largestValue
    );
    setMaxRating(LargestRatingKey);
  }, [reviewApiRes]);

  const handleSubmitReview = () => {
    setSendReviewIsLoading(true);
    if (reviewHeading && reviewDesc && ratingStarValue !== 0) {
      axios({
        method: "POST",
        url: `/api/review`,
        data: {
          reviews: [
            {
              customerName: "",
              heading: reviewHeading,
              desc: reviewDesc,
              rating: ratingStarValue,
              image: reviewURL,
            },
          ],
          reviewProductId: productAPIRes._id,
          id: null,
        },
      })
        .then((res) => {
          if (res.data.success) {
            setSendReviewIsLoading(false);
            toast.success("Thanks for the review");
            setIsReviewDialogOpen(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("some error occured");
          setSendReviewIsLoading(false);
        });
    } else {
      toast.error("Fill all feilds");
      setSendReviewIsLoading(false);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(parseInt(newValue));
    router.push(
      `/product/${params.slug}?pid=${pidState}&sub_page_id=${newValue}&color_id=${colorParamID}&category_id=${categoryId}`,
      {
        scroll: false,
      }
    );
  };

  const handleChangeColor = (colorid: Number) => {
    router.push(
      `/product/${params.slug}?pid=${pidState}&sub_page_id=${subpageValue}&color_id=${colorid}&category_id=${categoryId}`,
      {
        scroll: false,
      }
    );
  };

  const handleApplyCoupon = () => {
    axios({
      method: "GET",
      url: `/api/coupon/?pid=${pidState}`,
    })
      .then((res) => {
        if (res.data.data[0].name === couponInputValue) {
          if (res.data.data[0].quantity >= 1) {
            setIsCouponApply({
              offerValue: res.data.data[0].discountInPercent,
              state: true,
            });

            toast.success("Coupon applied");
          } else {
            toast.error("Coupon has been expired");
          }
        } else {
          toast.error("Invalid coupon");
        }
      })
      .catch(() => {
        toast.error("some error occured");
      });
  };

  const handleAddToCartBtn = (dispatchData: any, couponState: boolean) => {
    const isProductInCart = cartData.filter(
      (cartDataInFilter: any) =>
        cartDataInFilter.product._id ===
          `coupon${dispatchData._id}colorId${dispatchData.productColor[0].id}` &&
        cartDataInFilter.isCouponApply === true
    );
    if (isCouponApply.state) {
      if (isProductInCart.length === 1) {
        setIsCouponApply({
          offerValue: 0,
          state: false,
        });
        toast.error("Product already in cart");
        return;
      }
    }
    const data = {
      description: dispatchData.description,
      price:
        dispatchData.discountPrice -
        (isCouponApply.offerValue / 100) * dispatchData.discountPrice,
      name: dispatchData.name,
      productColor: "black",
      _id: `${dispatchData._id}colorId${dispatchData.productColor[0].id}`,
      image: dispatchData.productColor[0].imageURL[0],
      colorId: dispatchData.productColor[0].id,
    };
    if (isCouponApply.state === true) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          product: {
            description: dispatchData.description,
            price:
              dispatchData.discountPrice -
              (isCouponApply.offerValue / 100) * dispatchData.discountPrice,
            name: dispatchData.name,
            productColor: "black",
            _id: "coupon" + dispatchData._id,
            image: dispatchData.productColor[0].imageURL[0],
            colorId: dispatchData.productColor[0].id,
          },
          quantity: 1,
          isCouponApply: isCouponApply.state,
        },
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          product: data,
          quantity: 1,
          isCouponApply: isCouponApply.state,
        },
      });
    }
    dispatch({
      type: "ADD_IN_TOTAL_COST",
      payload:
        dispatchData.discountPrice -
        (isCouponApply.offerValue / 100) * dispatchData.discountPrice,
    });
    setIsCouponApply({
      offerValue: 0,
      state: false,
    });
    toast.success("Your product added to cart");
  };

  const ref = useRef<HTMLImageElement>(null);
  const updateHeight = () => {
    if (ref.current) {
      const heightValue = ref.current.getBoundingClientRect().height;
      const widthValue = ref.current.getBoundingClientRect().width;
      setProductHeight(heightValue);
      setProductWidth(widthValue);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  console.log(productAPIRes)

  return (
    <>
      <NextSeo
        title={productAPIRes?.specificationItems?.pageTitle}
        description="This example uses more of the available config options."
        canonical="https://www.triocomet.com"
        openGraph={{
          url: "https://www.url.ie/a",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "https://www.example.ie/og-image-01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://www.example.ie/og-image-02.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            { url: "https://www.example.ie/og-image-03.jpg" },
            { url: "https://www.example.ie/og-image-04.jpg" },
          ],
          siteName: "SiteName",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />

      <PageSpacing>
        <Box margin={isMobile ? "0" : "0 10rem"}>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="start"
            height="auto"
            marginBottom={isMobile ? "0rem" : "5.7rem"}
            padding="0 2rem"
            flexDirection={isMobile ? "column" : "row"}
          >
            <Box
              ref={ref}
              width={isMobile ? "100%" : "50%"}
              position={isMobile ? "relative" : "sticky"}
              top={isMobile ? 0 : "6rem"}
            >
              {!isMobile &&
                <Box paddingLeft="0rem" margin="1rem 0rem 0rem 0rem">
                  <BreadCrumb />
                </Box>
              }
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignItems="center"
                gap="1rem"
                margin="1.2rem 0"
              >
                {/* side images */}
                {!isMobile && (
                  productAPIRes.length === 0 ? (
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: "10.1rem",
                        height: "8.7rem",
                        borderRadius: "0.8rem",
                      }}
                    ></Skeleton>
                  ) : (
                    productAPIRes.productColor[0].imageURL.map(
                      (elem: any, index: number) => {
                        return (
                          <Box
                            width="10.1rem"
                            height="8.7rem"
                            borderRadius="0.8rem"
                            key={`productImageLeft${index}`}
                          >
                            <Image
                              alt="product image"
                              width="100"
                              height="90"
                              src={elem}
                              style={{ borderRadius: "0.8rem" }}
                              layout="responsive"
                            />
                          </Box>
                        );
                      }
                    )
                  )
                )}

                {/* main image */}
                <Box
                  marginLeft={{ xs: "0", md: "1rem" }}
                  marginTop={{ xs: "1rem", md: "0" }}
                >
                  {productAPIRes.length === 0 ? (
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: "100%",
                        height: "57rem",
                        borderRadius: "0.8rem",
                      }}
                    ></Skeleton>
                  ) : (
                    <AwesomeSlider
                      className="slider"
                      bullets={true}
                      style={{
                        height: productWidth - 50,
                        width: productWidth - 130,
                      }}
                    >
                      {productAPIRes.productColor[0].imageURL.map(
                        (data: any, index: number) => {
                          return (
                            <Box
                              ref={ref}
                              borderRadius="0.8rem"
                              width="57rem"
                              height="57rem"
                              key={`${index}+productImagesSlider`}
                            >
                              <FullSizeProductImage image={data} />
                            </Box>
                          );
                        }
                      )}
                    </AwesomeSlider>
                  )}
                </Box>
              </Box>
            </Box>

            {/* right content */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap={isMobile ? "1rem" : "2.4rem"}
              width={isMobile ? "100%" : "50%"}
              marginLeft={isMobile ? 0 : "6rem"}
              marginTop={isMobile ? 0 : "5rem"}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap="0.8rem"
                width="100%"
              >
                {productAPIRes.length === 0 ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "20rem",
                      height: "3rem",
                      borderRadius: "0.4rem",
                    }}
                  ></Skeleton>
                ) : (
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary
                    }
                    fontSize={isMobile ? "2.2rem" : "2.8rem"}
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="normal"
                    letterSpacing="0.02rem"
                  >
                    {productAPIRes.name}
                  </Typography>
                )}

                {productAPIRes.length === 0 ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "inherit",
                      height: "6rem",
                      borderRadius: "0.4rem",
                    }}
                  ></Skeleton>
                ) : (
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.secondary
                        : darkColor.text.secondary
                    }
                    fontSize={isMobile ? "1rem" : "1.6rem"}
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                    letterSpacing="0.02rem"
                  >
                    {productAPIRes.description}
                  </Typography>
                )}

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="5rem"
                  height="2.5rem"
                  border="0.3px solid #949494"
                  padding="1rem 2.7rem"
                  bgcolor="#f7f7f7"
                >
                  <Box display="flex" alignItems="center">
                    <StarIcon
                      sx={{
                        fontSize: "1.7rem",
                        marginRight: "0.3rem",
                        color: "#ffc700",
                      }}
                    />
                    <Typography
                      color={
                        theme === "light"
                          ? lightColor.text.fade
                          : darkColor.text.fade
                      }
                      textAlign="center"
                      fontSize={isMobile ? "1rem" : "1.5rem"}
                      fontStyle="normal"
                      fontWeight="500"
                      lineHeight="normal"
                      letterSpacing="0.05rem"
                    >
                      4.5
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <Box>
                    {productAPIRes.length === 0 ? (
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "10rem",
                          height: "4rem",
                          borderRadius: "0.8rem",
                        }}
                      ></Skeleton>
                    ) : (
                      <Typography
                        variant="body2"
                        color={
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary
                        }
                        textAlign="center"
                        fontSize={isMobile ? "1.6rem" : "2.8rem"}
                        fontStyle="normal"
                        fontWeight="700"
                        lineHeight="normal"
                        letterSpacing="0.02rem"
                      >
                        ₹
                        {productAPIRes.discountPrice -
                          (isCouponApply.offerValue / 100) *
                            productAPIRes.discountPrice}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    {productAPIRes.length === 0 ? (
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "5rem",
                          height: "2rem",
                          borderRadius: "0.8rem",
                        }}
                      ></Skeleton>
                    ) : (
                      <Typography
                        color={
                          theme === "light"
                            ? lightColor.text.secondary
                            : darkColor.text.secondary
                        }
                        textAlign="center"
                        fontSize={isMobile ? "1.4rem" : "1.6rem"}
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                        letterSpacing="0.02rem"
                        sx={{ textDecorationLine: "line-through" }}
                      >
                        ₹{productAPIRes.price}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    {productAPIRes.length === 0 ? (
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          marginRight: "2rem",
                          width: "10rem",
                          height: "4rem",
                          borderRadius: "0.8rem",
                        }}
                      ></Skeleton>
                    ) : (
                      <span
                        style={{
                          color:
                            theme === "light"
                              ? lightColor.text.offer
                              : darkColor.text.offer,
                          textAlign: "center",
                          fontSize: isMobile ? "1rem" : "1.4rem",
                          fontStyle: "normal",
                          fontWeight: "700",
                          lineHeight: "normal",
                          letterSpacing: "0.02rem",
                          marginRight: "1rem",
                        }}
                      >
                        {`${Math.round(
                          ((productAPIRes.price - productAPIRes.discountPrice) /
                            productAPIRes.price) *
                            100
                        )}% Off`}
                      </span>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box
                gap="2.4rem"
                display="flex"
                flexDirection="column"
                width={isTablet ? "100%" : "45rem"}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  gap="1.6rem"
                >
                  <Box display="flex" alignItems="center" gap="0.8rem">
                    <Typography
                      color={
                        theme === "light"
                          ? lightColor.text.primary
                          : darkColor.text.primary
                      }
                      textAlign="center"
                      fontSize={isMobile ? "1.6rem" : "2rem"}
                      fontStyle="normal"
                      fontWeight="700"
                      lineHeight="normal"
                      letterSpacing="0.02rem"
                    >
                      Color option
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start" gap="1rem">
                    {productAPIRes.length === 0
                      ? [...Array(4)].map((data, index) => {
                          return (
                            <Skeleton
                              key={`${index}+colorskeleton`}
                              variant="circular"
                              sx={{
                                width: "4rem",
                                height: "4rem",
                                borderRadius: "50%",
                                margin: "0 0.1rem ",
                              }}
                            ></Skeleton>
                          );
                        })
                      : productAPIRes.productColor.map(
                          (data: any, index: number) => {
                            return (
                              <ButtonBase
                                onClick={() => handleChangeColor(index)}
                                key={data}
                                sx={{
                                  width: "4rem",
                                  height: "4rem",
                                  borderRadius: "50%",
                                  border:
                                    parseInt(colorParamID) === index
                                      ? `3px solid ${lightColor.theme.primary}`
                                      : `2px solid ${
                                          theme === "light"
                                            ? lightColor.text.secondary
                                            : darkColor.text.secondary
                                        }`,
                                  bgcolor: data.color,
                                }}
                              ></ButtonBase>
                            );
                          }
                        )}
                  </Box>
                </Box>

                {/* size options */}
                <Box>
                  {/* Heading */}
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary
                    }
                    fontSize={isMobile ? "1.6rem" : "2rem"}
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="normal"
                    letterSpacing="0.02rem"
                  >
                    Select Sizes
                  </Typography>
                  {/* Size options */}
                  <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap={isMobile ? "1rem" : "1.7rem"}
                    width="100%"
                    marginTop="1rem"
                  >
                    {productAPIRes.length === 0 ? (
                      <>
                        <Skeleton
                          variant="rectangular"
                          width="4.2rem"
                          height="4.2rem"
                        />
                        <Skeleton
                          variant="rectangular"
                          width="4.2rem"
                          height="4.2rem"
                        />
                        <Skeleton
                          variant="rectangular"
                          width="4.2rem"
                          height="4.2rem"
                        />
                        <Skeleton
                          variant="rectangular"
                          width="4.2rem"
                          height="4.2rem"
                        />
                        <Skeleton
                          variant="rectangular"
                          width="4.2rem"
                          height="4.2rem"
                        />
                      </>
                    ) : (
                      ["S", "M", "L", "XL", "2XL"].map((size) => (
                        <Box
                          key={size}
                          onClick={() => handleSizeSelection(size)}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "4.2rem",
                            height: "4.2rem",
                            bgcolor:
                              selectedSize === size ? "#C4C4C4" : "#EFF2F6",
                            borderRadius: "0.8rem",
                            cursor: "pointer",
                          }}
                        >
                          <Typography
                            color={
                              theme === "light"
                                ? lightColor.text.primary
                                : darkColor.text.primary
                            }
                            textAlign="center"
                            fontSize={isMobile ? "1.6rem" : "1.8rem"}
                            fontStyle="normal"
                            fontWeight={selectedSize === size ? 700 : 400}
                            lineHeight="normal"
                            letterSpacing="0.02rem"
                          >
                            {size}
                          </Typography>
                        </Box>
                      ))
                    )}
                  </Box>
                </Box>

                <Box>
                  <Box
                    display="flex"
                    width="100%"
                    height="4.5rem"
                    padding="1.2rem 2rem"
                    alignItems="center"
                    gap="1rem"
                    flexShrink="0"
                    borderRadius="0.4rem"
                    border="1px solid var(--light-price-text, #B4B4B9)"
                    justifyContent="space-between"
                    paddingRight="0"
                    borderRight="none"
                  >
                    <input
                      onChange={(e) => setCouponInputValue(e.target.value)}
                      style={{
                        color:
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary,
                        fontSize: "1.4rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "2.4rem",
                        letterSpacing: "0.05rem",
                        border: "none",
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                      placeholder="Enter Coupon"
                    />
                    <ButtonBase
                      onClick={handleApplyCoupon}
                      sx={{
                        display: "flex",
                        width: "11.3rem",
                        height: "4.5rem",
                        padding: "1.2rem 2rem",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                        flexShrink: "0",
                        borderRadius: "0rem 0.4rem 0.4rem 0rem",
                        bgcolor:
                          theme === "light"
                            ? lightColor.text.chevron
                            : darkColor.text.chevron,
                      }}
                    >
                      <Typography
                        color="#fff"
                        fontSize="1.4rem"
                        fontStyle="normal"
                        fontWeight="700"
                        lineHeight="2.4rem"
                        letterSpacing="0.05rem"
                      >
                        Apply
                      </Typography>
                    </ButtonBase>
                  </Box>
                </Box>

                {couponAPIRes.length !== 0 ? (
                  <>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      gap="0.8rem"
                    >
                      <Typography
                        color={
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary
                        }
                        textAlign="center"
                        fontSize={isMobile ? "1.6rem" : "2rem"}
                        fontStyle="normal"
                        fontWeight="500"
                        lineHeight="normal"
                        letterSpacing="0.02rem"
                      >
                        Offers
                      </Typography>
                      <Box
                        display="flex"
                        gap={isMobile ? "1rem" : "1.7rem"}
                        width="100%"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            height: "4.2rem",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "1rem",
                            bgcolor: "#EFF2F6",
                            borderRadius: "0.8rem",
                          }}
                        >
                          <Typography
                            color={
                              theme === "light"
                                ? lightColor.text.primary
                                : darkColor.text.primary
                            }
                            textAlign="center"
                            fontSize={isMobile ? "1.6rem" : "1.8rem"}
                            fontStyle="normal"
                            fontWeight="700"
                            lineHeight="normal"
                            letterSpacing="0.02rem"
                          >
                            {couponAPIRes[0].name}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      {productAPIRes.length === 0 ? (
                        <Skeleton
                          variant="rectangular"
                          sx={{
                            width: "inherit",
                            height: "3rem",
                            borderRadius: "0.4rem",
                          }}
                        ></Skeleton>
                      ) : (
                        <Typography
                          color={
                            theme === "light"
                              ? lightColor.text.chevron
                              : darkColor.text.chevron
                          }
                          fontSize="1.2rem"
                          fontStyle="normal"
                          fontWeight="400"
                          lineHeight="normal"
                          letterSpacing="0.02rem"
                        >
                          {couponAPIRes.length === 0
                            ? "no offer"
                            : couponAPIRes[0].desc}
                        </Typography>
                      )}
                    </Box>
                  </>
                ) : (
                  ""
                )}
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={isMobile ? "1rem" : "1.6rem"}
                >
                  {productAPIRes.length === 0 ? (
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: "100%",
                        height: "5rem",
                        borderRadius: "4rem",
                      }}
                    ></Skeleton>
                  ) : (
                    <ButtonBase
                      onClick={() =>
                        handleAddToCartBtn(productAPIRes, isCouponApply.state)
                      }
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: isMobile ? "4.4rem" : "5rem",
                        padding: "0.2rem 0.8rem",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1.6rem",
                        borderRadius: "4rem",
                        bgcolor: "var(--orange, #FFA000)",
                      }}
                    >
                      <Typography
                        color={
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary
                        }
                        textAlign="center"
                        fontSize={isMobile ? "1.6rem" : "2rem"}
                        fontStyle="normal"
                        fontWeight="700"
                        lineHeight="normal"
                        letterSpacing="0.02rem"
                      >
                        Add To Cart
                      </Typography>
                    </ButtonBase>
                  )}

                  {productAPIRes.length === 0 ? (
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: "100%",
                        height: "5rem",
                        borderRadius: "4rem",
                      }}
                    ></Skeleton>
                  ) : (
                    <ButtonBase
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: isMobile ? "4.4rem" : "5rem",
                        padding: "0.2rem 0.8rem",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1.6rem",
                        borderRadius: "4rem",
                        bgcolor: lightColor.theme.primary,
                      }}
                    >
                      <Typography
                        color={
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary
                        }
                        textAlign="center"
                        fontSize={isMobile ? "1.6rem" : "2rem"}
                        fontStyle="normal"
                        fontWeight="700"
                        lineHeight="normal"
                        letterSpacing="0.02rem"
                      >
                        Buy Now
                      </Typography>
                    </ButtonBase>
                  )}
                </Box>
              </Box>

              <Box>
                {/* Offers */}
                {productAPIRes.length === 0 ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "50rem",
                      height: "5rem",
                      borderRadius: "0.4rem",
                      marginBottom: "0.5rem",
                    }}
                  ></Skeleton>
                ) : (
                  <Accordion
                    expanded={expanded === "offers"}
                    onChange={handleAccordionChange("offers")}
                    sx={{ boxShadow: "none" }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Offers</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Offers content */}
                      <Typography variant="body1">Buy 1 Get 1 Free</Typography>
                      {/* Tap to copy */}
                      <CopyToClipboard
                        text="Text to be copied"
                        onCopy={handleCopy}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: "none",
                            cursor: "pointer",
                            marginLeft: "1rem",
                            color: "#42A2A2",
                          }}
                        >
                          Tap to copy
                        </Typography>
                      </CopyToClipboard>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* Description */}
                {productAPIRes.length === 0 ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "50rem",
                      height: "5rem",
                      borderRadius: "0.4rem",
                      marginBottom: "0.5rem",
                    }}
                  ></Skeleton>
                ) : (
                  <Accordion
                    expanded={expanded === "description"}
                    onChange={handleAccordionChange("description")}
                    sx={{ boxShadow: "none" }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Description content */}
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: productAPIRes?.descImage?.descItems[0]?.desc,
                        }}
                      ></Box>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* Rating */}
                {productAPIRes.length === 0 ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "50rem",
                      height: "5rem",
                      borderRadius: "0.4rem",
                      marginBottom: "0.5rem",
                    }}
                  ></Skeleton>
                ) : (
                  <Accordion
                    expanded={expanded === "rating"}
                    onChange={handleAccordionChange("rating")}
                    sx={{ boxShadow: "none" }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Rating</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Rating content */}
                      <Box
                        display="flex"
                        width="90%"
                        flexDirection="column"
                        alignItems="flex-start"
                        gap={isMobile ? "3.2rem" : "5.6rem"}
                        padding="0 2.4rem"
                      >
                        <Grid
                          container
                          flexDirection={isMobile ? "column-reverse" : "row"}
                          spacing={10}
                        >
                          <Grid item xs={isTablet ? (isMobile ? 12 : 6) : 8}>
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-start"
                              gap={isMobile ? "3.2rem" : "5.6rem"}
                            >
                              <Typography
                                color={
                                  theme === "light"
                                    ? lightColor.text.primary
                                    : darkColor.text.primary
                                }
                                fontSize="2rem"
                                fontStyle="normal"
                                fontWeight="700"
                                lineHeight="normal"
                                letterSpacing="0.02rem"
                              >
                                Customer reviews
                              </Typography>
                              {reviewApiRes.length === 0 ? (
                                <Box width="100%" textAlign="center">
                                  {" "}
                                  <NoReview isMobile={isMobile} />
                                </Box>
                              ) : (
                                reviewApiRes.map((data, index) => {
                                  return (
                                    <ReviewCard
                                      data={data}
                                      key={`${index}card1`}
                                    />
                                  );
                                })
                              )}
                            </Box>
                          </Grid>
                          <Grid item xs={isTablet ? (isMobile ? 12 : 6) : 4}>
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-start"
                              gap="1.6rem"
                            >
                              <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                gap="1.6rem"
                              >
                                {/* <Box
                                  display="flex"
                                  width="15.2rem"
                                  alignItems="center"
                                  gap="0.2rem"
                                >
                                  <Rating
                                    name="simple-controlled"
                                    size="small"
                                    readOnly
                                    value={maxRating}
                                    sx={{ fontSize: "1.5rem" }}
                                  />

                                  <Typography
                                    color={
                                      theme === "light"
                                        ? lightColor.text.fade
                                        : darkColor.text.fade
                                    }
                                    textAlign="center"
                                    fontSize="1.6rem"
                                    fontStyle="normal"
                                    fontWeight="500"
                                    lineHeight="normal"
                                    letterSpacing="0.05rem"
                                  >
                                    {maxRating} out of 5
                                  </Typography>
                                </Box> */}

                                {Object.values(percentRating).map(
                                  (data: any, i: any) => {
                                    return (
                                      <Box
                                        key={`reviewstarchart${i}`}
                                        display="flex"
                                        width="17.8rem"
                                        justifyContent="space-between"
                                        alignItems="center"
                                      >
                                        <Typography
                                          color={
                                            theme === "light"
                                              ? lightColor.text.fade
                                              : darkColor.text.fade
                                          }
                                          textAlign="center"
                                          fontSize="1.6rem"
                                          fontStyle="normal"
                                          fontWeight="500"
                                          lineHeight="normal"
                                          letterSpacing="0.05rem"
                                        >
                                          {`${isNaN(data) ? 0 : data}%`}
                                        </Typography>
                                        <Box
                                          width="11.6rem"
                                          height="0.6rem"
                                          flexShrink="0"
                                          bgcolor={
                                            theme === "light"
                                              ? lightColor.text.secondary
                                              : darkColor.text.secondary
                                          }
                                        >
                                          <Box
                                            width={`${isNaN(data) ? 0 : data}%`}
                                            height="0.6rem"
                                            flexShrink="0"
                                            bgcolor={lightColor.theme.primary}
                                          ></Box>
                                        </Box>
                                        <Typography
                                          color={
                                            theme === "light"
                                              ? lightColor.text.fade
                                              : darkColor.text.fade
                                          }
                                          textAlign="center"
                                          fontSize="1.6rem"
                                          fontStyle="normal"
                                          fontWeight="500"
                                          lineHeight="normal"
                                          letterSpacing="0.05rem"
                                        >
                                          {i + 1}
                                        </Typography>
                                      </Box>
                                    );
                                  }
                                )}
                                <ButtonBase
                                  onClick={() => setIsReviewDialogOpen(true)}
                                  sx={{
                                    display: "flex",
                                    padding: "0.7rem 1.2rem",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "0.8rem",
                                    bgcolor:
                                      theme === "light"
                                        ? lightColor.text.chevron
                                        : darkColor.text.chevron,
                                  }}
                                >
                                  <Typography
                                    color="white"
                                    textAlign="center"
                                    fontSize="1.6rem"
                                    fontStyle="normal"
                                    fontWeight="500"
                                    lineHeight="normal"
                                    letterSpacing="0.05rem"
                                  >
                                    Write a review
                                  </Typography>
                                </ButtonBase>

                                <Dialog
                                  onClose={() => setIsReviewDialogOpen(false)}
                                  aria-labelledby="customized-dialog-title"
                                  open={isReviewDialogOpen}
                                >
                                  <DialogTitle
                                    sx={{ m: 0, p: 2 }}
                                    id="customized-dialog-title"
                                  >
                                    Add Review
                                  </DialogTitle>
                                  <ButtonBase
                                    aria-label="close"
                                    onClick={() => setIsReviewDialogOpen(false)}
                                    sx={{
                                      position: "absolute",
                                      right: 8,
                                      top: 8,
                                    }}
                                  >
                                    <CancelIcon />
                                  </ButtonBase>
                                  <DialogContent>
                                    <Box
                                      width="50rem"
                                      display="flex"
                                      flexDirection="column"
                                      gap={"1.2rem"}
                                    >
                                      <TextField
                                        label="Heading"
                                        size="small"
                                        fullWidth
                                        onChange={(e: any) =>
                                          setReviewHeading(e.target.value)
                                        }
                                      />
                                      <Box>
                                        <Rating
                                          name="simple-controlled"
                                          size="small"
                                          value={ratingStarValue}
                                          onChange={(event, newValue) =>
                                            setRatingStarValue(newValue)
                                          }
                                        />
                                      </Box>
                                      <Box display="flex" gap="2rem">
                                        <TextField
                                          fullWidth
                                          onChange={(e: any) =>
                                            setReviewDesc(e.target.value)
                                          }
                                          id="filled-multiline-flexible"
                                          label="Description"
                                          multiline
                                          maxRows={4}
                                          minRows={4}
                                        />
                                        <Box>
                                          <ImageUploader
                                            buttonText="upload"
                                            helperText="images size 29x29"
                                            width={100}
                                            height={100}
                                            // dimension={{ width: 1500, height: 1500 }}
                                            getResponse={setReviewImage}
                                          />
                                        </Box>
                                      </Box>
                                    </Box>
                                  </DialogContent>
                                  <DialogContent
                                    sx={{ justifyContent: "flex-end" }}
                                  >
                                    <ButtonBase
                                      onClick={handleSubmitReview}
                                      sx={{
                                        bgcolor:
                                          theme === "light"
                                            ? lightColor.text.chevron
                                            : darkColor.text.chevron,
                                        padding: "1rem 2rem",
                                        borderRadius: "0.8rem",
                                        width: "15rem",
                                        height: "3.5rem",
                                      }}
                                    >
                                      <Typography
                                        color={"#fbfbfb"}
                                        textAlign="center"
                                        fontSize={isMobile ? "2rem" : "1.4rem"}
                                        fontStyle="normal"
                                        fontWeight="500"
                                        lineHeight="normal"
                                        letterSpacing="0.05rem"
                                      >
                                        {sendReviewIsLoading ? (
                                          <CircularProgress
                                            size={15}
                                            sx={{
                                              color: "white",
                                            }}
                                          />
                                        ) : (
                                          "Save Changes"
                                        )}
                                      </Typography>
                                    </ButtonBase>
                                  </DialogContent>
                                </Dialog>
                              </Box>
                              <Grid container spacing={2}>
                                {reviewApiRes.length === 0
                                  ? ""
                                  : reviewApiRes.map((data: any) => {
                                      if (data.image === "") {
                                        return "";
                                      } else {
                                        return (
                                          <Grid
                                            key={data.image}
                                            item
                                            width="17.8rem"
                                            height="15.3rem"
                                            borderRadius="0.8rem"
                                            overflow="hidden"
                                          >
                                            <Image
                                              src={data.image}
                                              alt="banner"
                                              loading="lazy"
                                              width={180}
                                              height={155}
                                              layout="responsive"
                                              style={{ borderRadius: "0.8rem" }}
                                            />
                                          </Grid>
                                        );
                                      }
                                    })}
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Box>

              {/* description */}
              {/* <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  // bgcolor={productAPIRes.descImage.bgcolor}
                  width={isTablet ? "100%" : "50%"}
                >
                  <Box width="70%" margin={"10rem 0"}>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: productAPIRes?.descImage?.descItems[0]?.desc,
                      }}
                    ></Box>
                  </Box>
                </Box>
              </Box> */}
            </Box>
          </Box>
        </Box>

        {/* <Box
          margin={isMobile ? "2rem 0" : "6.2rem 0"}
          display="flex"
          alignItems="flex-start"
          width="100%"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Tabs
              value={parseInt(value)}
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
                label="Description"
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
                label="Specification"
                {...a11yProps(1)}
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
                label="Reviews"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
        </Box> */}
      </PageSpacing>
      <CustomTabPanel value={parseInt(value)} index={0}>
        {productAPIRes.length === 0
          ? ""
          : productAPIRes.descImage.descItems.map(
              (data: any, index: number) => {
                return (
                  <Box
                    key={`${index}desc`}
                    width="100%"
                    height="auto"
                    display="flex"
                    bgcolor={productAPIRes.descImage.bgcolor}
                    justifyContent="space-between"
                    flexDirection={isTablet ? "column" : "row"}
                  >
                    {data.textSide === "right" ? (
                      <>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                          bgcolor={productAPIRes.descImage.bgcolor}
                          width={isTablet ? "100%" : "50%"}
                        >
                          <Box width="70%" margin={"10rem 0"}>
                            <Box
                              dangerouslySetInnerHTML={{
                                __html: data.desc,
                              }}
                            ></Box>
                          </Box>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent={isTablet ? "center" : "end"}
                        >
                          <Box
                            width={isTablet ? "60%" : "50%"}
                            height="40%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Image
                              src={data.imageURL}
                              alt="banner"
                              loading="lazy"
                              width={640}
                              height={360}
                              layout="responsive"
                            />
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          display="flex"
                          flexDirection={isTablet ? "column-reverse" : "row"}
                        >
                          <Box
                            width="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent={isTablet ? "center" : "start"}
                          >
                            <Box
                              width={isTablet ? "60%" : "50%"}
                              height="40%"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Image
                                src={data.imageURL}
                                alt="banner"
                                loading="lazy"
                                width={640}
                                height={360}
                                layout="responsive"
                              />
                            </Box>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            bgcolor={productAPIRes.descImage.bgcolor}
                            width={isTablet ? "100%" : "50%"}
                          >
                            <Box width="70%" margin={"10rem 0"}>
                              <Box
                                dangerouslySetInnerHTML={{
                                  __html: data.desc,
                                }}
                              ></Box>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                );
              }
            )}
      </CustomTabPanel>

      {/* <CustomTabPanel value={parseInt(value)} index={1}>
        <Box
          width="100%"
          height="auto"
          justifyContent="space-between"
          bgcolor={
            productAPIRes.length === 0
              ? "#fff"
              : productAPIRes.specificationItems.bgcolor
          }
          display="flex"
          flexDirection={isTablet ? "column" : "row"}
        >
          <Box
            display="flex"
            width={isTablet ? "100%" : "50%"}
            alignItems="center"
            gap="1rem"
            justifyContent="center"
            padding="2rem 0"
          >
            <Grid
              container
              spacing={2.5}
              sx={{ width: "100%", margin: isMobile ? "0rem" : "4rem" }}
            >
              {productAPIRes.length === 0
                ? ""
                : productAPIRes.specificationItems.specItems.map(
                    (data: any, index: number) => {
                      return (
                        <>
                          <Grid xs={isMobile ? 6 : 3} item key={`${index}spec`}>
                            <Typography
                              color={productAPIRes.specificationItems.textColor}
                              fontSize={isMobile ? "1.2rem" : "1.6rem"}
                              fontStyle="normal"
                              fontWeight="700"
                              lineHeight="normal"
                              letterSpacing="0.02rem"
                            >
                              {data.heading}
                            </Typography>
                          </Grid>

                          <Grid xs={isMobile ? 6 : 9} item>
                            <Typography
                              color={productAPIRes.specificationItems.textColor}
                              fontSize={isMobile ? "1.2rem" : "1.6rem"}
                              fontStyle="normal"
                              fontWeight={isMobile ? "500" : "700"}
                              lineHeight="normal"
                              letterSpacing="0.02rem"
                            >
                              {data.desc}
                            </Typography>
                          </Grid>
                        </>
                      );
                    }
                  )}
            </Grid>
          </Box>
          <Box
            width={isTablet ? "100%" : "50%"}
            height="auto"
            display="flex"
            justifyContent="end"
            alignItems="center"
          >
            <Image
              src={
                productAPIRes.length === 0
                  ? ""
                  : productAPIRes.specificationItems.imageURL
              }
              alt="banner"
              loading="lazy"
              width={640}
              height={360}
              layout="responsive"
            />
          </Box>
        </Box>
      </CustomTabPanel> */}

      <PageSpacing>
        {/* FAQ section */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={isMobile ? "4rem" : "5.6rem"}
          margin="10rem 0"
          width="100%"
        >
          <Typography
            color={
              theme === "light"
                ? lightColor.text.primary
                : darkColor.text.primary
            }
            textAlign="center"
            fontSize={isMobile ? "2rem" : "2.8rem"}
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.05rem"
          >
            Frequently Asked Questions
          </Typography>
          <FAQs pid={pidState} />
        </Box>

        {/* review section */}
        {/* <Box
          display="flex"
          width="100%"
          flexDirection="column"
          alignItems="flex-start"
          gap={isMobile ? "3.2rem" : "5.6rem"}
          padding="0 2.4rem"
        >
          <Grid
            container
            flexDirection={isMobile ? "column-reverse" : "row"}
            spacing={10}
          >
            <Grid item xs={isTablet ? (isMobile ? 12 : 6) : 8}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={isMobile ? "3.2rem" : "5.6rem"}
              >
                <Typography
                  color={
                    theme === "light"
                      ? lightColor.text.primary
                      : darkColor.text.primary
                  }
                  fontSize="2rem"
                  fontStyle="normal"
                  fontWeight="700"
                  lineHeight="normal"
                  letterSpacing="0.02rem"
                >
                  Customer reviews
                </Typography>

                <ButtonBase
                    sx={{
                      display: "flex",
                      padding: "0.4rem 0.8rem",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "0.4rem",
                      bgcolor: "#ECECED",
                    }}
                  >
                    Top reviews
                  </ButtonBase>
                {reviewApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    {" "}
                    <NoReview isMobile={isMobile} />
                  </Box>
                ) : (
                  reviewApiRes.map((data, index) => {
                    return <ReviewCard data={data} key={`${index}card1`} />;
                  })
                )}
              </Box>
            </Grid>
            <Grid item xs={isTablet ? (isMobile ? 12 : 6) : 4}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap="1.6rem"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="1.6rem"
                >
                  <Box
                    display="flex"
                    width="15.2rem"
                    alignItems="center"
                    gap="0.2rem"
                  >
                    <Rating
                      name="simple-controlled"
                      size="small"
                      readOnly
                      value={maxRating}
                      sx={{ fontSize: "1.5rem" }}
                    />

                    <Typography
                      color={
                        theme === "light"
                          ? lightColor.text.fade
                          : darkColor.text.fade
                      }
                      textAlign="center"
                      fontSize="1.6rem"
                      fontStyle="normal"
                      fontWeight="500"
                      lineHeight="normal"
                      letterSpacing="0.05rem"
                    >
                      {maxRating} out of 5
                    </Typography>
                  </Box>

                  {Object.values(percentRating).map((data: any, i: any) => {
                    return (
                      <Box
                        key={`reviewstarchart${i}`}
                        display="flex"
                        width="17.8rem"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          color={
                            theme === "light"
                              ? lightColor.text.fade
                              : darkColor.text.fade
                          }
                          textAlign="center"
                          fontSize="1.6rem"
                          fontStyle="normal"
                          fontWeight="500"
                          lineHeight="normal"
                          letterSpacing="0.05rem"
                        >
                          {`${isNaN(data) ? 0 : data}%`}
                        </Typography>
                        <Box
                          width="11.6rem"
                          height="0.6rem"
                          flexShrink="0"
                          bgcolor={
                            theme === "light"
                              ? lightColor.text.secondary
                              : darkColor.text.secondary
                          }
                        >
                          <Box
                            width={`${isNaN(data) ? 0 : data}%`}
                            height="0.6rem"
                            flexShrink="0"
                            bgcolor={lightColor.theme.primary}
                          ></Box>
                        </Box>
                        <Typography
                          color={
                            theme === "light"
                              ? lightColor.text.fade
                              : darkColor.text.fade
                          }
                          textAlign="center"
                          fontSize="1.6rem"
                          fontStyle="normal"
                          fontWeight="500"
                          lineHeight="normal"
                          letterSpacing="0.05rem"
                        >
                          {i + 1}
                        </Typography>
                      </Box>
                    );
                  })}
                  <ButtonBase
                    onClick={() => setIsReviewDialogOpen(true)}
                    sx={{
                      display: "flex",
                      padding: "0.7rem 1.2rem",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "0.8rem",
                      bgcolor:
                        theme === "light"
                          ? lightColor.text.chevron
                          : darkColor.text.chevron,
                    }}
                  >
                    <Typography
                      color="white"
                      textAlign="center"
                      fontSize="1.6rem"
                      fontStyle="normal"
                      fontWeight="500"
                      lineHeight="normal"
                      letterSpacing="0.05rem"
                    >
                      Write a review
                    </Typography>
                  </ButtonBase>

                  <Dialog
                    onClose={() => setIsReviewDialogOpen(false)}
                    aria-labelledby="customized-dialog-title"
                    open={isReviewDialogOpen}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      Add Review
                    </DialogTitle>
                    <ButtonBase
                      aria-label="close"
                      onClick={() => setIsReviewDialogOpen(false)}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                      }}
                    >
                      <CancelIcon />
                    </ButtonBase>
                    <DialogContent>
                      <Box
                        width="50rem"
                        display="flex"
                        flexDirection="column"
                        gap={"1.2rem"}
                      >
                        <TextField
                          label="Heading"
                          size="small"
                          fullWidth
                          onChange={(e: any) =>
                            setReviewHeading(e.target.value)
                          }
                        />
                        <Box>
                          <Rating
                            name="simple-controlled"
                            size="small"
                            value={ratingStarValue}
                            onChange={(event, newValue) =>
                              setRatingStarValue(newValue)
                            }
                          />
                        </Box>
                        <Box display="flex" gap="2rem">
                          <TextField
                            fullWidth
                            onChange={(e: any) => setReviewDesc(e.target.value)}
                            id="filled-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={4}
                            minRows={4}
                          />
                          <Box>
                            <ImageUploader
                              buttonText="upload"
                              helperText="images size 29x29"
                              width={100}
                              height={100}
                              // dimension={{ width: 1500, height: 1500 }}
                              getResponse={setReviewImage}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </DialogContent>
                    <DialogContent sx={{ justifyContent: "flex-end" }}>
                      <ButtonBase
                        onClick={handleSubmitReview}
                        sx={{
                          bgcolor:
                            theme === "light"
                              ? lightColor.text.chevron
                              : darkColor.text.chevron,
                          padding: "1rem 2rem",
                          borderRadius: "0.8rem",
                          width: "15rem",
                          height: "3.5rem",
                        }}
                      >
                        <Typography
                          color={"#fbfbfb"}
                          textAlign="center"
                          fontSize={isMobile ? "2rem" : "1.4rem"}
                          fontStyle="normal"
                          fontWeight="500"
                          lineHeight="normal"
                          letterSpacing="0.05rem"
                        >
                          {sendReviewIsLoading ? (
                            <CircularProgress
                              size={15}
                              sx={{
                                color: "white",
                              }}
                            />
                          ) : (
                            "Save Changes"
                          )}
                        </Typography>
                      </ButtonBase>
                    </DialogContent>
                  </Dialog>
                </Box>
                <Grid container spacing={2}>
                  {reviewApiRes.length === 0
                    ? ""
                    : reviewApiRes.map((data: any) => {
                        if (data.image === "") {
                          return "";
                        } else {
                          return (
                            <Grid
                              key={data.image}
                              item
                              width="17.8rem"
                              height="15.3rem"
                              borderRadius="0.8rem"
                              overflow="hidden"
                            >
                              <Image
                                src={data.image}
                                alt="banner"
                                loading="lazy"
                                width={180}
                                height={155}
                                layout="responsive"
                                style={{ borderRadius: "0.8rem" }}
                              />
                            </Grid>
                          );
                        }
                      })}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box> */}

        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0 2.4rem"
          >
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
              margin={isMobile ? "4rem 0" : "6rem 0"}
            >
              Products related to this item
            </Typography>
          </Box>
          {isTablet ? (
            // is tablet size is active
            <Box
              sx={{
                overflowY: "hidden",
              }}
            >
              <Box display="flex" gap="1rem">
                {relatedProductAppear ? (
                  [...Array(4)].map((data, index) => {
                    return (
                      <Grid
                        key={`${index}+ProductCardOnSaleSkeleton`}
                        item
                        xs={3}
                      >
                        <ProductCardSkeleton />
                      </Grid>
                    );
                  })
                ) : isByCategoryProductLoading ? (
                  [...Array(4)].map((data, index) => {
                    return (
                      <Grid
                        key={`${index}+ProductCardOnSaleSkeleton`}
                        item
                        xs={3}
                      >
                        <ProductCardSkeleton />
                      </Grid>
                    );
                  })
                ) : byCategoryProductApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  byCategoryProductApiRes.slice(0, 4).map((data, index) => {
                    return (
                      <Box key={data._id}>
                        <Card data={data} index={index} isHomePage={true} />
                      </Box>
                    );
                  })
                )}
              </Box>
            </Box>
          ) : (
            // is desktop size is active
            <Grid container spacing={2} height="52.1rem">
              {relatedProductAppear ? (
                [...Array(4)].map((data, index) => {
                  return (
                    <Grid
                      key={`${index}+ProductCardOnSaleSkeleton`}
                      item
                      xs={3}
                    >
                      <ProductCardSkeleton />
                    </Grid>
                  );
                })
              ) : isByCategoryProductLoading ? (
                [...Array(4)].map((data, index) => {
                  return (
                    <Grid
                      key={`${index}+ProductCardOnSaleSkeleton`}
                      item
                      xs={3}
                    >
                      <ProductCardSkeleton />
                    </Grid>
                  );
                })
              ) : byCategoryProductApiRes.length === 0 ? (
                <Box width="100%" textAlign="center">
                  <NoProduct />
                </Box>
              ) : (
                byCategoryProductApiRes.slice(0, 4).map((data) => {
                  return (
                    <Grid key={data._id} item xs={3}>
                      <Card data={data} />
                    </Grid>
                  );
                })
              )}
            </Grid>
          )}
        </Box>

        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0 2.4rem"
          >
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
              margin={isMobile ? "4rem 0" : "6rem 0"}
            >
              Combos
            </Typography>
          </Box>
          {isTablet ? (
            // is tablet size is active
            <Box
              sx={{
                overflowY: "hidden",
              }}
            >
              <Box display="flex" gap="1rem">
                {isComboLoading ? (
                  [...Array(4)].map((data, index) => {
                    return (
                      <Grid
                        key={`${index}+ProductCardOnSaleSkeleton`}
                        item
                        xs={3}
                      >
                        <ProductCardSkeleton />
                      </Grid>
                    );
                  })
                ) : comboApiRes.length === 0 ? (
                  <Box width="100%" textAlign="center">
                    <NoProduct isMobile={isMobile} />
                  </Box>
                ) : (
                  comboApiRes.slice(0, 4).map((data, index) => {
                    return (
                      <Box key={data._id}>
                        <Card data={data} index={index} isHomePage={true} />
                      </Box>
                    );
                  })
                )}
              </Box>
            </Box>
          ) : (
            // is desktop size is active
            <Grid container spacing={2} height="52.1rem">
              {isComboLoading ? (
                [...Array(4)].map((data, index) => {
                  return (
                    <Grid
                      key={`${index}+ProductCardOnSaleSkeleton`}
                      item
                      xs={3}
                    >
                      <ProductCardSkeleton />
                    </Grid>
                  );
                })
              ) : comboApiRes.length === 0 ? (
                <Box width="100%" textAlign="center">
                  <NoProduct />
                </Box>
              ) : (
                comboApiRes.slice(0, 4).map((data, index) => {
                  return (
                    <Grid key={data._id} item xs={3}>
                      <Card data={data} />
                    </Grid>
                  );
                })
              )}
            </Grid>
          )}
        </Box>
      </PageSpacing>
    </>
  );
};

export default Product;
