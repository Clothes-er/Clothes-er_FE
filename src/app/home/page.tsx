"use client";

import Topbar from "@/components/common/Topbar";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/styles/theme";
import Header from "@/components/common/Header";
import Filter from "@/components/common/Filter";

const Home = () => {
  return (
    <Layout>
      <Header />
      <Topbar text="홈" align="left" />
      <div>
        <Row>
          <Image
            src="/assets/icons/ic_pin.svg"
            width={24}
            height={24}
            alt="pin"
          />
          강남구 역삼로 150길
        </Row>
        <SearchBox placeholder="원하는 상품명을 검색하세요!"></SearchBox>
        <Filter />
      </div>
    </Layout>
  );
};

export default Home;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 23px;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const SearchBox = styled.input`
  width: 283px;
  height: 50px;
  padding: 16px 20px;
  border-radius: 5px;
  border: none;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 30px 5px rgba(149, 149, 149, 0.25);
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.gray500};
    ${(props) => props.theme.fonts.b2_medium};
  }
`;
