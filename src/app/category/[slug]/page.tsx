import React from "react";
import Mainpage from "./Mainpage";
import type { Metadata } from "next";
import { apiClient } from "../../../utils/axiosMiddleware";

export const metadata = {
  title: "Category",
  openGraph: {
    title: "Category",
  },
};

const Page = async ({ params }: { params: { slug: string } }) => {
    let response = await apiClient.get(`/api/category/?cid=${params.slug}`);
    let product = await apiClient.get(`/api/product/?category=${response.data[0]._id}`);
  return (
    <Mainpage params={params} product={product} categoryName={response.data[0].name}/>
    // <></>
  );
};
export default Page;
