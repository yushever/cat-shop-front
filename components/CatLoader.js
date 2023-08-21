import { cat } from "../public/cat.png";
import Image from "next/image";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  animation: ${rotate} 1s linear infinite;
`;

export default function CatLoader() {
  return (
    <Loader>
      <Image width="50" height="50" src="/../public/cat.png" alt="">
        {cat}
      </Image>
    </Loader>
  );
}
