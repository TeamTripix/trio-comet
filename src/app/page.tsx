import React from "react";
import Mainpage from "./Mainpage";
import { apiClient } from "../utils/axiosMiddleware";

export const metadata = {
  title: "Online Fashion Shopping for Men | Buy Mens Clothing – Triocomet",
  description: "The hottest trends in men's fashion at Triocomet. Shop stylish, Online fashion shopping for men. Shop now and stand out. ✔ Free Shipping ✔ COD Available!",
  openGraph: {
    title: "Online Fashion Shopping for Men | Buy Mens Clothing – Triocomet",
    description: "The hottest trends in men's fashion at Triocomet. Shop stylish, Online fashion shopping for men. Shop now and stand out. ✔ Free Shipping ✔ COD Available!",
  },
};

const Page = async ({ params }: { params: { slug: string } }) => {
  let banner = await apiClient.get(`/api/banner`);
  let newDrop = await apiClient.get(`/api/product/?tag=new-drop`);
  let trending = await apiClient.get(`/api/product/?tag=trending`);
  let bestSeller = await apiClient.get(`/api/product/?tag=best-seller`);
  let newArrival = await apiClient.get(`/api/product/?tag=new-drop`);
  let category = await apiClient.get(`/api/category`);
  console.log(category)
  let blog = await apiClient.get(`/api/blog`);
  return (
    <Mainpage
      banner={banner}
      newDrop={newDrop}
      trending={trending}
      bestSeller={bestSeller}
      newArrival={newArrival}
      category={category}
      blog={blog}
      // isMobile={mobile}
      // isTablet={tablet}
    />
  );
};
export default Page;
