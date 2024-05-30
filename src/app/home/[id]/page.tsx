"use client";

import Header from "@/components/common/Header";
import Bottom from "@/components/home/Bottom";
import Profile from "@/components/home/Profile";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Page = () => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const handleBackButtonClick = () => {
    router.back();
  };

  const handleMoreMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <Layout>
        <Head>
          <Header />
          <Top>
            <Image
              src="/assets/icons/ic_arrow.svg"
              width={24}
              height={24}
              alt="back"
              onClick={handleBackButtonClick}
              style={{ cursor: "pointer" }}
            />
            공유 옷장
            <Image
              src="/assets/icons/ic_more_vertical.svg"
              width={24}
              height={24}
              alt="more"
              onClick={handleMoreMenu}
              style={{ cursor: "pointer" }}
            />
          </Top>
        </Head>
        <ImageSlide></ImageSlide>
        <Profile nickname="러블리걸" />
        <Body>
          <Title>제목</Title>
          <Category>여성 / 블라우스 / 러블리</Category>
          <Info>
            <Row>
              <div>브랜드</div>
              <div>없음</div>
            </Row>
            <Row>
              <div>사이즈</div>
              <div>Free</div>
            </Row>
            <Row>
              <div>핏</div>
              <div>정핏</div>
            </Row>
          </Info>
          <Box>
            리본이 포인트인 봄 블라우스입니다. 러블리한 스타일의 옷을 시도해보고
            싶으신 분이 입으시면 좋을 것 같아요.
          </Box>
        </Body>
      </Layout>
      <Bottom />
    </>
  );
};

export default Page;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const Head = styled.div`
  width: 100%;
  padding: 35px 30px 12px 30px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.theme.fonts.h2_bold};
`;

const ImageSlide = styled.div`
  width: 100%;
  height: 270px;
  border-radius: 7px;
  background-color: black;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 48px;
  gap: 14px;
`;

const Title = styled.div`
  ${(props) => props.theme.fonts.h2_medium};
`;

const Category = styled.div`
  color: ${theme.colors.gray900};
  ${(props) => props.theme.fonts.b2_regular};
`;

const Info = styled.div`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_regular};
`;

const Row = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
`;

const Box = styled.div`
  width: 100%;
  min-height: 150px;
  padding: 17px;
  border-radius: 7px;
  border: 1px solid ${theme.colors.gray400};
  background: ${theme.colors.white};
  box-shadow: 0px 4px 15px 5px rgba(149, 149, 149, 0.25);
  ${(props) => props.theme.fonts.b2_regular};
  color: ${theme.colors.b100};
`;
