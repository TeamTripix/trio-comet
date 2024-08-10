import React from "react";
import Mainpage from "./Mainpage";
export const metadata = {
  title: "Online Fashion Shopping for Men | Buy Mens Clothing – Triocomet",
  description: "The hottest trends in men's fashion at Triocomet. Shop stylish, Online fashion shopping for men. Shop now and stand out. ✔ Free Shipping ✔ COD Available!",
  // openGraph: {
  //   title: "Online Fashion Shopping for Men | Buy Mens Clothing – Triocomet",
  //   description: "The hottest trends in men's fashion at Triocomet. Shop stylish, Online fashion shopping for men. Shop now and stand out. ✔ Free Shipping ✔ COD Available!",
  // },
};

export const dynamic = "force-dynamic"

const Page = async ({ params }: { params: { slug: string } }) => {
  let bannerRes = await fetch(`http://localhost:3000/api/banner`);
  let banner = await bannerRes.json()

  let newDropRes = await fetch(`http://localhost:3000/api/product/?tag=new-drop`);
  let newDrop = await newDropRes.json()

  let trendingRes = await fetch(`http://localhost:3000/api/product/?tag=trending`);
  let trending = await trendingRes.json()

  let bestSellerRes = await fetch(`http://localhost:3000/api/product/?tag=best-seller`);  
  let bestSeller = await bestSellerRes.json()
  
  let newArrivalRes = await fetch(`http://localhost:3000/api/product/?tag=new-drop`);  
  let newArrival = await newArrivalRes.json()
  
  let categoryRes = await fetch(`http://localhost:3000/api/category`);  
  let category = await categoryRes.json()
  
  let blogRes = await fetch(`http://localhost:3000/api/blog`);  
  let blog = await blogRes.json()
  
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
