import styled from "styled-components";

const StyledOrder = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  time {
    font-size: 1rem;
    color: #555;
  }
`;
const ProductRow = styled.div`
  span {
    color: #888;
  }
`;
const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: #888;
`;

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <StyledOrder>
      <div>
        {" "}
        <time>{new Date(createdAt).toLocaleString("ru-RU")}</time>
        <Address>
          {rest.name} <br />
          {rest.email} <br />
          {rest.streetAddress} <br />
          {rest.postalCode} {rest.city}, {rest.country}
        </Address>
      </div>
      <div>
        {" "}
        {line_items.map((item) => (
          <ProductRow>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}
