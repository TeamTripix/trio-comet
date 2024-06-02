import React, { useState } from "react";
import { Box, Drawer, ButtonBase, Typography } from "@mui/material";
import CartIcon from "../../icons/cartIcon";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import CancelIcon from "../../icons/cancelIcon";
import Bin from "../../icons/bin";
import Minus from "../../icons/minus";
import Plus from "../../icons/plus";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useMobile } from "@/utils/responsive";
import EditIcon from "../../icons/editIcon";
import EditCartProductBox from "@components/EditCartProductBox";

type Anchor = "top" | "left" | "bottom" | "right";
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const cartData: any = useSelector<any>((state) => state.addToCart.cartData);
  const totalPrice: any = useSelector<any>((state) => state.totalCost);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  interface cartItemProps {
    cartData?: any;
    anchor?: any;
  }
  const CartItem: React.FC<cartItemProps> = ({ cartData, anchor }) => {
    const dispatch = useDispatch();
    const { product, quantity, isCouponApply } = cartData;
    const { name, price, image, productColor, productSize } = product;
    const [isEditBoxVisible, setIsEditBoxVisible] = useState(false);
    const handleSubtractBtn = () => {
      if (quantity === 1) {
      } else {
        dispatch({
          type: "ADD_TO_CART",
          payload: { product: product, quantity: -1, isCouponApply: false },
        });
        dispatch({
          type: "SUBTRACT_IN_TOTAL_COST",
          payload: parseInt(price),
        });
      }
    };

    const handleAddBtn = () => {
      dispatch({
        type: "ADD_TO_CART",
        payload: { product: product, quantity: 1, isCouponApply: false },
      });
      dispatch({
        type: "ADD_IN_TOTAL_COST",
        payload: parseInt(price),
      });
    };

    const handleRemoveBtn: any = () => {
      const deletedData = {
        id: product._id,
      };
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: { product: deletedData, isCouponApply, quantity },
      });
      dispatch({
        type: "SUBTRACT_IN_TOTAL_COST",
        payload: parseInt(price) * parseInt(quantity),
      });
    };

    const handleEditBtn = () => {
      toggleDrawer(anchor, false); 
    };

    return (
      <>
        <Box
          width="100%"
          height="15.2rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="4rem"
          flexShrink="0"
        >
          <Box borderRadius="0.8rem" width="25%" height="15.2rem">
            <Image
              src={image}
              loading="lazy"
              alt="cart thumbnail"
              width="108"
              height="135"
              style={{ borderRadius: "0.8rem" }}
            />
          </Box>
          <Box
            width="60%"
            display="flex"
            height="15.2rem"
            padding="3.2rem 0rem"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            gap="4rem"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap="0.4rem"
              width="17rem"
            >
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                fontSize="1.6rem"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.02rem"
              >
                {name.slice(0, 50)}...
              </Typography>
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize="1.6rem"
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.02rem"
              >
                ₹{parseInt(price) * parseInt(quantity)}
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="1rem"
              >
                <Box
                  width="2rem"
                  height="2rem"
                  borderRadius="50%"
                  bgcolor={productColor}
                  zIndex={99}
                ></Box>
                <Typography>{productSize}</Typography>
              </Box>
            </Box>

            <Box width="100%" display="flex" justifyContent="space-between">
              {!isCouponApply ? (
                <Box
                  display="flex"
                  width="7.8rem"
                  height="2rem"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ButtonBase
                    onClick={handleSubtractBtn}
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      flexShrink: "0",
                      bgcolor:
                        theme === "light"
                          ? lightColor.text.secondary
                          : darkColor.text.secondary,
                      borderTopLeftRadius: "4px",
                      borderBottomLeftRadius: "4px",
                    }}
                  >
                    <Minus />
                  </ButtonBase>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="5rem"
                    height="2rem"
                    border="1px solid #F7F7F7"
                  >
                    <Typography
                      color={
                        theme === "light"
                          ? lightColor.text.primary
                          : darkColor.text.primary
                      }
                      textAlign="center"
                      fontSize="1rem"
                      fontStyle="normal"
                      fontWeight="700"
                      lineHeight="normal"
                      letterSpacing="0.02rem"
                    >
                      {quantity}
                    </Typography>
                  </Box>
                  <ButtonBase
                    onClick={handleAddBtn}
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      flexShrink: "0",
                      bgcolor:
                        theme === "light"
                          ? lightColor.text.secondary
                          : darkColor.text.secondary,
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    <Plus />
                  </ButtonBase>
                </Box>
              ) : (
                <Box
                  display="flex"
                  width="7.8rem"
                  height="2rem"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ButtonBase
                    sx={{
                      width: "100%",
                      height: "2rem",
                      flexShrink: "0",
                      bgcolor:
                        theme === "light"
                          ? lightColor.theme.primary
                          : darkColor.theme.primary,
                      borderRadius: "4px",
                    }}
                  >
                    <Typography
                      color={
                        theme === "light"
                          ? lightColor.text.primary
                          : darkColor.text.primary
                      }
                      textAlign="center"
                      fontSize="1rem"
                      fontStyle="normal"
                      fontWeight="700"
                      lineHeight="normal"
                      letterSpacing="0.05rem"
                    >
                      Applied
                    </Typography>
                  </ButtonBase>
                </Box>
              )}
              {/* <ButtonBase onClick={handleEditBtn}>
                <EditCartProductBox />
              </ButtonBase> */}
              <ButtonBase onClick={handleRemoveBtn}>
                <Bin />
              </ButtonBase>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  const CartDrawer = (props: any) => {
    // const [couponValue, setCouponValue] = useState("");
    const { anchors } = props;
    const isMobile = useMobile();

    // const handleApplyCoupon = () => {
    //   axios({
    //     method: "GET",
    //     url: "/api/coupon",
    //   })
    //     .then((res) => {
    //       if (res.data.data[0].name === couponValue) {
    //         if (res.data.data[0].quantity > 0) {
    //           if (
    //             res.data.data[0].couponProductId === cartData[0].product._id
    //           ) {
    //             toast.success("Coupon applied!");
    //           } else {
    //             toast.error("Coupon not apply");
    //           }
    //         } else {
    //           toast.error("Coupon expired");
    //         }
    //       } else {
    //         toast.error("Invalid coupon");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    return (
      <Box
        sx={{ width: isMobile ? "100vw" : "40rem", height: "100vh" }}
        role="presentation"
      >
        <Box
          display="flex"
          height="4vh"
          padding="0rem 1.6rem"
          justifyContent="space-between"
          alignItems="center"
          marginTop="2rem"
        >
          <Typography
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
            Cart
          </Typography>
          <ButtonBase onClick={toggleDrawer(anchors, false)}>
            <CancelIcon
              color={
                theme === "light"
                  ? lightColor.text.primary
                  : darkColor.text.primary
              }
            />
          </ButtonBase>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          gap="4rem"
          height="93vh"
        >
          <Box
            padding="0 1.5rem"
            width={isMobile ? "100%" : "40rem"}
            display="flex"
            flexDirection="column"
            overflow="scroll"
            gap="2.4rem"
            marginTop="2rem"
            sx={{
              overflowX: "hidden",
            }}
          >
            {cartData.length === 0 ? (
              <>
                <Box
                  width="100%"
                  height="30.5rem"
                  display="flex"
                  justifyContent="center"
                >
                  <Image
                    src={`/assets/emptyCart/1.png`}
                    loading="lazy"
                    alt="empty cart"
                    width="305"
                    height="305"
                  />
                </Box>
                <Typography
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
                  Your cart is Empty
                </Typography>
              </>
            ) : (
              cartData.map((data: any) => {
                return (
                  <CartItem
                    anchor={anchors}
                    key={data.product._id}
                    cartData={data}
                  />
                );
              })
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1.6rem"
          >
            <Box
              display="flex"
              width={isMobile ? "100vw" : "39.7rem"}
              height="11.6rem"
              padding="0.6rem 1.6rem"
              justifyContent="space-between"
              alignItems="center"
              gap="7.7rem"
              flexShrink="0"
              border={`2px solid ${
                theme === "light" ? lightColor.text.white : darkColor.text.white
              }`}
              bgcolor="#FFF"
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                gap="0.4rem"
              >
                <Box>
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary
                    }
                    textAlign="center"
                    fontSize="1.7rem"
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="normal"
                    letterSpacing="0.02rem"
                  >
                    ₹{totalPrice}
                  </Typography>
                </Box>
                <Typography
                  color={
                    theme === "light"
                      ? lightColor.text.fade
                      : darkColor.text.fade
                  }
                  textAlign="center"
                  fontSize="1rem"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="normal"
                  letterSpacing="0.05rem"
                >
                  Inclusive of all taxes
                </Typography>
              </Box>
              <Box>
                <ButtonBase
                  sx={{
                    display: "flex",
                    width: "18rem",
                    height: "5rem",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1.6rem",
                    flexShrink: 0,
                    borderRadius: "0.4rem",
                    bgcolor:
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary,
                  }}
                >
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.white
                        : darkColor.text.white
                    }
                    width="100%"
                    textAlign="center"
                    fontSize="1.6rem"
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="normal"
                    letterSpacing="0.05rem"
                  >
                    Confirm Order
                  </Typography>
                </ButtonBase>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      {(["right"] as const).map((anchor) => (
        <Box key={anchor}>
          <ButtonBase onClick={toggleDrawer(anchor, true)}>
            <CartIcon
              color={
                theme === "light"
                  ? lightColor.text.primary
                  : darkColor.text.primary
              }
            />
          </ButtonBase>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <CartDrawer anchors={anchor} />
          </Drawer>
        </Box>
      ))}
    </>
  );
}
