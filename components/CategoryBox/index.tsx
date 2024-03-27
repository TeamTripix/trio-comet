import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/legacy/image";
import { lightColor, darkColor } from "@/utils/CustomTheme/color";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";

interface categoryCardProps {
  data: any;
}
const CategoryCard = (props: categoryCardProps) => {
  const { name, _id, image } = props.data;
  const theme: any = useSelector<any>((state) => state.themeToggle);
  return (
    <Link href={`/category/${name}?pid=${_id}`}>
      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        gap="2.4rem"
        maxWidth="20rem"
        minWidth="20rem">
        <Box width="6rem" height="6rem">
          <img
            src={image}
            alt="catImage"
            width="60"
            height="60"
            // layout="fill"
            // layout="responsive"
            style={{ borderRadius: "50%" }}
          />
        </Box>
        <Box
        // bgcolor="yellow"
        // overflow="hidden"
        >
          <Typography
            variant="h1"
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
            {name}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

const Index = () => {
  const [categoryApiRes, setCategoryApiRes] = useState<any[]>([]);

  useEffect(() => {
    // get category api
    axios({
      method: "GET",
      url: "/api/category",
    })
      .then((res) => {
        setCategoryApiRes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box display="flex" justifyContent="center">
      <Box padding="0rem 8.4rem 0rem 4.9rem" zIndex="999" top="80px">
        <Box margin="4rem">
          <Grid container spacing={4}>
            {categoryApiRes.map((data, index) => {
              return (
                <Grid width="30rem" key={`${index}+catCard`} item>
                  <CategoryCard data={data} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
