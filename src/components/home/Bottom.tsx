import AuthAxios from "@/api/authAxios";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { chatListType } from "@/type/chat";
import { showToast } from "@/hooks/showToast";

type bottomType = "share" | "closet";

interface Price {
  days: number;
  price: number;
}

interface BottomProps {
  type: chatListType;
  id: number;
  rentalId?: number;
  bottomType: bottomType;
  prices?: Price[];
  userSid?: string;
  isWriter: boolean;
  isWithdrawn?: boolean;
}

const Bottom: React.FC<BottomProps> = ({
  type,
  id,
  rentalId,
  bottomType,
  prices,
  userSid,
  isWriter,
  isWithdrawn,
}) => {
  const router = useRouter();
  const [pricePop, setPricePop] = useState<boolean>(false);
  const handleShowPrice = () => {
    setPricePop(true);
  };

  const handleNewChat = () => {
    AuthAxios.post(
      `/api/v1/chats/${
        type === "rental" ? `rental-rooms/${id}` : `user-rooms/${userSid}`
      }`
    )
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        console.log(response.data.message);
        router.push(`/chat/${data.id}?type=${type}`);
      })
      .catch((error) => {
        console.log("채팅방 생성 실패", error);
        console.log(error.response.data.message);
        if (error.response) {
          if (
            (type === "rental" &&
              // 순서대로 대여글 작성자, 유예,  대여글 없음, 채팅방 중복의 경우
              error.response.data.code === 2300) ||
            error.response.data.code === 2131 ||
            error.response.data.code === 3200 ||
            error.response.data.code === 2301 ||
            (type === "user" &&
              // 순서대로 대여글 작성자, 유예, 회원 없음(탈퇴), 채팅방 중복의 경우
              error.response.data.code === 2131) ||
            error.response.data.code === 2305 ||
            error.response.data.code === 3100 ||
            error.response.data.code === 2304
          ) {
            console.log(error.response.data.code);
            showToast({
              text: `${error.response.data.message}`,
              icon: "❌",
              type: "error",
            });
          } else {
            console.log(error.response.data.message);
          }
        }
      });
  };

  const onClose = () => {
    setPricePop(false);
  };

  const minPrice = prices?.sort((a, b) => b.days - a.days)[0];

  return (
    <StyledBottom>
      {bottomType === "share" && (
        <div>
          <Price>
            {prices ? minPrice?.price : "N/A"}원~
            <Days>{minPrice?.days}days</Days>
          </Price>
          <MorePrice onClick={handleShowPrice}>가격표 보기</MorePrice>
          {pricePop && (
            <div>
              <PricePopup>
                가격표
                <Table>
                  {prices?.map((data, index) => (
                    <Set key={index}>
                      <DaysPopup>{data.days}일 :</DaysPopup>
                      <PricesPopup>{data.price}원</PricesPopup>
                    </Set>
                  ))}
                </Table>
              </PricePopup>
              <Overlay onClick={onClose} />
            </div>
          )}
        </div>
      )}
      {bottomType === "closet" &&
        (rentalId ? (
          <div>
            현재 <Span>대여글</Span>이 올라와있어요! <br />
            <Move onClick={() => router.push(`/home/${rentalId}`)}>
              대여글로 이동
            </Move>
          </div>
        ) : (
          <div>
            <Span>궁금한 정보</Span>를 <Span>문의</Span>해보세요!
          </div>
        ))}
      {!isWriter && (
        <Chat onClick={handleNewChat} disabled={isWithdrawn}>
          문의하기
        </Chat>
      )}
    </StyledBottom>
  );
};

export default Bottom;

const StyledBottom = styled.div`
  width: 100%;
  height: 82px;
  padding: 24px 26px;
  border-radius: 20px 20px 0px 0px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.06) inset;
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${(props) => props.theme.fonts.h2_medium};
`;

const Days = styled.span`
  ${(props) => props.theme.fonts.b3_regular};
`;

const MorePrice = styled.div`
  color: ${theme.colors.purple400};
  ${(props) => props.theme.fonts.c1_regular};
  text-decoration: underline;
  margin-top: 6px;
  cursor: pointer;
`;

const Chat = styled.button`
  width: 137px;
  height: 40px;
  border-radius: 15px;
  background: ${theme.colors.purple400};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.b2_regular};
  cursor: pointer;

  &:disabled {
    background: ${theme.colors.gray400};
  }
`;

const PricePopup = styled.div`
  width: 305px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 35px 33px;
  border-radius: 20px;
  gap: 20px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 20px 0px rgba(144, 144, 144, 0.25);
  ${(props) => props.theme.fonts.b1_medium};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Set = styled.div`
  display: flex;
  gap: 5px;
`;
const DaysPopup = styled.div`
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.b2_medium};
`;

const PricesPopup = styled.div`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_medium};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 100;
`;

const Span = styled.span`
  color: ${theme.colors.purple500};
`;

const Move = styled.div`
  margin-top: 4px;
  color: ${theme.colors.purple500};
  text-decoration: underline;
  cursor: pointer;
`;
