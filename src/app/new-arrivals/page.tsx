import React from "react";
import Mainpage from "./Mainpage";

export const metadata = {
  title: "Combo",
  openGraph: {
    title: "Combo",
  },
};

export const dynamic = "force-dynamic"

const Page = async ({ params }: { params: { slug: string } }) => {

    let productRes = await fetch(`${process.env.NEXTAUTH_URL}/api/product/?tag=new-drop`);
    let product = await productRes.json()
  return (
    <Mainpage params={params} product={product}/>
    // <></>
  );
};
export default Page;
