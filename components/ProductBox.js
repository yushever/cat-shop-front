import styled from "styled-components";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";

const ProductWrapper = styled.div`
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;

  img {
    max-width: 100%;
    max-height: 80px;
  }
`;
const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;
const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;
const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 700;
    text-align: left;
  }
`;
const WishlistButton = styled.button`
  border: 0;
  background-color: transparent;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  ${(props) =>
    props.wished
      ? `
    color: red;
    `
      : `
      color: black;
      `}
  svg {
    width: 16px;
  }
`;

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);

  function addToWishlist(e) {
    e.stopPropagation();
    e.preventDefault();
    let next = !isWished;
    if (next === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWished(next);
  }
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <img src={images[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <FlyingButton _id={_id} src={images?.[0]}>
            Add to cart
          </FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
