import React from "react";
import Mainpage from "./Mainpage";
import type { Metadata } from "next";
import { apiClient } from "../utils/axiosMiddleware";

export const metadata = {
  title: "Product",
  openGraph: {
    title: "Product",
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
  console.log(category)
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
