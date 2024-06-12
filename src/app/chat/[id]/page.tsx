"use client";
import AuthAxios from "@/api/authAxios";
import ChatMsg from "@/components/chat/ChatMsg";
import Post from "@/components/home/Post";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "@stomp/stompjs";
import { getToken } from "@/hooks/getToken";
import Modal from "@/components/common/Modal";
import RentalDate from "@/components/common/RentalDate";

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
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [chatMsgList, setChatMsgList] = useState<ChatMsg | null>(null);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  const [rentaling, setRentaling] = useState<boolean>();
  const [rentaled, setRentaled] = useState<boolean>();
  const [rentalState, setRentalState] = useState<string>();

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
        console.log(error.response.data.message);
      });
  }, []);

  // const connectToWebSocket = () => {
  //   const socket = new SockJS("ws://13.209.137.34:8080/ws");
  //   // const socket = io("ws://13.209.137.34:8080/ws");
  //   const client = Stomp.over(socket);

  //   console.log("WebSocket 연결을 시도합니다.");

  //   // 인증 토큰 가져오기
  //   const token = getToken();

  //   client.connect(
  //     { headers: { Authorization: `Bearer ${token}` } },
  //     () => {
  //       console.log("WebSocket 연결 성공");

  //       // 데이터 보내는 용 연결망 설정
  //       const sendSocket = io("ws://13.209.137.34:8080/ws/pub/chats/" + id);
  //       const sendClient = Stomp.over(sendSocket);

  //       // 데이터 받는 용 연결망 설정
  //       const recvSocket = io("ws://13.209.137.34:8080/ws/sub/chats/" + id);
  //       const recvClient = Stomp.over(recvSocket);

  //       // 메시지 수신 처리
  //       recvClient.connect({}, () => {
  //         console.log("데이터 받는 용 WebSocket 연결 성공");

  //         recvClient.subscribe(`/chats/${id}`, (message: any) => {
  //           console.log("수신한 메시지:", message.body);
  //           // 메시지 처리 로직 추가
  //         });
  //       });

  //       // 소켓 및 클라이언트 상태 저장
  //       setSocket(socket);
  //       setStompClient(client);
  //     },
  //     (error: any) => {
  //       console.error("WebSocket 연결 오류:", error.body.message);
  //     }
  //   );

  //   return () => {
  //     if (stompClient) {
  //       stompClient.disconnect();
  //     }
  //     if (socket) {
  //       socket.close();
  //     }
  //   };
  // };

  // useEffect(connectToWebSocket, []);

  const handleSendMsg = () => {
    console.log("전송하기", msg);
    // if (msg?.trim() && socket) {
    //   socket.emit("sendMsg", { roomId: id, message: msg });
    //   setMsg(""); // 메시지 전송 후 입력 필드 비우기
    //   console.log("전송성공");
    // }
  };

  const handleCheckRentaling = () => {
    AuthAxios.patch(`/api/v1/rentals/${id}/rental`, {
      startDate: startDate,
      endDate: endDate,
    })
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setRentalState(data.rentalState);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
      });
  };

  const handleCheckRentaled = () => {
    AuthAxios.patch(`/api/v1/rentals/${id}/return`)
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        setRentalState(data.rentalState);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
      });
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
        {chatMsg && (
          <ChatList>
            {chatMsg.messages?.map((data, index) => (
              <ChatMsg
                key={index}
                nickname={data.nickname}
                me={data.nickname !== chatMsg.opponentNickname}
                msg={data.message}
              />
            ))}
          </ChatList>
        )}
        <State>
          <StateBox
            check={rentalState === "RENTED"}
            onClick={() => setRentaling(true)}
          >
            대여중
          </StateBox>
          <StateBox
            check={rentalState === "RETURNED"}
            onClick={() => setRentaled(true)}
          >
            대여 완료
          </StateBox>
        </State>
        {chatMsg?.opponentNickname === chatMsg?.buyerNickname && (
          <State>
            <StateBox
              check={rentalState === "RENTED"}
              onClick={() => setRentaling(true)}
            >
              대여중
            </StateBox>
            <StateBox
              check={rentalState === "RETURNED"}
              onClick={() => setRentaled(true)}
            >
              대여 완료
            </StateBox>
          </State>
        )}
        {rentaling && (
          <Modal
            title={`${chatMsg?.opponentNickname} 님과\n 옷장 공유가 성사되었나요?`}
            text={`*정확한 대여 시작일과 반납 예정일을\n입력해주세요.`}
            onClose={() => {
              setRentaling(false);
            }}
            onCheck={handleCheckRentaling}
            no="취소하기"
            yes="대여 중"
            width="340px"
            height="400px"
            content={<RentalDate />}
          />
        )}
        {rentaled && (
          <Modal
            title={`${chatMsg?.opponentNickname} 님과의\n 거래가 정상적으로 완료 되었나요?`}
            text={`*반납 의류에 하자가 없는지\n꼼꼼히 확인 후, 대여 완료를 눌러주세요!`}
            onClose={() => {
              setRentaled(false);
            }}
            onCheck={handleCheckRentaled}
            no="취소하기"
            yes="대여 완료"
            width="340px"
            height="230px"
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
