import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface ChatPreviewProps {
  id: number;
  nickname: string;
  recentMessage: string;
  title: string;
  profileImgUrl: string;
  rentalImgUrl: string;
  rentalState: string;
  recentMessageTime: string;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({
  id,
  nickname,
  recentMessage,
  title,
  profileImgUrl,
  rentalImgUrl,
  rentalState,
  recentMessageTime,
}) => {
  const router = useRouter();
  const handleChatDetail = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={handleChatDetail}>
      <Left>
        {profileImgUrl ? (
          <ProfileImage
            src={profileImgUrl}
            width={56}
            height={56}
            alt="profile"
            style={{ borderRadius: "100px", background: "white" }}
          />
        ) : (
          <ProfileImage
            src={"/assets/images/profile.svg"}
            width={56}
            height={56}
            alt="profile"
            style={{ borderRadius: "100px" }}
          />
        )}
        {rentalImgUrl ? (
          <ProductImage
            src={rentalImgUrl}
            width={56}
            height={56}
            alt="product"
            style={{ borderRadius: "190px", background: "white" }}
          />
        ) : (
          <ProductImage
            src="/assets/images/noImage.svg"
            width={56}
            height={56}
            alt="product"
            style={{ borderRadius: "100px" }}
          />
        )}
      </Left>
      <Right>
        <Top>
          <Name>
            <NickName>{nickname}</NickName>
            {rentalState === "RENTED" && (
              <StateBox check={true}>대여중</StateBox>
            )}
            {rentalState === "RETURNED" && (
              <StateBox check={false}>대여완료</StateBox>
            )}
          </Name>

          <Chat>
            {/* <Image
              src="/assets/icons/ic_chat_mini.svg"
              width={16}
              height={16}
              alt="chat"
            />
            1 */}
          </Chat>
        </Top>
        <Preview>{recentMessage}</Preview>
        <Product>{`${title}   |   ${recentMessageTime}`}</Product>
      </Right>
    </Container>
  );
};

export default ChatPreview;

const Container = styled.div`
  width: 100%;
  height: 110px;
  padding: 24px 8px;
  border-bottom: 1px solid ${theme.colors.gray300};
  display: flex;
  justify-content: flex-start;
  gap: 20px;
`;

const Left = styled.div`
  width: 100px;
  height: 100%;
  position: relative;
`;

const ProfileImage = styled(Image)`
  position: absolute;
  top: 10px;
  left: 0;
  z-index: 100;
`;

const ProductImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 20px;
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const Top = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Chat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  ${(props) => props.theme.fonts.c1_medium};
  color: ${theme.colors.purple300};
`;

const NickName = styled.div`
  ${(props) => props.theme.fonts.b2_medium};
`;
const Preview = styled.div`
  ${(props) => props.theme.fonts.b3_regular};
  color: ${theme.colors.b100};
`;
const Product = styled.div`
  ${(props) => props.theme.fonts.c1_regular};
  color: ${theme.colors.gray800};
  white-space: pre;
`;

const StateBox = styled.button<{ check: boolean }>`
  width: auto;
  height: 25px;
  padding: 6px 10px;
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
