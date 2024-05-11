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
import Image from "next/image";
interface Product {
  id: number;
  name: string;
  image: string;
  discountPrice: number;
  price: number;
  productColor: Array<any>;
}

function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

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
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/category",
    })
      .then((res) => {
        // console.log('category response', res.data.data);
        setCategoryApiRes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => { }, [setSearchResult, searchInputText, setSeachApiRes]);

  const handleInput = (data: string) => {
    setSearchInputText(data);
    router.push(`?category=${categorySelector}&query=${data}`);
  };

  const handleChangeCategory = (data: any) => {
    setCategorySelector(data);
    router.push(`?category=${data}&query=${searchInputText}`);
  };

  useEffect(() => {
    const delay = 300;
    const timerId = setTimeout(() => {
      if (searchInputText.trim() !== "") {
        fetchSuggestions(searchInputText);
      } else {
        setSuggestions([]);
      }
    }, delay);

    return () => clearTimeout(timerId);
  }, [searchInputText, categorySelector]);

  const handleSuggestionClick = (item: any) => {
    setSearchInputText(item.name);
    router.push(`?category=${categorySelector}&query=${item.name}`);
    setSuggestions([]);
    setSearchInputText("");
  };

  const debouncedSearch = debounce((query: string) => {
    axios({
      method: "GET",
      url: `/api/search/?category=${categorySelector}&query=${query}`,
    })
      .then((res) => {
        const products: Product[] = res.data.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
        }));
        setSuggestions(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 300);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`/api/search/?category=${categorySelector}&query=${query}`);
      const products: Product[] = response.data.data.map((product: any) => ({
        id: product._id,
        name: product.name,
        image: product.descImage.descItems[0].imageURL,
        discountPrice: product.discountPrice,
        price: product.price,
        productColor: product.productColor,
      }));
      setSuggestions(products);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSeeAllSuggestionsClick = () => {
    dispatch({ type: "TOGGLE", payload: { toggle: toggleState } })
    setSearchInputText("");
    setSuggestions([]);
  };

  return (
    <>
      <Box
        position="relative"
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
            placeholder="search by product, category or collection"
            style={{
              color:
                theme === "light"
                  ? lightColor.text.secondary
                  : darkColor.text.secondary,
              backgroundColor:
                theme === "light" ? lightColor.search : darkColor.search,
              fontSize: "1.1rem",
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
        <Box
          width="100%"
          position="absolute"
          top="calc(100% + 0.5rem)"
          right="0rem"
          bgcolor={theme === "light" ? lightColor.search : darkColor.search}
          borderRadius="1rem"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          zIndex={1000}
        >
          {suggestions.slice(0, 5).map((item) =>{
            console.log(item)
            return(
              <Link href={`/product/${item.productColor[0].slug}`}>
                <MenuItem key={item.id} onClick={() => handleSuggestionClick(item)}>
                  <Box display="flex" alignItems="center">
                    <Image src={item.productColor[0].imageURL[0]} alt={item.name} width="75" height="75" style={{margin:'1rem'}} />
                    <div>
                      <div>{item.name}</div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ textDecoration: "line-through", marginRight: "5px" }}>₹{item.price}</div>
                        <div style={{}}> ₹{item.discountPrice}</div>
                      </div>
                    </div>
                  </Box>
                </MenuItem>
              </Link>
            )
          })}
          {suggestions.length > 5 && (
            <Link href={`/search?category=${categorySelector}&query=${searchInputText}`}>
              <MenuItem style={{ display: "flex", justifyContent: "center", cursor: "pointer" }} onClick={handleSeeAllSuggestionsClick}>
                See all suggestions
              </MenuItem>
            </Link>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Index;
