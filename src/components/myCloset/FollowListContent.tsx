import { theme } from "@/styles/theme";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FollowList from "./FollowList";
import { getMyFollowersList, getMyFollowingsList } from "@/api/follows";

type followListType = "follower" | "followee";

interface FollowList {
  profileUrl: string;
  nickname: string;
  isFollowing: boolean;
  isWithdrawn: boolean;
  userSid: string;
}

interface FollowListContentProps {
  type: followListType;
}

const FollowListContent: React.FC<FollowListContentProps> = ({ type }) => {
  const [followList, setFollowList] = useState<FollowList[]>([]);

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        if (type === "follower") {
          const response = await getMyFollowersList();
          const data = response.result;
          setFollowList(data);
        } else {
          const response = await getMyFollowingsList();
          const data = response.result;
          setFollowList(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowingList();
  }, [type]);

  useEffect(() => {
    console.log("followList", followList);
  }, [followList]);

  return (
    <FollowListContianer>
      {followList.length > 0 ? (
        <FollowContainer>
          {followList.map((data, index) => (
            <FollowListWrapper key={index}>
              <FollowList
                userSid={data.userSid}
                nickname={data.nickname}
                profileImgUrl={data.profileUrl}
                isFollowing={data.isFollowing}
                isWithdrawn={data.isWithdrawn}
              />
              {index < followList.length - 1 && <Divider />}
            </FollowListWrapper>
          ))}
        </FollowContainer>
      ) : (
        <NoData>
          {type === "follower" ? (
            <>팔로워가 없습니다.</>
          ) : (
            <>팔로잉이 없습니다.</>
          )}
        </NoData>
      )}
    </FollowListContianer>
  );
};

export default FollowListContent;

const FollowListContianer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FollowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FollowListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 0.5px;
  background-color: rgba(219, 219, 219, 0.7);
`;

const NoData = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${theme.colors.gray800};
  ${(props) => props.theme.fonts.b2_regular}

  @media screen and (max-width: 400px) {
    ${(props) => props.theme.fonts.b3_regular}
  }
`;
