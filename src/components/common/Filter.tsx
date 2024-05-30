import React from "react";
import Chip from "./Chip";
import styled from "styled-components";

const Filter = () => {
  const filter = ["정렬", "성별", "키·연령", "카테고리", "스타일"];
  return (
    <Layout>
      {filter.map((data, index) => (
        <Chip key={index} label={data} value={data} />
      ))}
    </Layout>
  );
};

export default Filter;

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5px;
`;
