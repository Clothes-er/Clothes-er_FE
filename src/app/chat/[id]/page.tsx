"use client";
import AuthAxios from "@/api/authAxios";
import ChatMsg from "@/components/chat/ChatMsg";
import Post from "@/components/home/Post";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "@/components/common/Modal";
import RentalDate from "@/components/common/RentalDate";
import { Client } from "@stomp/stompjs";
import { getToken } from "@/hooks/getToken";
import Input from "@/components/common/Input";
import { useRequireAuth } from "@/hooks/useAuth";

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
  rentalId: number;
  rentalImgUrl: string;
  title: string;
  minPrice: number;
  rentalState: string;
  messages: Message[];
  isChecked: boolean;
}

interface CheckList {
  roomId: number;
  isChecked: boolean;
  checkList: string[];
}

const ChatDetail = () => {
  useRequireAuth();
  const router = useRouter();
  /* roomId */
  const { id } = useParams();
  /* get 메소드에서 받아오는 데이터 상태 저장*/
  const [chatMsg, setChatMsg] = useState<ChatMsg>();
  /* get 메소드에서 받아오는 체크리스트 값 저장*/
  const [checkGet, setCheckGet] = useState<CheckList>({
    roomId: 0,
    isChecked: false,
    checkList: ["", "", ""],
  });
  /* 전송 메세지 */
  const [msg, setMsg] = useState<string>("");
  /* 수신 메세지 */
  const [chatMsgList, setChatMsgList] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  /* 대여중, 반납완료 Popup */
  const [rentaling, setRentaling] = useState<boolean>();
  const [rentaled, setRentaled] = useState<boolean>();
  const [checked, setChecked] = useState<boolean>();
  const [lookChecked, setLookChecked] = useState<boolean>();

  /* 에러 msg */
  const [rentalingError, setRentalingError] = useState<string>("");
  const [rentaledError, setRentaledError] = useState<string>("");

  /* 대여중, 반납완료 상태 */
  const [rentalState, setRentalState] = useState<string>();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchChatMessages();
    console.log(checkGet);
  }, [chatMsgList, checkGet.isChecked, rentalState]);

  const fetchChatMessages = () => {
    AuthAxios.get(`/api/v1/chats/rooms/${id}`)
      .then((response) => {
        const data = response.data.result;
        setChatMsg(data);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    // 표준 WebSocket 객체 생성
    // const socket = new WebSocket("ws://13.209.137.34:8080/ws");

    const socketUrl = `ws://13.209.137.34:8080/ws`;
    const socket = new WebSocket(socketUrl);

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${getToken()}`,
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000, // 재연결 시도 시간 간격 (밀리초)
    });

    client.onConnect = () => {
      console.log("WebSocket 연결이 열렸습니다.");

      client.subscribe(`/sub/chats/${id}`, (frame) => {
        try {
          const messageBody = JSON.parse(frame.body);

          console.log(messageBody);
          setChatMsgList((prevMessages) => [...prevMessages, messageBody]);
        } catch (error) {
          console.error("오류가 발생했습니다:", error);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.onWebSocketError = (event) => {
      console.error("WebSocket error:", event);
      // alert("메시지 전송 중 오류가 발생했습니다.");
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (stompClient) {
        stompClient.deactivate(); // 연결 해제
      }
      socket.close(); // WebSocket 연결 닫기
    };
  }, []);

  const handleSendMsg = () => {
    // 메시지
    if (msg?.trim()) {
      const destination = `/pub/chats/${id}`;
      if (stompClient && stompClient.connected) {
        stompClient.publish({
          destination,
          body: JSON.stringify({
            message: msg,
          }),
        });
      }

      setMsg("");
    }
  };

  /* 대여중 처리 */
  const handleCheckRentaling = () => {
    if (startDate && endDate) {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      console.log("시작일: ", startDate, "반납일: ", endDate);
      console.log("시작일: ", formattedStartDate, "반납일: ", formattedEndDate);
      AuthAxios.post(`/api/v1/rentals/${id}/rental`, {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
        .then((response) => {
          const data = response.data.result;
          console.log(data);
          setRentalState(data.rentalState);
          console.log(response.data.message);
          setRentaling(false);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.message);
          setRentalingError(error.response.data.message);
        });
    }
  };

  /* 반납 완료 처리 */
  const handleCheckRentaled = () => {
    AuthAxios.patch(`/api/v1/rentals/${id}/return`)
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setRentalState(data.rentalState);
        console.log(response.data.message);
        setRentaled(false);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
        setRentaledError(error.response.data.message);
      });
  };

  /* 체크리스트 등록 */
  const handleRecordCheck = () => {
    AuthAxios.post(`/api/v1/rentals/${id}/check`, {
      checkList: checkGet.checkList,
    })
      .then((response) => {
        const data = response.data.result;
        setCheckGet(data);
        setChecked(false);
        console.log(response.data.message);
        setCheckGet((prevState) => ({
          ...prevState,
          checkList: ["", "", ""],
        }));
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
      });
  };

  /* 체크리스트 열람 */
  const handleLookCheck = () => {
    AuthAxios.get(`/api/v1/rentals/${id}/check`)
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setCheckGet(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
      });
  };

  /* 체크리스트 Input OnChange 함수 */
  const handleInputChange = (index: number, value: string) => {
    const newCheckList = [...checkGet.checkList];
    newCheckList[index] = value;
    setCheckGet({
      ...checkGet,
      checkList: newCheckList,
    });
  };

  /* 체크리스트 열람 예외처리 */
  const getContent = () => {
    if (checkGet.checkList.every((item) => item === "")) {
      return <NoData>작성 내역이 없습니다</NoData>;
    } else {
      return (
        <div>
          <ol>
            {checkGet.checkList.map(
              (data, index) => data && <List key={index}>{data}</List>
            )}
          </ol>
        </div>
      );
    }
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
            imgUrl={chatMsg.rentalImgUrl}
            id={chatMsg.rentalId}
            size="small"
          />
        )}
        {chatMsg && (
          <ChatList>
            {chatMsg.messages.map((data, index) => (
              <ChatMsg
                key={index}
                nickname={data.nickname}
                me={data.nickname !== chatMsg?.opponentNickname}
                msg={data.message}
              />
            ))}
          </ChatList>
        )}
        {chatMsg?.opponentNickname === chatMsg?.buyerNickname && (
          <State>
            <StateBox
              check={chatMsg?.rentalState === "RENTED"}
              onClick={() => setRentaling(true)}
              disabled={chatMsg?.rentalState === "RENTED"}
            >
              대여중
            </StateBox>
            <StateBox
              check={chatMsg?.rentalState === "RETURNED"}
              onClick={() => setRentaled(true)}
              disabled={chatMsg?.rentalState === "RETURNED"}
            >
              대여 완료
            </StateBox>
            {chatMsg && chatMsg.isChecked && (
              <CheckListPurple
                onClick={() => {
                  setLookChecked(true);
                  handleLookCheck();
                }}
              >
                <Image
                  src="/assets/icons/ic_checklist_true.svg"
                  width={24}
                  height={24}
                  alt="checklist"
                />
              </CheckListPurple>
            )}
          </State>
        )}
        {chatMsg?.opponentNickname === chatMsg?.lenderNickname && (
          <State>
            {chatMsg && (
              <>
                <StateBox
                  check={chatMsg.isChecked}
                  onClick={
                    chatMsg.isChecked
                      ? () => {
                          setLookChecked(true);
                          handleLookCheck();
                        }
                      : () => setChecked(true)
                  }
                >
                  체크리스트
                  <Image
                    src={
                      chatMsg.isChecked
                        ? "/assets/icons/ic_checklist_true.svg"
                        : "/assets/icons/ic_checklist_false.svg"
                    }
                    width={24}
                    height={24}
                    alt="checklist"
                  />
                </StateBox>
              </>
            )}
          </State>
        )}
        {rentaling && (
          <Modal
            title={`${chatMsg?.opponentNickname} 님과\n 옷장 공유가 성사되었나요?`}
            text={`*정확한 대여 시작일과 반납 예정일을\n입력해주세요.`}
            onClose={() => {
              setRentaling(false);
              setRentalingError("");
            }}
            onCheck={handleCheckRentaling}
            no="취소하기"
            yes="대여 중"
            width="340px"
            height="400px"
            content={
              <>
                <RentalDate
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
                <Error error={rentalingError}>{rentalingError}</Error>
              </>
            }
          />
        )}
        {rentaled && (
          <Modal
            title={`${chatMsg?.opponentNickname} 님과의\n 거래가 정상적으로 완료 되었나요?`}
            text={`*반납 의류에 하자가 없는지\n꼼꼼히 확인 후, 대여 완료를 눌러주세요!`}
            onClose={() => {
              setRentaled(false);
              setRentaledError("");
            }}
            onCheck={handleCheckRentaled}
            no="취소하기"
            yes="대여 완료"
            width="340px"
            height="250px"
            content={<Error error={rentaledError}>{rentaledError}</Error>}
          />
        )}
        {checked && (
          <Modal
            title={`대여 전, 옷 상태를\n판매자와 함께 체크해보세요!`}
            text={`*오염 부위 및 내용, 상태 등을 상세하게\n기록하면 반납 시에 도움이 될 거예요!`}
            onClose={() => {
              setChecked(false);
              setCheckGet((prevState) => ({
                ...prevState,
                checkList: ["", "", ""],
              }));
            }}
            onCheck={handleRecordCheck}
            no="취소하기"
            yes="기록하기"
            width="340px"
            height="430px"
            content={
              <div>
                {checkGet.checkList.map((data, index) => (
                  <Row key={index}>
                    <Image
                      src="/assets/icons/ic_checklist_false.svg"
                      width={24}
                      height={24}
                      alt="checklist"
                      style={{ marginBottom: "20px" }}
                    />
                    <Input
                      value={data}
                      readOnly={checkGet.isChecked}
                      onChange={(value) => handleInputChange(index, value)}
                    />
                  </Row>
                ))}
              </div>
            }
          />
        )}
        {lookChecked && (
          <Modal
            title={`대여 시 작성했던 옷 상태와\n 일치한지 확인해보세요!`}
            text={`*혹여나 문제가 있다면,\n본 기록을 바탕으로 공정하게 해결할 수 있어요!`}
            onClose={() => {
              setLookChecked(false);
            }}
            onCheck={() => {
              setLookChecked(false);
            }}
            no="닫기"
            yes="확인 완료"
            width="340px"
            height="430px"
            content={<div>{getContent()}</div>}
          />
        )}
        <InputMsgBox>
          <InputMessage
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMsg();
            }}
          />
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
  height: 100%;
  overflow-x: hidden;
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
  width: 100%;
  height: calc(100% - 80px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const State = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  position: relative;
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
  position: sticky;
  bottom: 0;
  left: 0;
`;

const InputMessage = styled.input`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_regular};
  border: none;
  background: transparent;
  outline: none;
`;

const StateBox = styled.button<{ check: boolean }>`
  width: auto;
  height: 37px;
  padding: 6px 15px;
  border-radius: 20px;
  background: ${(props) =>
    props.check ? props.theme.colors.purple100 : props.theme.colors.gray100};
  color: ${(props) =>
    props.check ? props.theme.colors.purple300 : props.theme.colors.b100};
  ${(props) => props.theme.fonts.b3_bold};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const List = styled.li`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_regular};
  margin-bottom: 30px;
  list-style: disc inside;
`;

const CheckListPurple = styled.div`
  width: 37px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.purple100};
  border-radius: 20px;
  position: absolute;
  top: 0px;
  right: 20px;
`;

const Error = styled.div<{ error: string }>`
  text-align: center;
  height: 16px;
  padding-left: 10px;
  color: ${(props) => props.theme.colors.delete};
  ${(props) => props.theme.fonts.c1_regular};
  opacity: ${(props) => (props.error ? 1 : 0)};
`;

const NoData = styled.div`
  color: ${(props) => props.theme.colors.gray900};
  ${(props) => props.theme.fonts.b2_regular};
`;
