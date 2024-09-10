import React from "react";
import Mainpage from "./Mainpage";

export async function generateMetadata({ params }: any) {
  const metadata = await getMetadata(params);
  return metadata;
}

async function getMetadata(params: any) {
  return {
    title: "Online Fashion Shopping for Men | Buy Mens Clothing – Triocomet",
    description: "The hottest trends in men's fashion at Triocomet. Shop stylish, Online fashion shopping for men. Shop now and stand out. ✔ Free Shipping ✔ COD Available!",
    keywords: "tee shopping, t shirt wear, wear t shirt, funky design t shirts, white design t shirt, buy cotton t shirts, black design t shirt, anime tshirts, tshirt design for men, t shirts for men, best cotton t shirts, high quality men's t shirts, cotton tshirts for men, best cotton t shirts for men, good quality men's t shirts, printed tees mens, oversized mens t shirt",
  };
}

export const dynamic = "force-dynamic"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Triocomet",
  "alternateName": "Triocomet",
  "url": "https://www.triocomet.com/",
  "logo": "https://www.triocomet.com/_next/image?url=%2Fassets%2Flogo%2Flogo-light.png&w=1920&q=75",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91 9650001541",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["en", "Hindi"]
  },
  "sameAs": [
    "https://www.facebook.com/triocometcom",
    "https://x.com/triocomet",
    "https://www.instagram.com/triocomet/",
    "https://in.pinterest.com/triocometcom/"
  ]
}

const Page = async ({ params }: { params: { slug: string } }) => {
  let bannerRes = await fetch(`${process.env.NEXTAUTH_URL}/api/banner`);
  let banner = await bannerRes.json()

  let newDropRes = await fetch(`${process.env.NEXTAUTH_URL}/api/product/?tag=new-drop`);
  let newDrop = await newDropRes.json()

  let trendingRes = await fetch(`${process.env.NEXTAUTH_URL}/api/product/?tag=trending`);
  let trending = await trendingRes.json()

  let bestSellerRes = await fetch(`${process.env.NEXTAUTH_URL}/api/product/?tag=best-seller`);
  let bestSeller = await bestSellerRes.json()

  let newArrivalRes = await fetch(`${process.env.NEXTAUTH_URL}/api/product/?tag=new-drop`);
  let newArrival = await newArrivalRes.json()

  let categoryRes = await fetch(`${process.env.NEXTAUTH_URL}/api/category`);
  let category = await categoryRes.json()

  let blogRes = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`);
  let blog = await blogRes.json()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
};
export default Page;
