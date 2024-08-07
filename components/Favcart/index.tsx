import * as React from "react";
import { Box, Drawer, ButtonBase, Typography } from "@mui/material";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import CancelIcon from "../../icons/cancelIcon";
import Image from "next/image";
import FavourateIcon from "../../icons/favourateIcon";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMobile } from "@/utils/responsive";

interface FavCartItemProps {
  favCartData: any;
}

type Anchor = "top" | "left" | "bottom" | "right";
export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const favCartData: any = useSelector<any>(
    (state) => state.addToFavCart.favCartData
  );

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

  const FavCartItem: React.FC<FavCartItemProps> = ({ favCartData }) => {
    const dispatch = useDispatch();
    const isMobile = useMobile();

    const handleMoveToCart = () => {
      const dispatchData = {
        description: favCartData.description,
        price: favCartData.discountPrice,
        name: favCartData.name,
        productColor: favCartData.productColor[0].color,
        _id: favCartData._id,
        image: favCartData.productColor[0].imageURL[0],
      };
      dispatch({
        type: "ADD_TO_CART",
        payload: { product: dispatchData, quantity: 1, isCouponApply: false },
      });
      dispatch({
        type: "ADD_IN_TOTAL_COST",
        payload: favCartData.discountPrice,
      });
      dispatch({
        type: "REMOVE_FROM_FAV_CART",
        payload: favCartData._id,
      });
      toast("Your product added to cart");
    };
    return (
      <Box
        width={isMobile ? "100%" : "38rem"}
        display="flex"
        justifyContent="start"
        alignItems="center"
        gap="4rem"
        flexShrink="0"
      >
        <Box borderRadius="0.8rem" width="25%" height="auto">
          <Image
            src={favCartData.productColor[0].imageURL[0]}
            loading="lazy"
            alt="cart thumbnail"
            width="108"
            height="135"
            style={{ borderRadius: "0.8rem" }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="space-between"
          width="22rem"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            gap="0.4rem"
            width="22rem"
            marginBottom="3rem"
          >
            <Typography
              color={lightColor.text.primary}
              fontSize="1.6rem"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="normal"
              letterSpacing="0.02rem"
            >
              {favCartData.name}
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
              ₹{favCartData.discountPrice}
            </Typography>
          </Box>

          <Box width="100%" display="flex" justifyContent="space-between">
            <Box
              display="flex"
              width="7.8rem"
              height="2rem"
              justifyContent="space-between"
              alignItems="center"
            >
              <ButtonBase
                onClick={handleMoveToCart}
                sx={{
                  width: "100%",
                  height: "2rem",
                  flexShrink: "0",
                  bgcolor:
                    theme === "light"
                      ? lightColor.text.primary
                      : darkColor.text.primary,
                  borderRadius: "4px",
                }}
              >
                <Typography
                  color={darkColor.text.primary}
                  textAlign="center"
                  fontSize="1rem"
                  fontStyle="normal"
                  fontWeight="700"
                  lineHeight="normal"
                  letterSpacing="0.05rem"
                >
                  Move to Cart
                </Typography>
              </ButtonBase>
            </Box>

            <ButtonBase
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_FAV_CART",
                  payload: favCartData._id,
                })
              }
            >
              <FavourateIcon color="#FF0000" fill="#FF0000" />
            </ButtonBase>
          </Box>
        </Box>
      </Box>
    );
  };

  const FavCartDrawer = (props: any) => {
    const isMobile = useMobile();
    const { anchor } = props;
    return (
      <Box
        sx={{ width: isMobile ? "100vw" : "40rem", height: "100vh" }}
        role="presentation"
      >
        <Box
          display="flex"
          width={isMobile ? "100vw" : "40rem"}
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
            Wishlist
          </Typography>
          <ButtonBase onClick={toggleDrawer(anchor, false)}>
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
            width={isMobile ? "100vw" : "40rem"}
            height="100vh"
            display="flex"
            flexDirection="column"
            overflow="scroll"
            gap="2.4rem"
            marginTop="4rem"
            sx={{
              overflowX: "hidden",
              "::-webkit-scrollbar": {
                width: "5px",
                borderRadius: "4rem",
              },
              "::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                display: "none",
              },
              "::-webkit-scrollbar-thumb": {
                bgcolor:
                  theme === "light"
                    ? lightColor.text.secondary
                    : darkColor.text.secondary,
                borderRadius: "4rem",
              },
            }}
          >
            {favCartData.length === 0 ? (
              <>
                <Box
                  width="100%"
                  height="100vh"
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Box display="flex" justifyContent="center">
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
                    Your wishlist is Empty
                  </Typography>
                </Box>
              </>
            ) : (
              favCartData.map((data: any) => {
                return <FavCartItem key={data._id} favCartData={data} />;
              })
            )}
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
            <Box display="flex" justifyContent="center" alignItems="center">
              <svg
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.0625 6.53724C0.0625 3.16163 3.02393 0.5625 6.5 0.5625C8.29184 0.5625 9.86855 1.40267 11 2.48979C12.1314 1.40267 13.7082 0.5625 15.5 0.5625C18.9761 0.5625 21.9375 3.16163 21.9375 6.53724C21.9375 8.84958 20.9514 10.8831 19.5852 12.6019C18.2214 14.3178 16.4374 15.7741 14.7293 16.9575C14.0769 17.4094 13.4169 17.8264 12.8128 18.134C12.2456 18.4229 11.5934 18.6875 11 18.6875C10.4066 18.6875 9.75437 18.4229 9.18716 18.134C8.5831 17.8264 7.92308 17.4094 7.27067 16.9575C5.56256 15.7741 3.77859 14.3178 2.41478 12.6019C1.0486 10.8831 0.0625 8.84959 0.0625 6.53724ZM6.5 2.4375C3.90094 2.4375 1.9375 4.34887 1.9375 6.53724C1.9375 8.29162 2.68223 9.925 3.88261 11.4353C5.08535 12.9485 6.70365 14.2837 8.33843 15.4162C8.95702 15.8447 9.53968 16.2094 10.0381 16.4632C10.5733 16.7358 10.8833 16.8125 11 16.8125C11.1167 16.8125 11.4267 16.7358 11.9619 16.4632C12.4603 16.2094 13.043 15.8447 13.6616 15.4162C15.2963 14.2837 16.9146 12.9485 18.1174 11.4353C19.3178 9.925 20.0625 8.29161 20.0625 6.53724C20.0625 4.34887 18.0991 2.4375 15.5 2.4375C14.0073 2.4375 12.6135 3.32928 11.7432 4.46115C11.5657 4.69195 11.2911 4.82721 11 4.82721C10.7089 4.82721 10.4343 4.69195 10.2568 4.46115C9.38651 3.32928 7.99269 2.4375 6.5 2.4375Z"
                  fill={
                    theme === "light"
                      ? lightColor.text.primary
                      : darkColor.text.primary
                  }
                  fillOpacity="0.8"
                />
              </svg>
            </Box>
          </ButtonBase>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <FavCartDrawer anchor={anchor} />
          </Drawer>
        </Box>
      ))}
    </>
  );
}
