import styled from "styled-components";
import { ButtonStyle } from "./Button";
import { primary } from "@/lib/colors";
import { useContext, useEffect, useState, useRef } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
    font-size: 16px;
    ${(props) =>
      props.main
        ? `
        background-color: ${primary};
        color: white
    `
        : `
        background-color: transparent;
        border: 1px solid ${primary};
        color: ${primary};
    `}
    ${(props) =>
      props.white &&
      `
      background-color: white;
      border: 1px solid white;
      `}
  }
  @keyframes fly {
    100% {
      top: 0;
      left: 80%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  img {
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    display: none;
    animation: fly 1s;
    z-index: 5;
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();

  function sendImageToCart(e) {
    imgRef.current.style.display = "inline-block";
    imgRef.current.style.left = e.clientX - 50 + "px";
    imgRef.current.style.top = e.clientY - 50 + "px";
    setTimeout(() => {
      imgRef.current.style.display = "none";
    }, 1000);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current.closest("div[data-sr-id]");
      if (reveal.style.opacity === "1") {
        reveal.style.transform = "none";
        // imgRef.current.style.display = "none";
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlyingButtonWrapper
        main={props.main}
        white={props.white}
        onClick={() => addProduct(props._id)}>
        <img src={props.src} alt="" ref={imgRef} />
        <button onClick={(e) => sendImageToCart(e)} {...props}></button>
      </FlyingButtonWrapper>
    </>
  );
}
