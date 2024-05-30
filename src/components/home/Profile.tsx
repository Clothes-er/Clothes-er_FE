import Image from "next/image";
import styled from "styled-components";

interface Profile {
  nickname: string;
}

const Profile: React.FC<Profile> = ({ nickname }) => {
  return (
    <Div>
      <Image
        src="/assets/images/profile.svg"
        width={45}
        height={45}
        alt="profile"
      />
      {nickname}
    </Div>
  );
};

export default Profile;

const Div = styled.div`
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
