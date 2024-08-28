import { theme } from "@/styles/theme";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatPreview from "./ChatPreview";
import AuthAxios from "@/api/authAxios";
import { ChatList, chatListType } from "@/type/chat";

interface ChatListContentProps {
  type: chatListType;
}
const ChatListContent: React.FC<ChatListContentProps> = ({ type }) => {
  const [chatList, setChatList] = useState<ChatList[]>([]);

  useEffect(() => {
    AuthAxios.get(
      `/api/v1/chats/${type === "rental" ? "rental-rooms" : "user-rooms"}`
    )
      .then((response) => {
        const data = response.data.result;
        setChatList(data);
        console.log(type, data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type]);

  useEffect(() => {
    console.log("chatList", chatList);
  }, [chatList]);

  return (
    <ChatListContianer>
      {chatList.map((data, index) => (
        <ChatContainer key={data.id}>
          <ChatPreview
            type={type}
            key={data.id}
            id={data.id}
            userSid={data.userSid}
            nickname={data.nickname}
            recentMessage={data.recentMessage}
            title={data.title}
            profileImgUrl={data.profileImgUrl}
            rentalImgUrl={data.rentalImgUrl}
            rentalState={data.rentalState}
            recentMessageTime={data.recentMessageTime}
            isDeleted={data.isDeleted}
            isRestricted={data.isRestricted}
          />
          {index < chatList.length - 1 && <Divider />}
        </ChatContainer>
      ))}
    </ChatListContianer>
  );
};

export default ChatListContent;

const ChatListContianer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.colors.gray300};
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 0.5px;
  background-color: rgba(219, 219, 219, 0.7);
`;
