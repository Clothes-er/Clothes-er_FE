"use client";

import ListTab from "@/components/common/ListTab";
import Tabbar from "@/components/common/Tabbar";
import { useRequireAuth } from "@/hooks/useAuth";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Chat = () => {
  useRequireAuth();
  const router = useRouter();

  return (
    <>
      <Layout>
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Top>
          <Image
            src="/assets/icons/ic_arrow.svg"
            width={24}
            height={24}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          채팅
        </Top>
        <ListTab listType="chat" />
      </Layout>
      <Tabbar />
    </>
  );
};

export default Chat;

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  gap: 23px;
  position: relative;
`;

const Top = styled.div`
  width: calc(50% + 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.colors.gray300};
`;
