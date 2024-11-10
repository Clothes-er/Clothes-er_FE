"use client";

import Header from "@/components/common/Header";
import ListTab from "@/components/common/ListTab";
import Loading from "@/components/common/Loading";
import Topbar from "@/components/common/Topbar";
import { theme } from "@/styles/theme";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import styled from "styled-components";

const MyClosetFollow = () => {
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");

  return (
    <>
      <Layout>
        <Header />
        <Topbar text={nickname || "팔로우 목록"} icon={true} align="center" />
        <ListTab listType="follow" />
      </Layout>
    </>
  );
};

export default function MyClosetFollowPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MyClosetFollow />
    </Suspense>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: none;
  background: ${theme.colors.ivory};
  z-index: 1;
`;
