"use client";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import { useMobile } from "@/utils/responsive";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const [numberInputValue, setNumberInputValue] = useState("");
  const [openOTPDialogBox, setOpenOTPDialogBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [counter, setCounter] = useState(59);
  const [isPageLoad, setIsPageLoad] = useState(true);
  const isMobile = useMobile();
  const router = useRouter();
  const session: any = useSession();
  const theme: any = useSelector<any>((state) => state.themeToggle);

  useEffect(() => {
    if (session.status === "authenticated") {
      setIsPageLoad(false);
    } else if (session.status === "unauthenticated") {
      setIsPageLoad(false);
    }
  }, [session.status]);
  const handleSendOTPBtn = () => {
    setIsLoading(true);
    //   sendNumber(numberInputValue);
    axios({
      method: "post",
      url: "/api/send-otp",
      data: { number: numberInputValue },
    })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          setOpenOTPDialogBox(true);
          toast(response.data.message);
        } else {
          toast(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast("some error occured");
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleSendResendOtp = () => {
    setIsLoading(true);
    axios({
      method: "post",
      url: "/api/send-otp",
      data: { number: numberInputValue },
    })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          router.refresh();
          router.push("/");
          // openOTPDialogBox(true);
          toast(response.data.message);
        } else {
          toast(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast("some error occured");
        setIsLoading(false);
        console.log(err);
      });
  };
  const handleSumbitOTP = () => {
    setIsLoading(true);
    signIn("credentials", {
      OTP: otpValue,
      number: numberInputValue,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleInputNumber = (data: any) => {
    const regex = /^\d{0,10}$/;
    if (regex.test(data)) {
      setNumberInputValue(data);
    }
  };

  const handleEnterOTP = (data: any) => {
    const regex = /^\d{0,6}$/;
    if (regex.test(data)) {
      setOtpValue(data);
    }
  };

  if (isPageLoad) {
    return "";
  }
  if (session.status === "unauthenticated") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%">
        {openOTPDialogBox ? (
          <Box
            bgcolor={theme === "light" ? "#fff" : darkColor.cardBG}
            display="inline-flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingBottom="1.5rem"
            width={isMobile ? "30rem" : "57rem"}
            borderRadius="0.8rem"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px">
            <Box margin="2rem 0">
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "1.4rem" : "1.6rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem">
                OTP verification
              </Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
              //   width={isMobile ? "47%" : "65%"}
              padding="4rem">
              <Box
                bgcolor={theme === "light" ? "#fff" : darkColor.cardBG}
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap="0.8rem"
                width="100%">
                <Box marginBottom="2rem">
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary
                    }
                    textAlign="center"
                    fontSize={isMobile ? "1.2rem" : "1.4rem"}
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                    letterSpacing="0.05rem">
                    Enter the OTP sent to your Mobile Number
                  </Typography>
                </Box>
                <Box width="100%">
                  <TextField
                    sx={{
                      input: {
                        color:
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary,
                      },
                    }}
                    onChange={(e) => handleEnterOTP(e.target.value)}
                    value={otpValue}
                    placeholder="Enter here"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="0.8rem">
                <Typography
                  onClick={handleSendResendOtp}
                  color={
                    counter === 0
                      ? lightColor.text.link
                      : theme === "light"
                      ? lightColor.text.primary
                      : darkColor.text.primary
                  }
                  textAlign="center"
                  fontSize={isMobile ? "1rem" : "1.4rem"}
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="normal"
                  letterSpacing="0.05rem"
                  sx={{
                    cursor: counter === 0 ? "pointer" : "default",
                  }}>
                  Resend OTP
                </Typography>
                {counter === 0 ? (
                  ""
                ) : (
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.fade
                        : darkColor.text.fade
                    }
                    textAlign="center"
                    fontSize={isMobile ? "1rem" : "1.2rem"}
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                    letterSpacing="0.05rem">
                    {`in 00 : ${counter}`}
                  </Typography>
                )}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button
                  disabled={isLoading}
                  sx={{
                    width: isMobile ? "22rem" : "20rem",
                  }}
                  onClick={handleSumbitOTP}>
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary
                    }
                    textAlign="center"
                    fontSize={isMobile ? "1.2rem" : "1.6rem"}
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="normal"
                    letterSpacing="0.05rem">
                    {isLoading ? <CircularProgress size={25} /> : "Continue"}
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            bgcolor={theme === "light" ? "#fff" : darkColor.cardBG}
            display="inline-flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="4rem"
            padding={isMobile ? "4rem 2rem" : "4rem"}
            borderRadius="0.8rem"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            width={isMobile ? "30rem" : "57rem"}>
            <Box>
              <Typography
                color={
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary
                }
                textAlign="center"
                fontSize={isMobile ? "1.3rem" : "1.6rem"}
                fontStyle="normal"
                fontWeight="700"
                lineHeight="normal"
                letterSpacing="0.05rem">
                Please enter your Mobile Number
              </Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
              width={isMobile ? "100%" : "50%"}
              // width="20rem"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap="0.8rem"
                width="100%">
                <Box>
                  <Typography
                    color={
                      theme === "light"
                        ? lightColor.text.primary
                        : darkColor.text.primary
                    }
                    textAlign="center"
                    fontSize={isMobile ? "1.2rem" : "1.4rem"}
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                    letterSpacing="0.05rem">
                    Enter your Number
                  </Typography>
                </Box>
                <Box width="100%">
                  <TextField
                    sx={{
                      input: {
                        color:
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary,
                      },
                    }}
                    placeholder="Type here"
                    onChange={(e) => handleInputNumber(e.target.value)}
                    value={numberInputValue}
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <Typography
                          color={
                            theme === "light"
                              ? lightColor.text.primary
                              : darkColor.text.primary
                          }
                          paddingRight="2rem">
                          +91
                        </Typography>
                      ),
                    }}
                    size="small"
                    fullWidth
                  />
                </Box>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button
                  disabled={isLoading}
                  onClick={handleSendOTPBtn}
                  sx={{
                    width: isMobile ? "22rem" : "20rem",
                  }}>
                  <Typography
                    color={lightColor.text.primary}
                    textAlign="center"
                    fontSize={isMobile ? "1.2rem" : "1.6rem"}
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="normal"
                    letterSpacing="0.05rem">
                    {isLoading ? <CircularProgress size={25} /> : "Send OTP"}
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    );
  } else {
    redirect("/");
  }
};

export default Page;
