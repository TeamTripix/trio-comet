import React from 'react'
import Mainpage from './Mainpage'
import type { Metadata } from 'next'
import { apiClient } from "../../../utils/axiosMiddleware"

export const metadata = {
  title: 'Category',
  openGraph: {
    title: 'Category',
  },
}

const Page = ({ params }: { params: { slug: string } }) => {
  const getProductByCategory: any = () => {
    let response
    apiClient.get(`/api/category/?cid=${params.slug}`).then(response => {
      response = response
    })
      .catch(error => {
        return error
      });
      return response
  }

  const product = getProductByCategory()
  console.log("pat : ", product)
  return (
    <Mainpage params={params} product={product} />
    // <></>
  )
}
export default Page