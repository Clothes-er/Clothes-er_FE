import Image from "next/image";
import styled from "styled-components";

interface Profile {
  nickname: string;
  profileUrl: string;
  onClick: () => void;
}

const Profile: React.FC<Profile> = ({ nickname, profileUrl, onClick }) => {
  return (
    <Div onClick={onClick}>
      <Image
        src={profileUrl || "/assets/images/basic_profile.svg"}
        width={45}
        height={45}
        alt="profile"
        style={{ borderRadius: "100px", background: "white" }}
      />
      {nickname}
    </Div>
  );
};

export default Profile;

const Div = styled.button`
  width: 100%;
  height: 73px;
  padding: 14px 48px;
  background: rgba(235, 235, 235, 0.17);
  box-shadow: 0px 4px 20px 0px rgba(215, 215, 215, 0.25);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 29px;
  ${(props) => props.theme.fonts.b2_regular};
`;
