import React from 'react'
import Mainpage from './Mainpage'
import type { Metadata } from 'next'
 
export const metadata = {
  title: 'Category',
  openGraph: {
    title: 'Category',
  },
}

const Page = ({ params }: { params: { slug: string } }) => {
  return (
    <Mainpage params={params}/>
  )
}

export default Page