import React from "react";
import Mainpage from "./Mainpage";
import type { Metadata } from "next";
import { apiClient } from "../utils/axiosMiddleware";

export const metadata = {
  title: "Online Fashion Shopping for Men | Buy Mens Clothing – Triocomet",
  description:"The hottest trends in men's fashion at Triocomet. Shop stylish, Online fashion shopping for men. Shop now and stand out. ✔ Free Shipping ✔ COD Available!",
  openGraph: {
    title: "Online Fashion Shopping for Men | Buy Mens Clothing – Triocomet",
    description:"The hottest trends in men's fashion at Triocomet. Shop stylish, Online fashion shopping for men. Shop now and stand out. ✔ Free Shipping ✔ COD Available!",
  },
};

const Page = async ({ params }: { params: { slug: string } }) => {
  let banner = await apiClient.get(`/api/banner`);
  let onSale = await apiClient.get(`/api/product/?on-sale=true`);
  let dailyDeals = await apiClient.get(`/api/daily-deals-product`);
  let bestSeller = await apiClient.get(`/api/product/?tag=best_seller`);
  let newArrival = await apiClient.get(`/api/product/?tag=new_arrivals`);
  let category = await apiClient.get(`/api/category`);
  let blog = await apiClient.get(`/api/blog`);
  return (
    <Mainpage
    banner={banner}
    onSale={onSale}
    dailyDeals={dailyDeals}
    bestSeller={bestSeller}
    newArrival={newArrival}
    category={category}
    blog={blog}
    />
  );
};
export default Page;
