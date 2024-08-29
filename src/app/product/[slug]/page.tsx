import React from "react";
import Mainpage from "./Mainpage";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }:any) {
  const metadata = await getMetadata(params);
  return metadata;
}

async function getMetadata(params:any) {
  let productRes = await fetch(
    `http://localhost:3000/api/product?slug=${params.slug}`
  );
  let product = await productRes.json();
  return {
    title: product.data.specificationItems?.pageTitle ? product.data.specificationItems.pageTitle  : "" ,
    description: product.data.specificationItems?.pageDesc ? product.data.specificationItems.pageDesc : "",
    keywords: product.data.specificationItems?.pageKeywords ? product.data.specificationItems.pageKeywords : "",
  };
}



const Page = async ({ params }: { params: { slug: string } }) => {
  let productRes = await fetch(
    `http://localhost:3000/api/product?slug=${params.slug}`
  );
  let product = await productRes.json();

  let comboRes = await fetch(`http://localhost:3000/api/product?tag=combo`);
  let combo = await comboRes.json();

  let categoryRelatedProductRes = await fetch(
    `http://localhost:3000/api/product/?category=${product.data.category}`
  );
  let categoryRelatedProduct = await categoryRelatedProductRes.json();

  let productCouponRes = await fetch(
    `http://localhost:3000/api/coupon/?pid=${product.data._id}`
  );
  let productCoupon = await productCouponRes.json();

  let productReviewRes = await fetch(
    `http://localhost:3000/api/review?id=${product.data._id}`
  );
  let productReview = await productReviewRes.json();
  const jsonLd = {
    "@context": "https://schema.org/", 
    "@type": "Product", 
    name: product.data.name,
    image: product.data.productColor[0].imageURL[0],
    description: product.data.description,
    brand: {
      "@type": "Brand",
      name: "Triocomet"
    },
    sku: product.data.productColor[0].size[0].sku,
    offers: {
      "@type": "AggregateOffer",
      url: `https://www.triocomet.com/product/${product.data.productColor[0].slug}`,
      priceCurrency: "INR",
      lowPrice: product.data.discountPrice,
      highPrice: product.data.price
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "3",
    ratingCount: "20"
    }
  }
  

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <Mainpage
      params={params}
      product={product}
      combo={combo}
      categoryRelatedProduct={categoryRelatedProduct}
      productCoupon={productCoupon}
      productReview={productReview}
      />
      </>
  );
};
export default Page;
