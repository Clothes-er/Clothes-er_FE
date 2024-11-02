"use client";

import Topbar from "@/components/common/Topbar";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Header from "@/components/common/Header";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import NotiBox from "@/components/notification/NotiBox";
import { getNotificationList } from "@/api/notifications";

interface NotiList {
  id: number;
  image: string | null;
  title: string;
  content: string;
  type: string;
  sourceId: string;
  isRead: boolean;
}

const Notification = () => {
  const [notiList, setNotiList] = useState<NotiList[] | null>();
  const [notiCount, setNotiCount] = useState<number>(0);

  useEffect(() => {
    const fetchNotificationList = async () => {
      const response = await getNotificationList();
      console.log(response);
      setNotiList(response.result.notificationList);
      setNotiCount(response.result.countOfNotReadNotifications);
    };

    fetchNotificationList();
  }, []);

  return (
    <>
      <Contain>
        <Layout>
          <Header />
          <Topbar text={`알림 (${notiCount})`} align="left" icon={true} />
          <Content>
            {notiList && notiList.length > 0 ? (
              <Notis>
                {notiList?.map((data, index) => (
                  <NotiContainer key={data.id}>
                    <NotiBox
                      key={data.id}
                      id={data.id}
                      image={data.image}
                      title={data.title}
                      content={data.content}
                      type={data.type}
                      sourceId={data.sourceId}
                      isRead={data.isRead}
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
