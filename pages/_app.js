import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { CartContextProvider } from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
  body{
    padding:0;
    margin:0;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        />
      </Helmet>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
