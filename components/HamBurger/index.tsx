import React, { useEffect, useState } from "react";
import {
  ButtonBase,
  Typography,
  Box,
  Grid,
  SwipeableDrawer,
} from "@mui/material";
import HamBurgerIcon from "../../icons/hamBurgerIcon";
import CancelIcon from "../../icons/cancelIcon";
import { darkColor, lightColor } from "@/utils/CustomTheme/color";
import CategoryIcon from "../../icons/categoryIcon";
import ArrowIcon from "../../icons/arrowIcon";
import ComboIcon from "../../icons/comboIcon";
import BulkQueryIcon from "../../icons/bulkQueryIcon";
import BlogIcon from "../../icons/blogIcon";
import AboutUsIcon from "../../icons/aboutUsIcon";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import AccountIcon from "../../icons/accountIcon";
import { useMobile, useTablet } from "@/utils/responsive";
import { usePathname } from "next/navigation";
import Logout from "../../icons/logout";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import ThemeToggleBtn from "@components/ThemeToggleBtn";

type Anchor = "left";

const Index = () => {
  const isMobile = useMobile();
  const [categoryItem, setCategoryItem] = useState([]);
  const [isCategoryVisible, setIsCategoryVisible] = useState(true);

  const session: any = useSession();
  const theme: any = useSelector<any>((state) => state.themeToggle);
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/category",
    })
      .then((res) => {
        setCategoryItem(res.data.data);
      })
      .catch(() => {});
  }, []);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleCategory = () => {
    setIsCategoryVisible(!isCategoryVisible);
  };

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

  const List = (props: any) => {
    const { anchor } = props;
    const isMobile = useMobile();
    const isTablet = useTablet();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
    const handleLogout = () => {};
    return (
      <>
        {isMobile || isTablet ? (
          <Box
            display="flex"
            padding="1.9rem 1.9rem 1.8rem 1.5rem"
            alignItems="center"
            gap="18.2rem"
            borderRadius="0rem 0rem 0.8rem 0.8rem"
            bgcolor="var(--light-orange, #FBC02D)">
            <Box
              width="10.6rem"
              height="3.2rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Box>
                <Link
                  href={
                    session.status === "authenticated" ? "/profile" : "/login"
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1.2rem",
                  }}
                  onClick={toggleDrawer(anchor, false)}>
                  <ButtonBase sx={{ borderRadius: "50%" }}>
                    {/* <AdminIcon /> */}
                    <AccountIcon />
                  </ButtonBase>
                  <Typography
                    sx={{
                      color: "#FBFBFB",
                      textAlign: "center",
                      fontSize: "1.6rem",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "2.4rem",
                      letterSpacing: "0.05rem",
                    }}>
                    {session.status === "authenticated"
                      ? session?.data?.user?.userInfo?.name || session?.data?.user?.userInfo?.number
                      : "Login"}
                  </Typography>
                </Link>
              </Box>
            </Box>
            <ButtonBase
              sx={{ borderRadius: "50%" }}
              onClick={toggleDrawer(anchor, false)}>
              <CancelIcon />
            </ButtonBase>
          </Box>
        ) : (
          ""
        )}

        <Box
          sx={{ width: 350 }}
          role="presentation"
          onKeyDown={toggleDrawer(anchor, false)}
          padding="1.6rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100vh">
          <Box
            display="flex"
            padding="0rem 1.6rem"
            flexDirection="column"
            alignItems="flex-start"
            gap="2.4rem"
            flex="1 0 0">
            {!isMobile &&
              <Box>
                <ThemeToggleBtn />
              </Box>
            }
            <Box
              onClick={toggleCategory}
              display="flex"
              padding="0.4rem 0rem"
              justifyContent="space-between"
              alignItems="center"
              alignSelf="stretch"
              sx={{
                cursor: "pointer",
              }}>
              <Box
                display="flex"
                width="11.2rem"
                justifyContent="space-between"
                alignItems="center"
                color={
                  isCategoryVisible
                    ? theme === "light"
                      ? lightColor.text.chevron
                      : darkColor.text.chevron
                    : theme === "light"
                    ? lightColor.text.secondary
                    : darkColor.text.secondary
                }>
                <CategoryIcon
                  color={
                    isCategoryVisible
                      ? theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron
                      : theme === "light"
                      ? lightColor.text.secondary
                      : darkColor.text.secondary
                  }
                />
                <Typography
                  textAlign="center"
                  fontSize="1.6rem"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="2.4rem"
                  letterSpacing="0.05rem">
                  Category
                </Typography>
              </Box>
              <ArrowIcon degree={isCategoryVisible ? 90 : 0} />
            </Box>

            {isCategoryVisible ? (
              <Box
                display="flex"
                alignItems="flex-start"
                gap="2.4rem"
                alignSelf="stretch">
                <Grid container maxHeight="40rem" overflow="hidden">
                  {categoryItem.length === 0
                    ? "loading..."
                    : categoryItem.slice(0, 9).map((data: any) => {
                      console.log(data)
                        return (
                          <Grid item xs={4} key={data._id}>
                            <Link
                              href={`/category/${data.slug}`}>
                              <Box
                                width="6rem"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                gap="0.4rem"
                                margin="2rem">
                                <Box
                                  width="6rem"
                                  height="6rem"
                                  borderRadius="50%">
                                  <Image
                                    src={data.image}
                                    height="60"
                                    width="60"
                                    layout="responsive"
                                    style={{ borderRadius: "50%" }}
                                    alt="image"
                                  />
                                </Box>
                                <Typography
                                  color={
                                    theme === "light"
                                      ? lightColor.text.primary
                                      : darkColor.text.primary
                                  }
                                  textAlign="center"
                                  fontSize="1.2rem"
                                  fontStyle="normal"
                                  fontWeight="700"
                                  lineHeight="normal"
                                  letterSpacing="0.05rem">
                                  {data.name}
                                </Typography>
                              </Box>
                            </Link>
                          </Grid>
                        );
                      })}
                </Grid>
              </Box>
            ) : (
              ""
            )}

            <Link href="/combos" onClick={toggleDrawer(anchor, false)}>
              <Box
                display="flex"
                width="12.5rem"
                alignItems="center"
                gap="2rem ">
                <ComboIcon
                  color={
                    pathname === "/combos"
                      ? theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron
                      : theme === "light"
                      ? lightColor.text.secondary
                      : darkColor.text.secondary
                  }
                />
                <Typography
                  color={
                    pathname === "/combos"
                      ? theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron
                      : theme === "light"
                      ? lightColor.text.secondary
                      : darkColor.text.secondary
                  }
                  textAlign="center"
                  fontSize="1.6rem"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="2.4rem"
                  letterSpacing="0.05rem">
                  Combos
                </Typography>
              </Box>
            </Link>

            <Link href="/bulk-query" onClick={toggleDrawer(anchor, false)}>
              <Box
                display="flex"
                width="12.5rem"
                alignItems="center"
                gap="2rem ">
                <BulkQueryIcon
                  color={
                    pathname === "/bulk-query"
                      ? theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron
                      : theme === "light"
                      ? lightColor.text.secondary
                      : darkColor.text.secondary
                  }
                />
                <Typography
                  color={
                    pathname === "/bulk-query"
                      ? theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron
                      : theme === "light"
                      ? lightColor.text.secondary
                      : darkColor.text.secondary
                  }
                  textAlign="center"
                  fontSize="1.6rem"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="2.4rem"
                  letterSpacing="0.05rem">
                  Bulk Query
                </Typography>
              </Box>
            </Link>

            <Link href="/blog-collection" onClick={toggleDrawer(anchor, false)}>
              <Box
                display="flex"
                width="12.5rem"
                alignItems="center"
                gap="2rem ">
                <BlogIcon
                  color={
                    pathname === "/blog-collection"
                      ? theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron
                      : theme === "light"
                      ? lightColor.text.secondary
                      : darkColor.text.secondary
                  }
                />
                <Typography
                  color={
                    pathname === "/blog-collection"
                      ? theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron
                      : theme === "light"
                      ? lightColor.text.secondary
                      : darkColor.text.secondary
                  }
                  textAlign="center"
                  fontSize="1.6rem"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="2.4rem"
                  letterSpacing="0.05rem">
                  Blogs
                </Typography>
              </Box>
            </Link>

            <Link href="/about-us" onClick={toggleDrawer(anchor, false)}>
              <Box
                display="flex"
                width="12.5rem"
                alignItems="center"
                gap="2rem ">
                <AboutUsIcon
                  color={
                    pathname === "/about-us"
                      ? theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron
                      : theme === "light"
                      ? lightColor.text.secondary
                      : darkColor.text.secondary
                  }
                />
                <Typography
                  color={
                    pathname === "/about-us"
                      ? theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron
                      : theme === "light"
                      ? lightColor.text.secondary
                      : darkColor.text.secondary
                  }
                  textAlign="center"
                  fontSize="1.6rem"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="2.4rem"
                  letterSpacing="0.05rem">
                  About us
                </Typography>
              </Box>
            </Link>
          </Box>
          <Box>
            {isLoggedIn ? (
              <ButtonBase
                onClick={handleLogout}
                sx={{
                  height: "2.4rem ",
                  padding: "0 1.5rem",
                  gap: "2rem ",
                }}>
                <Logout />
              </ButtonBase>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </>
    );
  };

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <ButtonBase
            sx={{ borderRadius: "50%", padding: "0.5rem" }}
            onClick={toggleDrawer(anchor, true)}>
            <HamBurgerIcon
              color={
                theme === "light"
                  ? lightColor.text.primary
                  : darkColor.text.primary
              }
            />
          </ButtonBase>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            disableSwipeToOpen={false}>
            <List anchor={anchor} />
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Index;
