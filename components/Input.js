import styled from "styled-components";

const StyledInput = styled.input`
  width: 97%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: inherit;
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
