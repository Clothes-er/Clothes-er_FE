import { theme } from "@/styles/theme";
import Image from "next/image";
import styled from "styled-components";
import FollowButton from "../common/FollowButton";
import { useState } from "react";

interface Profile {
  userSid: string;
  nickname: string;
  profileUrl: string;
  followerCount: number;
  followingCount: number;
  isFollow: boolean;
  isWithdrawn?: boolean;
  isWriter: boolean;
  onClick: () => void;
}

const Profile: React.FC<Profile> = ({
  userSid,
  nickname,
  profileUrl,
  followerCount = 0, // 추후 API 구현 시 수정
  followingCount = 0,
  isFollow = false,
  isWithdrawn,
  isWriter,
  onClick,
}) => {
  const [isFollowState, setIsFollowState] = useState<boolean>(isFollow);

  const handleFollowButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowState(!isFollowState);
  };

  return (
    <ProfileContainer onClick={onClick}>
      <LeftBox>
        <ProfileImage
          src={
            isWithdrawn
              ? "/assets/images/withdraw_profile.svg"
              : profileUrl || "/assets/images/basic_profile.svg"
          }
          width={45}
          height={45}
          alt="profile"
        />
        <Text>
          {nickname}
          <Follow>
            팔로워 {followerCount}
            &nbsp;&nbsp;&nbsp; 팔로잉 {followingCount}
          </Follow>
        </Text>
      </LeftBox>
      {!isWriter && (
        <FollowButton
          userSid={userSid}
          isFollow={isFollowState}
          onClick={handleFollowButtonClick}
        />
      )}
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  width: 100%;
  height: 73px;
  padding: 14px 48px;
  background: rgba(235, 235, 235, 0.17);
  box-shadow: 0px 4px 20px 0px rgba(215, 215, 215, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  ${(props) => props.theme.fonts.b2_regular};
  cursor: pointer;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 29px;
`;

const ProfileImage = styled(Image)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${theme.colors.white};
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Follow = styled.div`
  color: ${theme.colors.gray900};
  ${theme.fonts.c1_regular};
`;
