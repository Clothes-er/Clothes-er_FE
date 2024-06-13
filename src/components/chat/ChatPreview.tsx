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
}

const ChatPreview: React.FC<ChatPreviewProps> = ({
  id,
  nickname,
  recentMessage,
  title,
  profileImgUrl,
  rentalImgUrl,
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
          <NickName>{nickname}</NickName>
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
        <Product>{title}</Product>
      </Right>
    </Container>
  );
};

export default ChatPreview;

const Container = styled.div`
  width: 100%;
  height: 103px;
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
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`;

const Chat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  ${(props) => props.theme.fonts.c1_medium};
  color: ${theme.colors.purple300};
`;

const NickName = styled.div`
  ${(props) => props.theme.fonts.b3_medium};
`;
const Preview = styled.div`
  ${(props) => props.theme.fonts.b3_regular};
  color: ${theme.colors.b100};
`;
const Product = styled.div`
  ${(props) => props.theme.fonts.c1_regular};
  color: ${theme.colors.gray800};
`;
