// components/Seo.js
"use client"
import Head from 'next/head';

const Seo = (props:any) => {
    const { title, description, keywords, author } = props
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Seo;