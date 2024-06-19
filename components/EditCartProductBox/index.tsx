import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "../../icons/editIcon";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ButtonBase,
  CircularProgress,
  Grid,
  Rating,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useTablet, useMobile } from "../../src/utils/responsive";
import BreadCrumb from "@components/BreadCrumb";
import Image from "next/image";
import AwesomeSlider from "react-awesome-slider";
import FullSizeProductImage from "@components/FullSizeProductImage";
import { lightColor } from "@/utils/CustomTheme/color";
import CopyToClipboard from "react-copy-to-clipboard";
import NoReview from "../../icons/noReview";
import CancelIcon from "../../icons/cancelIcon";
import ImageUploader from "@components/ImageUploader";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";

export default function AlertDialog(props: any) {
  const [open, setOpen] = React.useState(false);
  const [productAPIRes, setProductAPIRes] = React.useState<any>([]);
  //   const [productWidth, setProductWidth] = React.useState(150);
  const { slug } = props
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `/api/product?slug=${slug}`,
    })
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res)
        setProductAPIRes(res.data.data);
        // setRelatedProductAppear(false);
      })
      .catch(() => { });
  }, [slug]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const isMobile = useMobile();
  const isTablet = useTablet();
  return (
    <React.Fragment>
      <ButtonBase onClick={handleClickOpen}>
        <EditIcon />
      </ButtonBase>
      <Dialog
        style={{ zIndex: 2000 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      // zIndex="99"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
                  <Box
                    display="flex"
                    flexDirection={{ xs: "row", md: "row" }}
                    alignItems="center"
                    gap="1rem"
                    margin="1.2rem 0"
                  >
                    <Box display="flex">
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
                          <Image
                            src={productAPIRes.productColor[0].imageURL[0]}
                            loading="lazy"
                            alt="cart thumbnail"
                            width="108"
                            height="135"
                            style={{ borderRadius: "0.8rem" }}
                          />
                          //   <AwesomeSlider
                          //     className="slider"
                          //     bullets={isMobile ? false : true}
                          //     style={{
                          //       height: isMobile ? "50vh" : productWidth - 50,
                          //       width: isMobile ? "100vw" : productWidth - 130,
                          //     }}
                          //   >
                          //     {productAPIRes.productColor[0].imageURL.map(
                          //       (data: any, index: number) => {
                          //         return (
                          //           <Box
                          //             ref={ref}
                          //             borderRadius="0.8rem"
                          //             width="57rem"
                          //             height="57rem"
                          //             key={`${index}+productImagesSlider`}
                          //           >
                          //           </Box>
                          //         );
                          //       }
                          //     )}
                          //   </AwesomeSlider>
                        )}
                      </Box>
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
                        color={lightColor.text.primary}
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
                        color={lightColor.text.secondary}
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
                          color={lightColor.text.fade}
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
                            color={lightColor.text.primary}
                            textAlign="center"
                            fontSize={isMobile ? "1.6rem" : "2.8rem"}
                            fontStyle="normal"
                            fontWeight="700"
                            lineHeight="normal"
                            letterSpacing="0.02rem"
                          >
                            ₹
                            {/* {productAPIRes.discountPrice -
                          (isCouponApply.offerValue / 100) *
                            productAPIRes.discountPrice} */}
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
                            color={lightColor.text.secondary}
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
                              color: lightColor.text.offer,
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
                              ((productAPIRes.price -
                                productAPIRes.discountPrice) /
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
                          color={lightColor.text.primary}
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
                                <></>
                                //   <ButtonBase
                                //     onClick={() => handleChangeColor(index)}
                                //     key={data}
                                //     sx={{
                                //       width: "4rem",
                                //       height: "4rem",
                                //       borderRadius: "50%",
                                //       border:
                                //         parseInt(colorParamID) === index
                                //           ? `3px solid ${lightColor.theme.primary}`
                                //           : `2px solid ${
                                //               theme === "light"
                                //                 ? lightColor.text.secondary
                                //                 : darkColor.text.secondary
                                //             }`,
                                //       bgcolor: data.color,
                                //     }}
                                //   ></ButtonBase>
                              );
                            }
                          )}
                      </Box>
                    </Box>

                    {/* size options */}
                    <Box>
                      {/* Heading */}
                      <Typography
                        color={lightColor.text.primary}
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
                          productAPIRes.productColor[0].size.map(
                            (data: any, index: any) => (
                              <Box
                                key={data.size}
                                //   onClick={() => handleSizeSelection(index)}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "4.2rem",
                                  height: "4.2rem",
                                  // bgcolor:
                                  //   selectedSize === index
                                  //     ? "#C4C4C4"
                                  //     : "#EFF2F6",
                                  borderRadius: "0.8rem",
                                  cursor: "pointer",
                                }}
                              >
                                <Typography
                                  color={lightColor.text.primary}
                                  textAlign="center"
                                  fontSize={isMobile ? "1.6rem" : "1.8rem"}
                                  fontStyle="normal"
                                  // fontWeight={selectedSize === data.size ? 700 : 400}
                                  lineHeight="normal"
                                  letterSpacing="0.02rem"
                                >
                                  {data.size}
                                </Typography>
                              </Box>
                            )
                          )
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
                          //   onChange={(e) => setCouponInputValue(e.target.value)}
                          style={{
                            color: lightColor.text.primary,
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
                          //   onClick={handleApplyCoupon}
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
                            bgcolor: lightColor.text.chevron,
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

                    {/* {couponAPIRes.length !== 0 ? (
                  <>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      gap="0.8rem"
                    >
                      <Typography
                        color={lightColor.text.primary}
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
                            color={lightColor.text.primary}
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
                          color={lightColor.text.chevron}
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
                )} */}
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
                          //   onClick={() =>
                          //     handleAddToCartBtn(productAPIRes, isCouponApply.state)
                          //   }
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
                            color={lightColor.text.primary}
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
                            color={lightColor.text.primary}
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
                          width: isMobile ? "35rem" : "50rem",
                          height: "5rem",
                          borderRadius: "0.4rem",
                          marginBottom: "0.5rem",
                        }}
                      ></Skeleton>
                    ) : (
                      <Accordion
                        // expanded={expanded === "offers"}
                        // onChange={handleAccordionChange("offers")}
                        sx={{
                          boxShadow: "none",
                          width: isMobile ? "100%" : "auto",
                        }}
                      >
                        {/* <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Offers</Typography>
                    </AccordionSummary> */}
                        <AccordionDetails>
                          {/* Offers content */}
                          <Typography variant="body1">
                            Buy 1 Get 1 Free
                          </Typography>
                          {/* Tap to copy */}
                          <CopyToClipboard
                            text="Text to be copied"
                          // onCopy={handleCopy}
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
                          width: isMobile ? "35rem" : "50rem",
                          height: "5rem",
                          borderRadius: "0.4rem",
                          marginBottom: "0.5rem",
                        }}
                      ></Skeleton>
                    ) : (
                      <Accordion
                        // expanded={expanded === "description"}
                        // onChange={handleAccordionChange("description")}
                        sx={{
                          boxShadow: "none",
                          width: isMobile ? "100%" : "auto",
                        }}
                      >
                        {/* <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Description</Typography>
                    </AccordionSummary> */}
                        <AccordionDetails>
                          {/* Description content */}
                          <Box
                            dangerouslySetInnerHTML={{
                              __html:
                                productAPIRes?.descImage?.descItems[0]?.desc,
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
                          width: isMobile ? "35rem" : "50rem",
                          height: "5rem",
                          borderRadius: "0.4rem",
                          marginBottom: "0.5rem",
                        }}
                      ></Skeleton>
                    ) : (
                      <Accordion
                        // expanded={expanded === "rating"}
                        // onChange={handleAccordionChange("rating")}
                        sx={{
                          boxShadow: "none",
                          width: isMobile ? "100%" : "auto",
                        }}
                      >
                        {/* <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Rating</Typography>
                    </AccordionSummary> */}
                        <AccordionDetails>
                          {/* Rating content */}
                          <Box
                            display="flex"
                            width="100%"
                            flexDirection="column"
                            alignItems="flex-start"
                            gap={isMobile ? "3.2rem" : "5.6rem"}
                            padding="0 2.4rem"
                          >
                            <Grid
                              container
                              flexDirection={
                                isMobile ? "column-reverse" : "row"
                              }
                              spacing={10}
                            >
                              <Grid
                                item
                                xs={isTablet ? (isMobile ? 12 : 6) : 8}
                              >
                                <Box
                                  display="flex"
                                  flexDirection="column"
                                  alignItems="flex-start"
                                  gap={isMobile ? "3.2rem" : "5.6rem"}
                                >
                                  <Typography
                                    color={lightColor.text.primary}
                                    fontSize="2rem"
                                    fontStyle="normal"
                                    fontWeight="700"
                                    lineHeight="normal"
                                    letterSpacing="0.02rem"
                                  >
                                    Customer reviews
                                  </Typography>
                                  {/* {reviewApiRes.length === 0 ? (
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
                              )} */}
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xs={isTablet ? (isMobile ? 12 : 6) : 4}
                              >
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

                                    {/* {Object.values(percentRating).map(
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
                                          color={lightColor.text.fade}
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
                                          bgcolor={lightColor.text.secondary}
                                        >
                                          <Box
                                            width={`${isNaN(data) ? 0 : data}%`}
                                            height="0.6rem"
                                            flexShrink="0"
                                            bgcolor={lightColor.theme.primary}
                                          ></Box>
                                        </Box>
                                        <Typography
                                          color={lightColor.text.fade }
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
                                )} */}
                                    {/* <ButtonBase
                                  onClick={() => setIsReviewDialogOpen(true)}
                                  sx={{
                                    display: "flex",
                                    padding: "0.7rem 1.2rem",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "0.8rem",
                                    bgcolor:lightColor.text.chevron,
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
                                </ButtonBase> */}

                                    {/* <Dialog
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
                                        bgcolor:lightColor.text.chevron,
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
                                </Dialog> */}
                                  </Box>
                                  {/* <Grid container spacing={2}>
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
                              </Grid> */}
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
