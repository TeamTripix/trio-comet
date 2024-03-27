"use client";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import PageSpacing from "@components/PageSpacing";
import axios from "axios";

const Page = () => {
  const [aboutUsApiRes, setAboutUsApiRes] = useState<any>([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/api/about-us`,
    })
      .then((res) => {
        setAboutUsApiRes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {aboutUsApiRes.length === 0 ? (
        "loading..."
      ) : (
        <>
          <Box>
            <Image
              alt="about us banner"
              src={aboutUsApiRes[0].banner}
              layout="responsive"
              width="1510"
              height="540"
              style={{
                position: "relative",
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat",
              }}
            />
            {/* <Box
          height="54rem"
          width="100%"
          alignSelf="stretch"
          position="absolute"
          zIndex={999}
          style={{
            background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat",
          }}
        ></Box> */}
            {/* </Box> */}
            <PageSpacing>
              <Box>
              <Typography
                  dangerouslySetInnerHTML={{ __html: aboutUsApiRes[0].desc }}
                ></Typography>
              </Box>
            </PageSpacing>
          </Box>
        </>
      )}
    </>
  );
};

export default Page;
