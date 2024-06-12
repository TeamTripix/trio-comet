"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import { Box, ButtonBase, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import EditIcon from "../../../icons/editIcon";
import FileOrderIcon from "../../../icons/fileOrderIcon";
import LocationIcon from "../../../icons/locationIcon";
import Logout from "../../../icons/logout";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";

const SecuredComponent = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [number,setNumber] = useState("")
  const theme: any = useSelector<any>((state) => state.themeToggle);
  const handleLogout = () => {
    signOut();
  };
  const session: any = useSession();
  console.log(session)

  useEffect(()=>{
    axios({
      method: "GET",
      url: `/api/user-info`,
      headers: {
        Authorization: `Bearer ${session.data.user.token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setName(res.data.data.name)
          setEmail(res.data.data.email)
          setNumber(res.data.data.number)
          // if (!res.data.data[0]._id) {
          //   return;
          // }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[])
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      margin="15rem 0"
    >
      {/* <Box height="11rem" width="11rem" borderRadius="20rem">
        <Image
        src="/assets/productImages/84756fv84f6h73/1.png"
        loading="lazy"
        alt="profile thumbnail"
        width={"110"}
        height={"110"}
        style={{ borderRadius: "20rem" }}
      />
      </Box>
      <Box>
        <Typography
          color={lightColor.text.link}
          textAlign="center"
          fontSize="1.4rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="2.4rem"
          letterSpacing="0.05rem"
          sx={{
            textDecoration: "underline",
          }}
        >
          Edit
        </Typography>
      </Box> */}
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        gap="2.4rem"
      >
        <Typography
          color={theme==="light" ? lightColor.text.primary: darkColor.text.primary}
          textAlign="center"
          fontSize="1.6rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="2.4rem"
          letterSpacing="0.05rem"
        >
          {name}
        </Typography>
        <ButtonBase>
          <EditIcon />
        </ButtonBase>
      </Box>
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        gap="2.4rem"
      >
        <Typography
          color={theme==="light" ? lightColor.text.secondary: darkColor.text.secondary}
          textAlign="center"
          fontSize="1.6rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="2.4rem"
          letterSpacing="0.05rem"
        >
          {email}
        </Typography>
        <ButtonBase>
          <EditIcon />
        </ButtonBase>
      </Box>
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        gap="2.4rem"
      >
        <Typography
          color={theme==="light" ? lightColor.text.secondary: darkColor.text.secondary}
          textAlign="center"
          fontSize="1.6rem"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="2.4rem"
          letterSpacing="0.05rem"
        >
          +91{number}
        </Typography>
        <ButtonBase>
          <EditIcon />
        </ButtonBase>
      </Box>
      <Box
        display="inline-flex"
        alignItems="flex-start"
        gap="10rem"
        margin="3rem 0"
      >
        <Box
          display="flex"
          width="16rem"
          padding="1.6rem"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2.4rem"
          borderRadius="0.8rem"
          border="1px solid var(--back-button, #9B9B9B)"
        >
          <FileOrderIcon />
          <Typography
            color={theme==="light" ? lightColor.text.primary: darkColor.text.primary}
            textAlign="center"
            fontSize="1.6rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.05rem"
          >
            My Orders
          </Typography>
        </Box>

        <Box
          display="flex"
          width="16rem"
          padding="1.6rem"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2.4rem"
          borderRadius="0.8rem"
          border="1px solid var(--back-button, #9B9B9B)"
        >
          <Box>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.41675 16.7163C5.41675 12.2155 9.36532 8.75 14.0001 8.75C16.3892 8.75 18.4915 9.87023 20.0001 11.3197C21.5087 9.87023 23.611 8.75 26.0001 8.75C30.6348 8.75 34.5834 12.2155 34.5834 16.7163C34.5834 19.7994 33.2686 22.5107 31.447 24.8026C29.6286 27.0904 27.25 29.0322 24.9725 30.61C24.1026 31.2126 23.2226 31.7685 22.4172 32.1787C21.6609 32.5638 20.7913 32.9167 20.0001 32.9167C19.2088 32.9167 18.3392 32.5638 17.583 32.1787C16.7775 31.7685 15.8975 31.2126 15.0276 30.61C12.7502 29.0322 10.3715 27.0904 8.55312 24.8026C6.73155 22.5107 5.41675 19.7994 5.41675 16.7163ZM14.0001 11.25C10.5347 11.25 7.91675 13.7985 7.91675 16.7163C7.91675 19.0555 8.90973 21.2333 10.5102 23.247C12.1139 25.2647 14.2716 27.0449 16.4513 28.5549C17.2761 29.1263 18.053 29.6125 18.7175 29.951C19.4312 30.3144 19.8445 30.4167 20.0001 30.4167C20.1556 30.4167 20.569 30.3144 21.2827 29.9509C21.9472 29.6125 22.7241 29.1263 23.5488 28.5549C25.7285 27.0449 27.8863 25.2647 29.4899 23.247C31.0904 21.2333 32.0834 19.0555 32.0834 16.7163C32.0834 13.7985 29.4655 11.25 26.0001 11.25C24.0098 11.25 22.1514 12.439 20.991 13.9482C20.7544 14.2559 20.3883 14.4363 20.0001 14.4363C19.6119 14.4363 19.2458 14.2559 19.0091 13.9482C17.8488 12.439 15.9903 11.25 14.0001 11.25Z"
                fill="black"
              />
            </svg>
          </Box>
          <Typography
            color={theme==="light" ? lightColor.text.primary: darkColor.text.primary}
            textAlign="center"
            fontSize="1.6rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.05rem"
          >
            Favourite
          </Typography>
        </Box>

        <Box
          display="flex"
          width="16rem"
          padding="1.6rem 1.5rem"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2.4rem"
          borderRadius="0.8rem"
          border="1px solid var(--back-button, #9B9B9B)"
        >
          <LocationIcon />
          <Typography
            color={theme==="light" ? lightColor.text.primary: darkColor.text.primary}
            textAlign="center"
            fontSize="1.6rem 1.5rem"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            letterSpacing="0.05rem"
          >
            Manage address
          </Typography>
        </Box>
      </Box>
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="center"
        gap="3.2rem"
        marginTop="10rem"
        onClick={handleLogout}
        sx={{
          cursor: "pointer",
        }}
      >
        <Logout />
        <Typography
          color="#F00"
          textAlign="center"
          fontSize="3.2rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="2.4rem"
          letterSpacing="0.05rem"
        >
          Logout
        </Typography>
      </Box>
    </Box>
  );
};
const Page = () => {
  const session = useSession();
  if (session.status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (session.status === "unauthenticated") {
    redirect("/");
  }

  return <SecuredComponent />;
};

export default Page;
