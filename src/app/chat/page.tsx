"use client";
import AuthAxios from "@/api/authAxios";
import ChatPreview from "@/components/chat/ChatPreview";
import Tabbar from "@/components/common/Tabbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ChatList {
  id: number;
  nickname: string;
  profileImgUrl: string;
  recentMessage: string;
  recentMessageTime: string;
  rentalImgUrl: string;
  recentState: string;
  title: string;
}
const Chat = () => {
  const router = useRouter();
  const [chatList, setChatList] = useState<ChatList[]>();

  useEffect(() => {
    AuthAxios.get("/api/v1/chats/rooms")
      .then((response) => {
        const data = response.data.result;
        setChatList(data);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        <ChatList>
          {chatList?.map((data) => (
            <ChatPreview
              key={data.id}
              id={data.id}
              nickname={data.nickname}
              recentMessage={data.recentMessage}
              title={data.title}
              profileImgUrl={data.profileImgUrl}
              rentalImgUrl={data.rentalImgUrl}
            />
          ))}
        </ChatList>
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
  width: calc(50% + 30px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 15px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
`;
