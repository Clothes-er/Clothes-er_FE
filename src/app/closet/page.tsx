"use client";

import Topbar from "@/components/common/Topbar";
import styled from "styled-components";
import Header from "@/components/common/Header";
import Tabbar from "@/components/common/Tabbar";
import ListTab from "@/components/common/ListTab";

const ClosetPage = () => {
  return (
    <>
      <Contain>
        <Layout>
          <Header />
          <Topbar text="옷장 구경" align="left" />
          <Content>
            <ListTab listType="closet" />
          </Content>
        </Layout>
      </Contain>
      <Tabbar />
    </>
  );
};

export default ClosetPage;

const Contain = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Layout = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  overflow-x: hidden;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
