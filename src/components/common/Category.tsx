import Chip from "./Chip";
import styled from "styled-components";

const Category = () => {
  const filter = ["성별", "카테고리", "스타일"];
  return (
    <Layout>
      {filter.map((data, index) => (
        <Chip key={index} label={data} value={data} />
      ))}
    </Layout>
  );
};

export default Category;

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 5px;
`;
