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

export const dynamic = "force-dynamic"

const Page = async ({ params }: { params: { slug: string } }) => {
    let responseRes = await fetch(`${process.env.NEXTAUTH_URL}/api/category/?cid=${params.slug}`);
    let response = await responseRes.json()

    let productRes = await fetch(`${process.env.NEXTAUTH_URL}/api/product/?category=${response.data[0]._id}`);
    let product = await productRes.json()
  return (
    <Mainpage params={params} product={product} categoryName={response.data[0].name}/>
    // <></>
  );
};
export default Page;
