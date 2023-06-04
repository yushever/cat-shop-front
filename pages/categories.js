import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 0px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #555;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;
const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
  return (
    <>
      <Header />
      <Center>
        {" "}
        <Title>All categories</Title>
        {mainCategories.map((category) => (
          <CategoryWrapper key={category.name}>
            <CategoryTitle>
              <h2>{category.name[0].toUpperCase() + category.name.slice(1)}</h2>
              <div>
                <Link href={"/category/" + category._id}>Show all</Link>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {categoriesProducts[category._id].map((p, index) => (
                <RevealWrapper key={p.title} delay={50 * index}>
                  <ProductBox {...p} />
                </RevealWrapper>
              ))}
              <RevealWrapper
                delay={categoriesProducts[category._id].length * 50}>
                {" "}
                <ShowAllSquare href={"/category/" + category._id}>
                  Show all &rarr;
                </ShowAllSquare>
              </RevealWrapper>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find();
  const mainCategories = categories.filter((category) => !category.parent);
  const categoriesProducts = {};
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}
