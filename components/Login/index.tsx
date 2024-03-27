import {
  Box,
  ButtonBase,
  TextField,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CancelIcon from "../../icons/cancelIcon";
import { darkColor, lightColor } from "@/utils/CustomTheme/color";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMobile } from "@/utils/responsive";
import { signIn } from "next-auth/react";
import { useSelector } from "react-redux";

interface Login {
  onClose: (value: string) => void;
}

interface InputNumberForm {
  openOTPDialogBox: (value: boolean) => void;
  sendNumber: (value: string) => void;
}

const InputNumberForm = (props: InputNumberForm) => {
  const [numberInputValue, setNumberInputValue] = useState("");
  const { openOTPDialogBox, sendNumber } = props;
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMobile();
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const handleSendOTPBtn = () => {
    setIsLoading(true);
    sendNumber(numberInputValue);
    axios({
      method: "post",
      url: "/api/send-otp",
      data: { number: numberInputValue },
    })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          openOTPDialogBox(true);
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
  return (
    <>
      <Box
        display="inline-flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="4rem"
        padding={isMobile ? "4rem 2rem" : "4rem"}>
        <Box>
          <Typography
            color="#000"
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
          width={isMobile ? "100%" : "50%"}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap="0.8rem"
            width="100%">
            <Box>
              <Typography
                color="#000"
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
                placeholder="Type here"
                onChange={(e) => setNumberInputValue(e.target.value)}
                type="number"
                InputProps={{
                  startAdornment: (
                    <Typography paddingRight="2rem">+91</Typography>
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
                {isLoading ? <CircularProgress size={25} /> : "Send OTP"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

interface OTPFromprops {
  numberValue: string;
}
const OTPForm = (props: OTPFromprops) => {
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(59);
  const theme: any = useSelector<any>((state) => state.themeToggle);
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);
  const router = useRouter();
  const isMobile = useMobile();

  const handleSendResendOtp = () => {
    setIsLoading(true);
    axios({
      method: "post",
      url: "/api/send-otp",
      data: { number: props.numberValue },
    })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          router.refresh();
          router.push("/");
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
      number: props.numberValue,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <Box
      display="inline-flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingBottom="1.5rem">
      <Box margin="2rem 0">
        <Typography
          color="#000"
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
        width={isMobile ? "47%" : "65%"}
        padding="4rem">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="0.8rem"
          width="100%">
          <Box marginBottom="2rem">
            <Typography
              color="#000"
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
              onChange={(e) => setOtpValue(e.target.value)}
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
                theme === "light" ? lightColor.text.fade : darkColor.text.fade
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
  );
};

const Index = (props: Login) => {
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [numberValue, setNumberValue] = useState("");
  const { onClose } = props;
  const isMobile = useMobile();
  const closeLoginDailogWithIcon = () => {
    onClose("close");
  };
  return (
    <>
      <Box
        width={isMobile ? "30rem" : "57.4rem"}
        borderRadius="0.8rem"
        bgcolor="#FFF"
        display="flex"
        flexDirection="column">
        <ButtonBase
          onClick={closeLoginDailogWithIcon}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            width: "100%",
            position: "absolute",
          }}>
          <CancelIcon />
        </ButtonBase>
        {!isOTPSend ? (
          <InputNumberForm
            openOTPDialogBox={setIsOTPSend}
            sendNumber={setNumberValue}
          />
        ) : (
          <OTPForm numberValue={numberValue} />
        )}
      </Box>
    </>
  );
};

export default Index;
