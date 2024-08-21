import AuthAxios from "@/api/authAxios";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";

type bottomType = "share" | "closet" | "closetShare";

interface Price {
  days: number;
  price: number;
}

interface BottomProps {
  id: number;
  bottomType: bottomType;
  prices?: Price[];
  isWriter: boolean;
}

const Bottom: React.FC<BottomProps> = ({
  id,
  bottomType,
  prices,
  isWriter,
}) => {
  const router = useRouter();
  const [pricePop, setPricePop] = useState<boolean>(false);
  const handleShowPrice = () => {
    setPricePop(true);
  };

  const handleNewChat = () => {
    AuthAxios.post(`/api/v1/chats/rental-rooms/${id}`)
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        console.log(response.data.message);
        router.push(`/chat/${data.id}`);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
        router.push(`/chat/${error.response.data.result.roomId}`);
      });
  };

  const onClose = () => {
    setPricePop(false);
  };

  return (
    <StyledBottom>
      {bottomType === "share" && (
        <div>
          <Price>
            {prices ? prices[0].price : "N/A"}원~
            <Days>3days</Days>
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
      {bottomType === "closet" && (
        <div>
          현재 <Span>대여글</Span>이 올라와있어요! <br />
          <Move onClick={() => router.push(`/home/${id}`)}>대여글로 이동</Move>
        </div>
      )}
      {bottomType === "closetShare" && (
        <div>
          <Span>궁금한 정보</Span>를 <Span>문의</Span>해보세요!
        </div>
      )}
      {!isWriter && <Chat onClick={handleNewChat}>문의하기</Chat>}
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

const Chat = styled.div`
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
