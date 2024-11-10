"use client";
import AuthAxios from "@/api/authAxios";
import FollowButton from "@/components/common/FollowButton";
import Header from "@/components/common/Header";
import ListTab from "@/components/common/ListTab";
import Topbar from "@/components/common/Topbar";
import ScoreBar from "@/components/myCloset/ScoreBar";
import { getLevelText } from "@/data/levelData";
import { getGenderLabel } from "@/interface/Gender";
import { theme } from "@/styles/theme";
import { getLevelMessage } from "@/util/custom";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Profile {
  nickname: string;
  profileUrl: string;
  gender: string;
  level: number;
  rentalCount: number;
  closetScore: number;
  height: number;
  weight: number;
  shoeSize: number;
  bodyShapes: string[];
  categories: string[];
  styles: string[];
  followers: number;
  followees: number;
  isSuspended: boolean;
  isRestricted: boolean;
}

interface ProfileInfo {
  isFollowing: boolean;
  profile: Profile;
}

const MyCloset = () => {
  const router = useRouter();
  const { userSid } = useParams();
  const userSidString = Array.isArray(userSid) ? userSid[0] : userSid;

  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();
  const [isFollowState, setIsFollowState] = useState<boolean>(false);

  const [currentslide, setCurrentslide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleFollowButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowState(!isFollowState);
  };

  useEffect(() => {
    AuthAxios.get(`/api/v1/users/profile/${userSidString}`)
      .then((response) => {
        const data = response.data.result;
        setProfileInfo(data);
        setIsFollowState(data.isFollowing);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log("유저 프로필 조회 실패", error);
        if (error.response) {
          // 회원 찾을 수 없는 경우 (탈퇴)
          if (error.response.data.code === 3100) {
            console.log("탈퇴한 회원입니다.");
          } else {
            console.log(error.response.data.message);
          }
        }
      });
  }, []);

  const goToSlide = (slideIndex: number) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      const scrollLeft = slideWidth * slideIndex;
      sliderRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
      setTimeout(() => {
        setCurrentslide(slideIndex);
      }, 120);
    }
  };

  return (
    <>
      <Layout>
        <Background />
        <Header />
        <TopRow>
          <Topbar
            text={`${
              profileInfo
                ? `${profileInfo.profile.nickname} 님의 옷장`
                : "존재하지 않는 옷장"
            }`}
            icon={true}
            align="left"
          />
        </TopRow>
        <Profile>
          <ProfileLeft>
            <ProfileImage>
              <Image
                src={
                  profileInfo
                    ? profileInfo.profile.profileUrl ||
                      "/assets/images/basic_profile.svg"
                    : "/assets/images/withdraw_profile.svg"
                }
                fill
                objectFit="cover"
                alt="profile"
              />
            </ProfileImage>
            <Text>
              <Top>
                <Nickname>
                  {profileInfo ? profileInfo.profile.nickname : "탈퇴한 유저"}
                  {profileInfo && (
                    <Gender>
                      {getGenderLabel(profileInfo.profile.gender)}
                    </Gender>
                  )}
                </Nickname>
              </Top>
              {profileInfo && (
                <Level>
                  {profileInfo?.profile.level !== null &&
                    `${getLevelText(profileInfo.profile.level) + ""} (Lv. ${
                      profileInfo?.profile.level
                    })`}
                  <LevelText>
                    {profileInfo?.profile.rentalCount}개의 옷을 아꼈어요!
                  </LevelText>
                </Level>
              )}
              <Follow>
                팔로워 {profileInfo?.profile.followers}
                &nbsp;&nbsp;&nbsp; 팔로잉 {profileInfo?.profile.followees}
              </Follow>
            </Text>
          </ProfileLeft>
          <FollowButton
            userSid={userSidString}
            isFollow={isFollowState}
            onClick={handleFollowButtonClick}
          />
        </Profile>
        <SliderContainer>
          <Slider ref={sliderRef}>
            <Slide>
              <ScoreBox>
                {profileInfo ? (
                  <>
                    <InfoTop>
                      <Title>옷장점수</Title>
                      <Comment>
                        {getLevelMessage(profileInfo?.profile.closetScore || 0)}
                      </Comment>
                      <Score>{profileInfo?.profile.closetScore}점</Score>
                    </InfoTop>
                    {currentslide === 0 && (
                      <ScoreBarWrapper>
                        <ScoreBar
                          recentScore={profileInfo?.profile.closetScore || 0}
                          nickname={profileInfo?.profile.nickname}
                        />
                      </ScoreBarWrapper>
                    )}
                    <MoreReview
                      onClick={() =>
                        router.push(`/user/${userSidString}/review`)
                      }
                    >
                      거래 후기 확인하기
                    </MoreReview>
                  </>
                ) : (
                  <NoUser>탈퇴한 유저입니다. 정보를 제공할 수 없어요:(</NoUser>
                )}
              </ScoreBox>
            </Slide>
            <Slide>
              <StyleBox>
                {profileInfo ? (
                  <>
                    <StyleBoxDiv>
                      <div>
                        <Title>스펙</Title>
                        <SpecText>
                          <div>키</div>
                          <div>
                            {profileInfo?.profile.height
                              ? `${profileInfo.profile.height}cm`
                              : "미공개"}
                          </div>
                          <div>몸무게</div>
                          <div>
                            {profileInfo?.profile.weight
                              ? `${profileInfo.profile.weight}kg`
                              : "미공개"}
                          </div>
                          <div>발 크기</div>
                          <div>
                            {profileInfo?.profile.shoeSize
                              ? `${profileInfo.profile.shoeSize}mm`
                              : "미공개"}
                          </div>
                        </SpecText>
                      </div>
                      <Keywords>
                        {profileInfo?.profile.bodyShapes[0] ? (
                          <>
                            {profileInfo?.profile.bodyShapes.map(
                              (data, index) => (
                                <Keyword key={index} type={1}>
                                  {data}
                                </Keyword>
                              )
                            )}
                          </>
                        ) : (
                          <Keyword type={0}>체형정보 미기입</Keyword>
                        )}
                      </Keywords>
                    </StyleBoxDiv>
                    <StyleBoxDiv>
                      <div>
                        <Title>취향</Title>
                        <StyleText>
                          {profileInfo?.profile.categories.map(
                            (data, index) => (
                              <span key={index}>
                                {data}
                                {`  `}
                              </span>
                            )
                          )}
                        </StyleText>
                      </div>
                      <Keywords>
                        {profileInfo?.profile.styles[0] ? (
                          <>
                            {profileInfo?.profile.styles.map((data, index) => (
                              <Keyword key={index} type={2}>
                                {data}
                              </Keyword>
                            ))}
                          </>
                        ) : (
                          <Keyword type={0}>스타일 미기입</Keyword>
                        )}
                      </Keywords>
                    </StyleBoxDiv>
                  </>
                ) : (
                  <NoUser>탈퇴한 유저입니다. 정보를 제공할 수 없어요:(</NoUser>
                )}
              </StyleBox>
            </Slide>
          </Slider>
          {profileInfo && (
            <IndicatorContainer>
              <Indicator
                onClick={() => goToSlide(0)}
                active={currentslide === 0}
              >
                {/* 스코어 박스 */}
              </Indicator>
              <Indicator
                onClick={() => goToSlide(1)}
                active={currentslide === 1}
              >
                {/* 스타일 박스 */}
              </Indicator>
            </IndicatorContainer>
          )}
        </SliderContainer>
        <ListTab listType="other" userSid={String(userSid)} />
      </Layout>
    </>
  );
};

export default MyCloset;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: none;
  background: ${theme.colors.ivory};
  z-index: 1;
`;

const Background = styled.div`
  width: 100%;
  max-width: 480px;
  height: 500px;
  border-radius: 0 0 200px 200px;
  background: linear-gradient(180deg, #d8d1ff 0%, #f3f1ff 100%);
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -10;
  overflow: hidden;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* 프로필 */
const Profile = styled.div`
  width: 100%;
  height: 120px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const ProfileLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileImage = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  overflow: hidden;
`;

const Text = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 30px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const Gender = styled.span`
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.c2_medium};
  margin-top: 5px;
`;

const Level = styled.div`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.b2_medium};
`;

const LevelText = styled.div`
  color: ${theme.colors.b200};
  ${(props) => props.theme.fonts.c1_medium};
`;

const Follow = styled.button`
  color: ${theme.colors.gray900};
  ${theme.fonts.c1_regular};
  text-align: left;
`;

/* 옷장점수 & 스펙, 취향 */
const SliderContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 35px;
`;

const Slider = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;
`;

const Slide = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScoreBox = styled.div`
  width: 100%;
  height: 150px;
  padding: 20px;
  border-radius: 20px;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 20px 0px rgba(215, 215, 215, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const InfoTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;

const Title = styled.div`
  ${(props) => props.theme.fonts.b2_bold};
`;

const Comment = styled.div`
  color: ${theme.colors.purple300};
  ${(props) => props.theme.fonts.c3_medium};
  font-size: 13px;
`;

const Score = styled.div`
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.c3_bold};
`;

const ScoreBarWrapper = styled.div`
  width: calc(100% - 40px);
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;

const MoreReview = styled.button`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b3_medium};
  text-decoration-line: underline;
  margin-top: auto;
`;

const NoUser = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${theme.colors.gray800};
  ${(props) => props.theme.fonts.b3_regular}

  @media screen and (max-width: 400px) {
    ${(props) => props.theme.fonts.c1_regular}
  }
`;

const StyleBox = styled(ScoreBox)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  position: relative;
`;

const Edit = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.c2_medium};
  position: absolute;
  top: 12px;
  right: 12px;
`;

const StyleBoxDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SpecText = styled(LevelText)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  margin-top: 10px;
  row-gap: 3px;
`;

const StyleText = styled(LevelText)`
  margin-top: 10px;
  row-gap: 3px;
`;

const Keywords = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;

const Keyword = styled.div<{ type: number }>`
  color: ${({ type, theme }) => {
    if (type === 1) return "#e071d5";
    if (type === 2) return theme.colors.purple500;
    return theme.colors.gray800;
  }};
  ${(props) => props.theme.fonts.c3_semiBold};
  padding: 3px 6px;
  border: 1px solid
    ${({ type, theme }) => {
      if (type === 1) return "#e071d5";
      if (type === 2) return theme.colors.purple500;
      return theme.colors.gray800;
    }};
  border-radius: 10px;
  background: ${({ type, theme }) => {
    if (type === 1) return "#f8e4ff";
    if (type === 2) return theme.colors.purple150;
    return theme.colors.gray100;
  }};
`;

/* 인디케이터 */
const IndicatorContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 50%;
  height: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ active }) =>
    active ? theme.colors.gray900 : theme.colors.gray400};
  border-radius: 3px;
  cursor: pointer;
  ${(props) => props.theme.fonts.b3_medium};
`;
