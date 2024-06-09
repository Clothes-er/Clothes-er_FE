"use client";
import AuthAxios from "@/api/authAxios";
import Post from "@/components/home/Post";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Message {
  nickname: string;
  message: string;
  createdAt: string;
}

interface ChatMsg {
  id: number;
  buyerNickname: string;
  lenderNickname: string;
  opponentNickname: string;
  rentalId: string;
  rentalImgUrl: string;
  title: string;
  minPrice: number;
  rentalState: string;
  messages: Message[];
}

const ChatDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [chatMsg, setChatMsg] = useState<ChatMsg>();
  const [msg, setMsg] = useState<string>();

  useEffect(() => {
    AuthAxios.get(`/api/v1/chats/rooms/${id}`)
      .then((response) => {
        const data = response.data.result;
        setChatMsg(data);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSendMsg = () => {
    setMsg("");
  };

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
          {chatMsg?.opponentNickname}
        </Top>
        {chatMsg?.title && chatMsg?.minPrice && (
          <Post
            title={chatMsg.title}
            minPrice={chatMsg.minPrice}
            size="small"
          />
        )}
        <ChatList>
          {/* {chatList?.map((data) => (
            <ChatPreview
              key={data.id}
              id={data.id}
              nickname={data.nickname}
              recentMessage={data.recentMessage}
              title={data.title}
            />
          ))} */}
        </ChatList>
        <State>
          <div>대여중</div>
          <div>대여 완료</div>
        </State>
        {chatMsg?.opponentNickname === chatMsg?.buyerNickname && (
          <State>
            <div>대여중</div>
            <div>대여 완료</div>
          </State>
        )}
        <InputMsgBox>
          <InputMessage value={msg} onChange={(e) => setMsg(e.target.value)} />
          <Image
            src={`/assets/icons/ic_send${msg ? "_select" : ""}.svg`}
            width={24}
            height={24}
            alt="send"
            onClick={handleSendMsg}
            style={{ cursor: "pointer" }}
          />
        </InputMsgBox>
      </Layout>
    </>
  );
};

export default ChatDetail;

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
  ${(props) => props.theme.fonts.h2_bold};
`;

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
`;

const State = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const InputMsgBox = styled.div`
  width: 100%;
  height: 43px;
  padding: 10px 20px;
  border-radius: 10px;
  background: ${theme.colors.purple50};
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_regular};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputMessage = styled.input`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_regular};
  border: none;
  background: transparent;
  outline: none;
`;
