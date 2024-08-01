import React, { useState, useRef, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";

export default function EditCartProductBox(props: any) {
  const { slug, productSize, _id, colorId,productColor } = props.product;

  const [open, setOpen] = useState(false);
  const [productAPIRes, setProductAPIRes] = useState<any>([]);
  const [selectedColor, setSelectedColor] = useState(productColor);
  const [selectedSize, setSelectedSize] = useState(productSize);
  const [productWidth, setProductWidth] = useState(470);

  const isMobile = useMobile();
  const isTablet = useTablet();
  const dispatch = useDispatch();

  const ref = useRef<HTMLImageElement>(null);
  const updateHeight = () => {
    if (ref.current) {
      const heightValue = ref.current.getBoundingClientRect().height;
      const widthValue = ref.current.getBoundingClientRect().width;
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

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `/api/product?slug=${slug}`,
    })
      .then((res) => {
        console.log(res)
        setProductAPIRes(res.data.data);
      })
      .catch(() => {});
  }, [slug]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeColor = (index: any) => {
    setSelectedColor(index);
  };

  const handleSizeSelection = (size: any) => {
    setSelectedSize(size);
  };

  const handleProductUpdateInCart = () => {
    const payload = {
      _id,
      productColor: selectedColor,
      productSize: selectedSize,
      colorId,
      isCouponApply:false,
    };
    dispatch({
      type: "EDIT_CART",
      payload: payload,
    });
  };
  return (
    <React.Fragment>
      <ButtonBase onClick={handleClickOpen}>
        <EditIcon />
      </ButtonBase>
      <Dialog
        style={{ zIndex: 2000 }}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
                // marginBottom={isMobile ? "0rem" : "5.7rem"}
                // padding="0 2rem"
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
                    // alignItems="center"
                    gap="1rem"
                    margin="1.2rem 0"
                  >
                    <Box display="flex">
                      {/* main image */}
                      <Box
                      // marginLeft={{ xs: "0", md: "1rem" }}
                      // marginTop={{ xs: "1rem", md: "0" }}
                      >
                        {productAPIRes?.length === 0 ? (
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
                            bullets={false}
                            style={{
                              height: isMobile
                                ? productWidth + 100
                                : productWidth - 50,
                              width: isMobile ? "100vw" : productWidth - 130,
                            }}
                          >
                            {productAPIRes?.productColor[0].imageURL.map(
                              (data: any, index: number) => {
                                return (
                                  <Box
                                    ref={ref}
                                    borderRadius="0.8rem"
                                    width="57rem"
                                    height="57rem"
                                    key={`${index}+productImagesSlider`}
                                  >
                                    <Image
                                      src={
                                        productAPIRes?.productColor[0]
                                          .imageURL[0]
                                      }
                                      loading="lazy"
                                      alt="cart thumbnail"
                                      fill
                                      style={{ borderRadius: "0.8rem" }}
                                    />
                                  </Box>
                                );
                              }
                            )}
                          </AwesomeSlider>
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
                    {productAPIRes?.length === 0 ? (
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
                        {productAPIRes?.name}
                      </Typography>
                    )}
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
                        {productAPIRes?.length === 0 ? (
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
                            ₹{productAPIRes?.discountPrice}
                          </Typography>
                        )}
                      </Box>

                      <Box>
                        {productAPIRes?.length === 0 ? (
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
                            ₹{productAPIRes?.price}
                          </Typography>
                        )}
                      </Box>
                      <Box>
                        {productAPIRes?.length === 0 ? (
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
                              ((productAPIRes?.price -
                                productAPIRes?.discountPrice) /
                                productAPIRes?.price) *
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
                        {productAPIRes?.length === 0
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
                          : productAPIRes?.productColor.map(
                              (data: any, index: number) => {
                                return (
                                  // <></>
                                  <ButtonBase
                                    onClick={() => handleChangeColor(index)}
                                    key={data}
                                    sx={{
                                      width: "4rem",
                                      height: "4rem",
                                      borderRadius: "50%",
                                      // border:
                                      //   parseInt(colorParamID) === index
                                      //     ? `3px solid ${lightColor.theme.primary}`
                                      //     : `2px solid ${lightColor.text.secondary}`,
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

                      <Box
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        gap={isMobile ? "1rem" : "1.7rem"}
                        width="100%"
                        marginTop="1rem"
                      >
                        {productAPIRes?.length === 0 ? (
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
                          productAPIRes?.productColor[0].size.map(
                            (data: any, index: any) => (
                              <Box
                                key={data.size}
                                onClick={() => handleSizeSelection(data.size)}
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "4.2rem",
                                  height: "4.2rem",
                                  bgcolor:
                                    selectedSize === data.size
                                      ? "#C4C4C4"
                                      : "#EFF2F6",
                                  borderRadius: "0.8rem",
                                  cursor: "pointer",
                                }}
                              >
                                <Typography
                                  color={lightColor.text.primary}
                                  textAlign="center"
                                  fontSize={isMobile ? "1.6rem" : "1.8rem"}
                                  fontStyle="normal"
                                  fontWeight={
                                    selectedSize === data.size ? 700 : 400
                                  }
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
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleProductUpdateInCart} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
