import { Html, Head, Main, NextScript } from "next/document";
const myDocument = () => {
  return (
    <Html className='dark'>
      <Head />
      <body className=' dark:bg-black dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default myDocument;