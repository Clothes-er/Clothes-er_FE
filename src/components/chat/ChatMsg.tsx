import { theme } from "@/styles/theme";
import styled from "styled-components";
import { format, isValid, parse } from "date-fns";

interface ChatMsgProps {
  nickname: string;
  me: boolean;
  msg: string;
  createdAt: string;
  showNickname: boolean;
  showTime: boolean;
}

const ChatMsg: React.FC<ChatMsgProps> = ({
  nickname,
  me,
  msg,
  createdAt,
  showNickname,
  showTime,
}) => {
  const parsedDate = parse(createdAt, "yyyy년 MM월 dd일 HH:mm:ss", new Date());
  const formattedTime = isValid(parsedDate)
    ? format(parsedDate, "HH:mm")
    : "Invalid date";

  return (
    <Container me={me}>
      {showNickname && <NickName>{nickname}</NickName>}
      <ChatBox me={me}>{msg}</ChatBox>
      {showTime && <Time>{formattedTime}</Time>}
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

const Time = styled.div`
  color: ${theme.colors.gray800};
  ${(props) => props.theme.fonts.c2_regular};
`;
