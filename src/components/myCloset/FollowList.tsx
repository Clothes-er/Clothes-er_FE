import { theme } from "@/styles/theme";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FollowButton from "../common/FollowButton";

interface FollowListProps {
  userSid: string;
  profileImgUrl: string;
  nickname: string;
  isFollowing: boolean;
  isWithdrawn: boolean;
}

const FollowList = (props: FollowListProps) => {
  const { profileImgUrl, nickname, isFollowing, isWithdrawn, userSid } = props;

  const [isFollowState, setIsFollowState] = useState<boolean>(isFollowing);

  useEffect(() => {
    setIsFollowState(isFollowing);
  }, [isFollowing]);

  const handleFollowButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowState(!isFollowState);
  };

  console.log("isFollowState", nickname, isFollowState);
  return (
    <FollowListContainer>
      <LeftBox>
        <ProfileImage
          src={
            isWithdrawn
              ? "/assets/images/withdraw_profile.svg"
              : profileImgUrl || "/assets/images/basic_profile.svg"
          }
          width={45}
          height={45}
          alt="profile"
        />
        {nickname}
      </LeftBox>
      <FollowButton
        userSid={userSid}
        isFollow={isFollowState}
        onClick={handleFollowButtonClick}
      />
    </FollowListContainer>
  );
};

export default FollowList;

const FollowListContainer = styled.div`
  width: 100%;
  height: 67px;
  padding: 24px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 29px;
  color: ${theme.colors.black};
  ${theme.fonts.b2_medium};
`;

const ProfileImage = styled(Image)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${theme.colors.white};
`;
