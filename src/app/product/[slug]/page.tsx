import React from "react";
import Mainpage from "./Mainpage";
import type { Metadata } from "next";
import { apiClient } from "../../../utils/axiosMiddleware";

export const metadata = {
  title: "Product",
  openGraph: {
    title: "Product",
  },
};

const Page = async ({ params }: { params: { slug: string } }) => {
  let product = await apiClient.get(`/api/product?slug=${params.slug}`);
  let combo = await apiClient.get(`/api/product?tag=combo`);
  let categoryRelatedProduct = await apiClient.get(
    `/api/product/?category=${product.data.category}`
  );
  let productCoupon = await apiClient.get(
    `/api/coupon/?pid=${product.data._id}`
  );
  let productReview = await apiClient.get(`/api/review?id=${product.data._id}`);
  return (
    <Mainpage
      params={params}
      product={product}
      combo={combo}
      categoryRelatedProduct={categoryRelatedProduct}
      productCoupon={productCoupon}
      productReview={productReview}
    />
  );
};
export default Page;
