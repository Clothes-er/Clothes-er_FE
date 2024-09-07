import { theme } from "@/styles/theme";
import styled from "styled-components";
import { format, isValid, parse } from "date-fns";
import ko from "date-fns/locale/ko";

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
    ? format(parsedDate, "a h:mm", { locale: ko })
        .replace("AM", "오전")
        .replace("PM", "오후")
    : "Invalid date";

  return (
    <Container $me={me}>
      {showNickname && <NickName>{nickname}</NickName>}
      <ChatBox $me={me}>
        {msg}
        {showTime && <Time $me={me}>{formattedTime}</Time>}
      </ChatBox>
    </Container>
  );
};

export default ChatMsg;

const Container = styled.div<{ $me: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ $me }) => ($me ? "flex-end" : "flex-start")};
  gap: 5px;
`;

const NickName = styled.div`
  ${(props) => props.theme.fonts.b2_medium};
`;

const ChatBox = styled.div<{ $me: boolean }>`
  max-width: 250px;
  padding: 12px 18px;
  text-align: left;
  border-radius: 20px;
  background: ${({ $me }) =>
    $me ? theme.colors.purple50 : theme.colors.gray100};
  ${(props) => props.theme.fonts.b2_regular};
  color: ${theme.colors.b100};
  position: relative;
  ${({ $me }) => ($me ? "margin-right: 8px;" : "margin-left: 8px;")}

  &::after {
    content: "";
    position: absolute;
    top: 0px;
    ${({ $me }) =>
      $me
        ? "right: -8px; transform: rotate(-120deg);"
        : "left: -8px; transform: rotate(120deg);"}
    width: 0;
    height: 0;
    /* transform: rotate(-120deg); */
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: ${({ $me }) =>
      $me
        ? `15px solid ${theme.colors.purple50}`
        : `15px solid ${theme.colors.gray100}`};
  }
`;

const Time = styled.div<{ $me: boolean }>`
  position: absolute;
  bottom: 5px;
  ${({ $me }) => ($me ? "left: -55px;" : "right: -55px;")}
  color: ${theme.colors.gray800};
  ${(props) => props.theme.fonts.c2_regular};
  white-space: nowrap;
`;
