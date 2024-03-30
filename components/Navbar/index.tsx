"use client";
import {
  Box,
  Badge,
  ButtonBase,
  MenuItem,
  Menu,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Image from "next/legacy/image";
import styled from "@emotion/styled";
import { lightColor, darkColor } from "../../src/utils/CustomTheme/color";
import Link from "next/link";
import CategoryBox from "@components/CategoryBox";
import { usePathname } from "next/navigation";
import Cart from "@components/Cart";
import FavCart from "@components/Favcart";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTablet, useMobile } from "../../src/utils/responsive";
import HamBurger from "@components/HamBurger";
import Search from "@components/Search";
import { useSession } from "next-auth/react";
import AdminIcon from "../../icons/adminIcon";
import SearchIconMobile from "../../icons/SearchIconMobile";
import ThemeToggleBtn from "@components/ThemeToggleBtn";
import PageSpacing from "@components/PageSpacing";

interface LIProps {
  highlite?: boolean;
}

const LI = styled.div<LIProps>`
  color: ${(props) =>
    props.highlite
      ? props.theme === "light"
        ? lightColor.text.primary
        : darkColor.text.primary
      : props.theme === "light"
      ? lightColor.text.primary
      : darkColor.text.primary};
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.4rem; /* 150% */
  letter-spacing: 0.5px;
  list-style: none;

  &:hover {
    color: ${(props) =>
      props.theme === "light"
        ? lightColor.text.primary
        : darkColor.text.primary};
    cursor: pointer;
  }

  &:active {
    color: ${(props) =>
      props.theme === "light"
        ? lightColor.text.primary
        : darkColor.text.primary};
  }
`;

