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
      {chatList.length > 0 ? (
        <ChatContainer>
          {chatList.map((data, index) => (
            <>
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
                isSuspended={data.isSuspended}
                isWithdrawn={data.isWithdrawn}
              />
              {index < chatList.length - 1 && <Divider />}
            </>
          ))}
        </ChatContainer>
      ) : (
        <NoData>
          {type === "rental" ? (
            <>
              아직 채팅 내역이 없어요.
              <br />
              대여글을 통해 채팅을 시작해보세요!
            </>
          ) : (
            <>
              아직 채팅 내역이 없어요.
              <br />
              다른 유저의 옷장을 구경하며 채팅을 시작해보세요!
            </>
          )}
        </NoData>
      )}
    </ChatListContianer>
  );
};

export default ChatListContent;

const ChatListContianer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.colors.gray300};
`;

const ChatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 0.5px;
  background-color: rgba(219, 219, 219, 0.7);
`;

const NoData = styled.div`
  width: 100%;
  height: 100%;
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
