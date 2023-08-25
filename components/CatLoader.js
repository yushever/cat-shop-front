import styled, { keyframes } from "styled-components";
import Cat from "./icons/Cat";

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
      <Cat />
    </Loader>
  );
}