export default function Index() {
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const cartData: any = useSelector<any>((state) => state.addToCart.cartData);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const [anchorElHover, setAnchorElHover] = React.useState(null);
  const [navHeight, setNavHeight] = useState("8rem"); // navbar height
  const [prevScrollPos, setPrevScrollPos] = useState(0); //page position value
  const [isClient, setIsClient] = useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  // for capturing scroll on the page
  // useEffect(() => {
  //   window.addEventListener("scroll", () => setNavHeight("5rem"));
  //   return () => {
  //     window.removeEventListener("scroll", () => setNavHeight("5rem"));
  //   };
  // });

  // capturing the top of the page
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
  //     if (currentScrollPos === 0 && prevScrollPos !== 0) {
  //       setNavHeight("8rem");
  //     }
  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [prevScrollPos]);

  const favCartData: any = useSelector<any>(
    (state) => state.addToFavCart.favCartData
  );
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const isTablet = useTablet();
  const isMobile = useMobile();
  const session = useSession();

  const open = Boolean(moreAnchorEl);
  // const handleClickMoreMenu = (e: any) => {
  //   setMoreAnchorEl(e.currentTarget);
  // };
  const handleCloseMoreMenu = (url: string) => {
    setMoreAnchorEl(null);
    router.push(url, { scroll: false });
  };
  if (isMobile && isTablet) {
    return (
      <>
        <Box
          display="flex"
          height="5rem"
          width="100%"
          padding="0rem 2.4rem"
          justifyContent="space-between"
          alignItems="center"
          bgcolor={theme === "light" ? lightColor.navbarBG : darkColor.navbarBG}
          position="fixed"
          zIndex="99"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            alignSelf="stretch"
          >
            <HamBurger />
            <Link href="/">
              <Box width="10rem" sx={{ cursor: "pointer" }}>
                <Image
                  src={`/assets/logo/${
                    theme === "light" ? "logo-light.png" : "logo-dark.png"
                  }`}
                  alt="Logo"
                  width="160"
                  height="50"
                  layout="responsive"
                />
              </Box>
            </Link>
          </Box>
          <Box display="flex" alignItems="center" gap="0.4rem">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="0.8rem"
            >
              <Link href="/search?category=all&query=">
                <ButtonBase sx={{ borderRadius: "50%", padding: "3px" }}>
                  <SearchIconMobile
                    color={
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary
                    }
                  />
                </ButtonBase>
              </Link>

              <Box sx={{ borderRadius: "50%", padding: "3px" }}>
                <Badge
                  badgeContent={
                    isClient
                      ? favCartData.length === 0
                        ? 0
                        : favCartData.length
                      : 0
                  }
                  color="error"
                >
                  <FavCart />
                </Badge>
              </Box>

              <Box sx={{ borderRadius: "50%", padding: "3px" }}>
                <Badge
                  badgeContent={
                    isClient ? (cartData.length === 0 ? 0 : cartData.length) : 0
                  }
                  color="error"
                >
                  <Cart />
                </Badge>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" height="5rem"></Box>
      </>
    );
  }

  if (isTablet) {
    return (
      <>
        <Box
          display="flex"
          height="8rem"
          padding="0.8rem 4.8rem"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={
            theme === "light" ? lightColor.borderColor : darkColor.borderColor
          }
          bgcolor={theme === "light" ? lightColor.navbarBG : darkColor.navbarBG}
          position="fixed"
          zIndex="99"
          width="100%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flex="1 0 0"
          >
            <Box
              display="flex"
              gap="2rem"
              justifyContent="center"
              alignItems="center"
            >
              <HamBurger />
              <Link href="/">
                <Box width="16rem" height="5rem" sx={{ cursor: "pointer" }}>
                  <Image
                    src={`/assets/logo/${
                      theme === "light" ? "logo-light.png" : "logo-dark.png"
                    }`}
                    alt="Logo"
                    width="160"
                    height="50"
                    layout="responsive"
                  />
                </Box>
              </Link>
            </Box>
            <Search />
            <Box>
              <ThemeToggleBtn />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="0.8rem"
            >
              <Box sx={{ borderRadius: "50%", padding: "3px" }}>
                <Badge invisible={true}>
                  <Link
                    href={
                      session.status === "authenticated" ? "/profile" : "/login"
                    }
                  >
                    <ButtonBase sx={{ borderRadius: "50%" }}>
                      <AdminIcon
                        color={
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary
                        }
                      />
                    </ButtonBase>
                  </Link>
                </Badge>
              </Box>

              <Box sx={{ borderRadius: "50%", padding: "3px" }}>
                <Badge
                  badgeContent={
                    isClient
                      ? favCartData.length === 0
                        ? 0
                        : favCartData.length
                      : 0
                  }
                  color="error"
                >
                  <FavCart />
                </Badge>
              </Box>

              <Box sx={{ borderRadius: "50%", padding: "3px" }}>
                <Badge
                  badgeContent={
                    isClient ? (cartData.length === 0 ? 0 : cartData.length) : 0
                  }
                  color="error"
                >
                  <Cart />
                </Badge>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" height="8rem"></Box>
      </>
    );
  }

  function handleClick(event: any) {
    if (anchorElHover !== event.currentTarget) {
      setAnchorElHover(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorElHover(null);
  }

  return (
    <>
      <Box
        // display="flex"
        width="100vw"
        // height="11rem"
        padding="0.8rem 0rem"
        justifyContent="space-between"
        alignItems="center"
        flexShrink="0"
        bgcolor="white"
        position="fixed"
        zIndex="99"
      >
        <PageSpacing>
          <Box
            display="flex"
            // width="100vw"
            height={navHeight}
            // padding="0.8rem 6.4rem"
            justifyContent="space-between"
            alignItems="center"
            flexShrink="0"
            bgcolor="white"
            // position="fixed"
            zIndex="99"
          >
            <Link href="/">
              <Box width="16rem" height="5rem" sx={{ cursor: "pointer" }}>
                <Image
                  src={`/assets/logo/${
                    theme === "light" ? "logo-light.png" : "logo-dark.png"
                  }`}
                  alt="Logo"
                  width="160"
                  height="50"
                  layout="responsive"
                />
              </Box>
            </Link>

            <Box display="flex" alignItems="center" gap="4rem">
              <Search />
            </Box>
            <Box display="flex" alignItems="center" gap="4rem">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="0.8rem"
              >
                {/* <Box>
                  <ThemeToggleBtn />
                </Box> */}
                <Box sx={{ borderRadius: "50%", padding: "3px" }}>
                  <Badge invisible={true}>
                    {/* <Profile /> */}
                    <Link
                      href={
                        session.status === "authenticated"
                          ? "/profile"
                          : "/login"
                      }
                    >
                      {/* <Typography>Login</Typography> */}
                      <ButtonBase sx={{ borderRadius: "50%" }}>
                        <AdminIcon
                          color={
                            theme === "light"
                              ? lightColor.text.primary
                              : darkColor.text.primary
                          }
                        />
                      </ButtonBase>
                    </Link>
                  </Badge>
                </Box>

                <Box sx={{ borderRadius: "50%", padding: "3px" }}>
                  <Badge
                    badgeContent={
                      isClient
                        ? favCartData.length === 0
                          ? 0
                          : favCartData.length
                        : 0
                    }
                    color="error"
                  >
                    <FavCart />
                  </Badge>
                </Box>

                <Box sx={{ borderRadius: "50%", padding: "3px" }}>
                  <Badge
                    badgeContent={
                      isClient
                        ? cartData.length === 0
                          ? 0
                          : cartData.length
                        : 0
                    }
                    color="error"
                  >
                    <Cart />
                  </Badge>
                </Box>
              </Box>
            </Box>
          </Box>
        </PageSpacing>
        <Box bgcolor={lightColor.navbarBG}>
          <PageSpacing>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="5rem"
              padding="1rem 0"
            >
              {/* <LI
                theme={theme}
                highlite={isCategoryVisible}
                aria-owns={anchorElHover ? "simple-menu" : undefined}
                aria-haspopup="true"
                onMouseEnter={handleClick}
                onMouseLeave={handleClose}
              >
                Category
                <Menu
                  id="simple-menu"
                  anchorEl={anchorElHover}
                  open={Boolean(anchorElHover)}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                >
                  <Box width={"100vw"}>
                    <CategoryBox />
                  </Box>
                </Menu>
              </LI> */}

              <Link href="/new-arrivals">
                <LI
                  theme={theme}
                  highlite={pathname === "/bulk-query" ? true : false}
                >
                  New Arrivals
                </LI>
              </Link>

              <Link href="/men">
                <LI
                  theme={theme}
                  highlite={pathname === "/men" ? true : false}
                >
                  Men
                </LI>
              </Link>

              <Link href="/women">
                <LI
                  theme={theme}
                  highlite={pathname === "/women" ? true : false}
                >
                  Women
                </LI>
              </Link>

              <Link href="/combos">
                <LI
                  theme={theme}
                  highlite={pathname === "/combos" ? true : false}
                >
                  Combos
                </LI>
              </Link>

              <Link href="/blog-collection">
                <LI
                  theme={theme}
                  highlite={pathname === "/blog-collection" ? true : false}
                >
                  Blogs
                </LI>
              </Link>
              <Link href="/about-us">
                <LI
                  theme={theme}
                  highlite={pathname === "/about-us" ? true : false}
                >
                  About Us
                </LI>
              </Link>
              {/* <Box onClick={(e) => handleClickMoreMenu(e)}>
                <LI
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  More
                </LI>
              </Box> */}
              <Menu
                id="basic-menu"
                anchorEl={moreAnchorEl}
                open={open}
                onClose={() => setMoreAnchorEl(null)}
              >
                <MenuItem onClick={() => handleCloseMoreMenu("/about-us")}>
                  <LI theme={theme}>About us</LI>
                </MenuItem>
                <MenuItem>
                  <LI theme={theme}>Gallery</LI>
                </MenuItem>
              </Menu>
            </Box>
          </PageSpacing>
        </Box>
      </Box>

      <Box width="100%" height="11rem"></Box>
    </>
  );
}
