import { useMobile } from "@/utils/responsive";
import PageSpacing from "@components/PageSpacing";
import { Box, ButtonBase, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";

const Index = () => {
  const [blackBannerApiLoading, setBlackBannerApiLoading] = useState(true);
  const [blackBannerApiRes, setBlackBannerApiRes] = useState<any>([]);

  const isMobile = useMobile();
  const theme: any = useSelector<any>((state) => state.themeToggle);

  // get black banner
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/black-banner`,
    })
      .then((res) => {
        setBlackBannerApiRes(res.data.data);
        setBlackBannerApiLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setBlackBannerApiLoading(false);
      });
  }, []);
  return (
    <>
      {blackBannerApiLoading ? (
        ""
      ) : blackBannerApiRes.length === 0 ? (
        ""
      ) : (
        <>
          <Box
            position="fixed"
            display="inline-flex"
            height="3rem"
            padding="0.9rem 30rem"
            justifyContent="center"
            alignItems="center"
            gap="68.9rem"
            bgcolor={lightColor.blackBannerBG}
            width="100%"
            zIndex="99"
          >
            <PageSpacing>
              <Box
                display="flex"
                width="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  color={lightColor.text.primary}
                  fontSize={isMobile ? "0.8rem" : "1rem"}
                  fontStyle="normal"
                  fontWeight={isMobile ? "400" : "500"}
                  lineHeight="normal"
                  letterSpacing="0.05rem"
                >
                  {blackBannerApiRes[0].bannerText}
                </Typography>

                {/* <Link href={blackBannerApiRes[0].bannerURL}>
                  <ButtonBase
                    sx={{
                      display: "flex",
                      padding: "0.2rem 0.8rem",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                      borderRadius: "0.2rem",
                      bgcolor:
                        theme === "dark"
                          ? lightColor.text.primary
                          : darkColor.text.primary,
                      width: isMobile ? "5rem" : "7rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    <Typography
                      color={
                        theme === "light"
                          ? lightColor.text.primary
                          : darkColor.text.primary
                      }
                      textAlign="center"
                      fontSize={isMobile ? "0.6rem" : "1.2rem"}
                      fontStyle="normal"
                      fontWeight="500"
                      lineHeight="normal"
                      letterSpacing="0.05rem"
                    >
                      Buy Now
                    </Typography>
                  </ButtonBase>
                </Link> */}
                <Box display="flex" gap={5}>
                  <ButtonBase>
                    <Typography
                      color={lightColor.text.primary}
                      fontSize={isMobile ? "0.8rem" : "1rem"}
                      fontStyle="normal"
                      fontWeight={isMobile ? "400" : "500"}
                      lineHeight="normal"
                      letterSpacing="0.05rem"
                    >
                      {"Contact Us"}
                    </Typography>
                  </ButtonBase>

                  <ButtonBase>
                    <Typography
                      color={lightColor.text.primary}
                      fontSize={isMobile ? "0.8rem" : "1rem"}
                      fontStyle="normal"
                      fontWeight={isMobile ? "400" : "500"}
                      lineHeight="normal"
                      letterSpacing="0.05rem"
                    >
                      {"Track Order"}
                    </Typography>
                  </ButtonBase>
                </Box>
              </Box>
            </PageSpacing>
          </Box>
          <Box width="100%" height="3rem"></Box>
        </>
      )}
    </>
  );
};

export default Index;
