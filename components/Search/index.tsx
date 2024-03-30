"use client";
import React, { useEffect, useState } from "react";
import { Box, FormControl, Select, MenuItem, ButtonBase } from "@mui/material";
import { darkColor, lightColor } from "@/utils/CustomTheme/color";
import SearchIcon from "../../icons/searchIcon";
import { useRouter } from "next/navigation";
import { useMobile } from "@/utils/responsive";
import axios from "axios";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Index = () => {
  const [categorySelector, setCategorySelector] = useState("all");
  const [seachApiRes, setSeachApiRes] = useState([]);
  const [searchInputText, setSearchInputText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [categoryApiRes, setCategoryApiRes] = useState([]);
  const isMobile = useMobile();
  const router = useRouter();
  const dispatch = useDispatch();
  const toggleState = useSelector((state: any) => state.searchToggle);
  const theme: any = useSelector<any>((state) => state.themeToggle);

  useEffect(() => {
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

  useEffect(() => {}, [setSearchResult, searchInputText, setSeachApiRes]);

  const handleInput = (data: any) => {
    setSearchInputText(data);
    router.push(`?category=${categorySelector}&query=${data}`);
  };

  const handleChangeCategory = (data: any) => {
    setCategorySelector(data);
    router.push(`?category=${data}&query=${searchInputText}`);
  };

  return (
    <>
      <Box
        bgcolor={theme === "light" ? lightColor.search : darkColor.search}
        borderRadius="1.2rem"
        border={`0.5px solid ${
          theme === "light" ? lightColor.borderColor : darkColor.borderColor
        }`}
        display="flex"
        width={isMobile ? "100%" : "60rem"}
        height="4rem"
        padding="1rem 0rem 1rem 2rem"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <FormControl
            sx={{ margin: "0 1rem", width: "20rem" }}
            variant="standard"
            fullWidth
            size="small"
          >
            <Select
              disableUnderline
              value={categorySelector}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="All Category"
              sx={{
                color:
                  theme === "light"
                    ? lightColor.text.primary
                    : darkColor.text.primary,
              }}
              onChange={(e) => handleChangeCategory(e.target.value)}
            >
              <MenuItem
                sx={{
                  color:
                    theme === "light"
                      ? lightColor.text.primary
                      : darkColor.text.primary,
                  "& .MuiMenu-root ul": {
                    color:
                      theme === "light"
                        ? lightColor.text.chevron
                        : darkColor.text.chevron,
                  },
                }}
                value={"all"}
              >
                All Category
              </MenuItem>
              {categoryApiRes.map((data: any) => {
                return (
                  <MenuItem
                    sx={{
                      color:
                        theme === "light"
                          ? lightColor.text.primary
                          : darkColor.text.primary,
                      "& .MuiMenu-root ul": {
                        color:
                          theme === "light"
                            ? lightColor.text.primary
                            : darkColor.text.primary,
                      },
                    }}
                    key={data._id}
                    value={data._id}
                  >
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          width="0.04rem"
          height="2.5rem"
          bgcolor={
            theme === "light"
              ? lightColor.text.secondary
              : darkColor.text.secondary
          }
          margin="0 2rem"
        ></Box>
        <Box width="55%" height="3.9rem" display="flex" alignItems="center">
          <input
            placeholder="Search..."
            style={{
              color:
                theme === "light"
                  ? lightColor.text.secondary
                  : darkColor.text.secondary,
              backgroundColor:
                theme === "light" ? lightColor.search : darkColor.search,
              fontSize: "1.4rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "2.4rem",
              letterSpacing: "0.05rem",
              border: "none",
              outline: "none",
              width: isMobile ? "100%" : "35rem",
              zIndex: "9999",
            }}
            onChange={(e: any) => handleInput(e.target.value)}
          />
          <Link
            href={`/search?category=${categorySelector}&query=${searchInputText}`}
          >
            <ButtonBase
              onClick={() =>
                dispatch({ type: "TOGGLE", payload: { toggle: toggleState } })
              }
              sx={{
                right: "-1px",
                display: "flex",
                width: "5.4rem",
                height: "4rem",
                padding: "1.1875rem 0rem 1.1125rem 0rem",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                borderRadius: "0rem 1.2rem 1.2rem 0rem",
                background:
                  theme === "light"
                    ? lightColor.text.chevron
                    : darkColor.text.chevron,
              }}
            >
              <SearchIcon color="white" height="17" width="16" />
            </ButtonBase>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Index;
