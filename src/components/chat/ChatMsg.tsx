import { theme } from "@/styles/theme";
import styled from "styled-components";

interface ChatMsgProps {
  nickname: string;
  me: boolean;
  msg: string;
}

const ChatMsg: React.FC<ChatMsgProps> = ({ nickname, me, msg }) => {
  return (
    <Container me={me}>
      <NickName>{nickname}</NickName>
      <ChatBox me={me}>{msg}</ChatBox>
    </Container>
  );
};

export default ChatMsg;

const Container = styled.div<{ me: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ me }) => (me ? "flex-end" : "flex-start")};
  gap: 5px;
`;

const NickName = styled.div`
  ${(props) => props.theme.fonts.b2_medium};
`;

const ChatBox = styled.div<{ me: boolean }>`
  width: 210px;
  height: auto;
  padding: 12px 18px;
  text-align: left;
  border-radius: 10px;
  background: ${({ me }) =>
    me ? theme.colors.purple50 : theme.colors.gray100};
  ${(props) => props.theme.fonts.b2_regular};
  color: ${theme.colors.b100};
`;
