import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from "next-auth/react";

const GlobalStyles = createGlobalStyle`
  body{
    padding:0;
    margin:0;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
  }
  hr{
    border: 0;
    display: block;
    border-top: 1px solid #ccc;
  }
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      />
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
