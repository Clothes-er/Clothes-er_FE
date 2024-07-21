"use client";
import AuthAxios from "@/api/authAxios";
import ListTab from "@/components/common/ListTab";
import Tabbar from "@/components/common/Tabbar";
import Topbar from "@/components/common/Topbar";
import ScoreBar from "@/components/myCloset/ScoreBar";
import { getLevelText } from "@/data/levelData";
import { useRequireAuth } from "@/hooks/useAuth";
import { getGenderLabel } from "@/interface/Gender";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ProfileInfo {
  nickname: string;
  profileUrl: string;
  gender: string;
  level: number;
  rentalCount: number;
  height: number;
  weight: number;
  shoeSize: number;
  bodyShapes: string[];
  categories: string[];
  styles: string[];
  followers: number;
  followees: number;
}

const MyCloset = () => {
  useRequireAuth();
  const router = useRouter();

  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AuthAxios.get("/api/v1/users/profile")
      .then((response) => {
        const data = response.data.result;
        setProfileInfo(data);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
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
      setCurrentSlide(slideIndex);
    }
  };

  return (
    <>
      <Layout>
        <Background />
        {profileInfo && (
          <>
            <Image
              src="/assets/images/logo_black.svg"
              width={101}
              height={18}
              alt="logo"
              onClick={() => router.push("/home")}
              style={{ cursor: "pointer" }}
            />
            <TopRow>
              <Topbar text="내 옷장" align="left" />
              <Image
                src="/assets/icons/ic_setting.svg"
                width={24}
                height={24}
                alt="setting"
                onClick={() => router.push("/mycloset/setting")}
                style={{ cursor: "pointer" }}
              />
            </TopRow>
            <Profile>
              {profileInfo?.profileUrl && (
                <Image
                  src={
                    `${profileInfo.profileUrl}` ||
                    `/assets/images/basic_profile.svg`
                  }
                  width={70}
                  height={70}
                  alt="profile"
                  style={{ borderRadius: "100px", background: "white" }}
                />
              )}
              <Text>
                <Top>
                  <Nickname>
                    {profileInfo?.nickname}

                    <Gender>{getGenderLabel(profileInfo.gender)}</Gender>
                  </Nickname>
                  <ProfileButton
                    onClick={() => router.push("/mycloset/profile")}
                  >
                    프로필 수정
                  </ProfileButton>
                </Top>
                <Level>
                  {profileInfo?.level &&
                    `${getLevelText(profileInfo.level) + ""} (Lv. ${
                      profileInfo?.level
                    })`}
                  <LevelText>
                    {profileInfo?.rentalCount}개의 옷을 아꼈어요!
                  </LevelText>
                </Level>
              </Text>
            </Profile>
          </>
        )}
        <SliderContainer>
          <Slider ref={sliderRef}>
            <Slide>
              <ScoreBox>
                <InfoTop>
                  <Title>옷장점수</Title>
                  <Comment>당신은 멀끔한 옷장을 가졌군요!</Comment>
                  <Score>10점</Score>
                </InfoTop>
                <ScoreBar recentScore={10} />
                <MoreReview>거래 후기 확인하기</MoreReview>
              </ScoreBox>
            </Slide>
            <Slide>
              <StyleBox>
                <StyleBoxDiv>
                  <div>
                    <Title>스펙</Title>
                    <SpecText>
                      <div>키</div>
                      <div>
                        {profileInfo?.height
                          ? `${profileInfo.height}cm`
                          : "미공개"}
                      </div>
                      <div>몸무게</div>
                      <div>
                        {profileInfo?.weight
                          ? `${profileInfo.weight}kg`
                          : "미공개"}
                      </div>
                      <div>발 크기</div>
                      <div>
                        {profileInfo?.shoeSize
                          ? `${profileInfo.shoeSize}mm`
                          : "미공개"}
                      </div>
                    </SpecText>
                  </div>
                  <Keywords>
                    {profileInfo?.bodyShapes[0] ? (
                      <>
                        {profileInfo?.bodyShapes.map((data, index) => (
                          <Keyword key={index} type={1}>
                            {data}
                          </Keyword>
                        ))}
                      </>
                    ) : (
                      <Keyword type={1}>체형정보 미기입</Keyword>
                    )}
                  </Keywords>
                </StyleBoxDiv>
                <StyleBoxDiv>
                  <div>
                    <Title>취향</Title>
                    <StyleText>
                      {profileInfo?.categories.map((data, index) => (
                        <span key={index}>
                          {data}
                          {`  `}
                        </span>
                      ))}
                    </StyleText>
                  </div>
                  <Keywords>
                    {profileInfo?.styles[0] ? (
                      <>
                        {profileInfo?.styles.map((data, index) => (
                          <Keyword key={index} type={0}>
                            {data}
                          </Keyword>
                        ))}
                      </>
                    ) : (
                      <Keyword type={0}>스타일 미기입</Keyword>
                    )}
                  </Keywords>
                </StyleBoxDiv>
              </StyleBox>
            </Slide>
          </Slider>
          <IndicatorContainer>
            <Indicator onClick={() => goToSlide(0)} active={currentSlide === 0}>
              {/* 스코어 박스 */}
            </Indicator>
            <Indicator onClick={() => goToSlide(1)} active={currentSlide === 1}>
              {/* 스타일 박스 */}
            </Indicator>
          </IndicatorContainer>
        </SliderContainer>
        <ListTab />
      </Layout>
      <Tabbar />
    </>
  );
};

export default MyCloset;

const Layout = styled.div`
  width: 100%;
  height: 100vh;
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
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 13px;
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
  ${(props) => props.theme.fonts.c3_medium};
  margin-top: 5px;
`;

const ProfileButton = styled.button`
  width: 74px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: ${theme.colors.purple50};
  color: ${theme.colors.b200};
  ${(props) => props.theme.fonts.c2_medium};
  white-space: nowrap;
  cursor: pointer;
`;

const Level = styled.div`
  height: 21px;
  display: flex;
  flex-direction: column;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.b3_medium};
`;

const LevelText = styled.div`
  color: ${theme.colors.b200};
  ${(props) => props.theme.fonts.c3_medium};
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
  ${(props) => props.theme.fonts.b3_bold};
`;

const Comment = styled.div`
  color: ${theme.colors.purple300};
  ${(props) => props.theme.fonts.c3_medium};
`;

const Score = styled.div`
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.c3_bold};
`;

const MoreReview = styled.button`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b3_medium};
  text-decoration-line: underline;
  margin-top: auto;
  border: none;
  background: none;
`;

const StyleBox = styled(ScoreBox)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
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
`;

const Keyword = styled.div<{ type: number }>`
  color: ${({ type, theme }) =>
    type === 1 ? "#e071d5" : theme.colors.purple500};
  ${(props) => props.theme.fonts.c3_semiBold};
  padding: 3px 6px;
  border: 1px solid
    ${({ type, theme }) => (type === 1 ? "#e071d5" : theme.colors.purple500)};
  border-radius: 10px;
  background: ${({ type, theme }) =>
    type === 1 ? "#f8e4ff" : theme.colors.purple150};
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
