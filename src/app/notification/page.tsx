"use client";

import Topbar from "@/components/common/Topbar";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Header from "@/components/common/Header";
import { Suspense, useEffect, useState } from "react";
import { useRequireAuth } from "@/hooks/useAuth";
import Loading from "@/components/common/Loading";
import AlertTest from "@/components/common/AlertTest";
import NotiBox from "@/components/notification/NotiBox";

interface NotiList {
  id: number;
  type: string;
  url: string;
  content: string;
  image: string;
}

const Notification = () => {
  useRequireAuth();

  const [notiList, setNotiList] = useState<NotiList[]>([
    { id: 0, type: "팔로우", image: "", url: "", content: "신고 어쩌고" },
    {
      id: 1,
      type: "신고",
      image: "",
      url: "",
      content: "빈티지걸 님이 접수하신 신고 내용이 처리 중이에요!",
    },
    {
      id: 2,
      type: "팔로우",
      image: "",
      url: "",
      content: "빈티지걸 님이 러블리걸 님을 팔로우 하였습니다.",
    },
  ]);

  useEffect(() => {}, []);

  return (
    <>
      <Contain>
        <Layout>
          <Header />
          <Topbar text="알림" align="left" icon={true} />
          <AlertTest />
          <Content>
            {notiList && notiList.length > 0 ? (
              <Notis>
                {notiList?.map((data, index) => (
                  <NotiContainer key={data.id}>
                    <NotiBox
                      key={data.id}
                      id={data.id}
                      type={data.type}
                      image={data.image}
                      url={data.url}
                      content={data.content}
                    />
                    {index < notiList.length - 1 && <Divider />}
                  </NotiContainer>
                ))}
              </Notis>
            ) : (
              <NoData>알림이 없습니다.</NoData>
            )}
          </Content>
        </Layout>
      </Contain>
    </>
  );
};

export default function NotificationPaging() {
  return (
    <Suspense fallback={<Loading />}>
      <Notification />
    </Suspense>
  );
}

const Contain = styled.div`
  width: 100%;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Notis = styled.div`
  width: 100%;
`;

const NotiContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 0.5px;
  background-color: rgba(219, 219, 219, 0.7);
`;

const NoData = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${theme.colors.gray800};
  ${(props) => props.theme.fonts.b2_regular}

  @media screen and (max-width: 400px) {
    ${(props) => props.theme.fonts.b3_regular}
  }
`;
