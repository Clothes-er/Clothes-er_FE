"use client";

import ListTab from "@/components/common/ListTab";
import Tabbar from "@/components/common/Tabbar";
import Topbar from "@/components/common/Topbar";
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
        <Topbar text="채팅" icon={true} align="center" />
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
