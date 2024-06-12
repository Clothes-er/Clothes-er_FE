"use client";

import AuthAxios from "@/api/authAxios";
import Header from "@/components/common/Header";
import Bottom from "@/components/home/Bottom";
import Profile from "@/components/home/Profile";
import { Gender, getGenderLabel } from "@/interface/Gender";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "../../../styles/slick.css";
import "../../../styles/slick-theme.css";
import NextArrow from "@/components/common/NextArrow";
import PrevArrow from "@/components/common/PrevArrow";

interface Price {
  days: number;
  price: number;
}

interface PostInfo {
  id: number;
  profileUrl: string;
  nickname: string;
  isWriter: boolean;
  followers: number;
  followees: number;
  imgUrls: string[];
  title: string;
  description: string;
  gender: Gender;
  category: string;
  style: String;
  prices: Price[];
  brand: string;
  size: string;
  fit: string;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [menu, setMenu] = useState(false);
  const [postInfo, setPostInfo] = useState<PostInfo>();

  const handleBackButtonClick = () => {
    router.back();
  };

  const handleMoreMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    AuthAxios.get(`/api/v1/rentals/${id}`)
      .then((response) => {
        const data = response.data.result;
        setPostInfo(data);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            <Menu>
              {/* <Image
                src="/assets/icons/ic_more_vertical.svg"
                width={24}
                height={24}
                alt="more"
                onClick={handleMoreMenu}
                style={{ cursor: "pointer" }}
              />
              {menu && <ModifyMenu />} */}
            </Menu>
          </Top>
        </Head>
        {postInfo?.imgUrls && postInfo?.imgUrls?.length > 1 ? (
          <ImageSlide>
            <StyledSlider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              prevArrow={
                <Div>
                  <PrevArrow />
                </Div>
              }
              nextArrow={
                <DivNext>
                  <NextArrow />
                </DivNext>
              }
            >
              {postInfo?.imgUrls?.map((url, index) => (
                <ImageBox key={index}>
                  <Image src={url} alt={`image-${index}`} layout="fill" />
                </ImageBox>
              ))}
            </StyledSlider>
          </ImageSlide>
        ) : (
          <>
            {postInfo?.imgUrls?.map((url, index) => (
              <ImageBox key={index}>
                <Image src={url} alt={`image-${index}`} layout="fill" />
              </ImageBox>
            ))}
          </>
        )}
        <Profile nickname={postInfo?.nickname ? postInfo.nickname : ""} />
        <Body>
          <Title>{postInfo?.title}</Title>
          <Category>
            {postInfo?.gender && getGenderLabel(postInfo?.gender)}
            {postInfo?.category && postInfo?.gender
              ? ` / ${postInfo?.category}`
              : postInfo?.category}
            {postInfo?.style && (postInfo?.gender || postInfo?.category)
              ? ` / ${postInfo?.style}`
              : postInfo?.style}
          </Category>
          <Info>
            <Row>
              <div>브랜드</div>
              <div>{postInfo?.brand ? postInfo.brand : "없음"}</div>
            </Row>
            <Row>
              <div>사이즈</div>
              <div>{postInfo?.size ? postInfo.size : "없음"}</div>
            </Row>
            <Row>
              <div>핏</div>
              <div>{postInfo?.fit ? postInfo.fit : "없음"}</div>
            </Row>
          </Info>
          <Box>{postInfo?.description}</Box>
        </Body>
      </Layout>
      {postInfo && <Bottom id={postInfo.id} prices={postInfo.prices} />}
    </>
  );
};

export default Page;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
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

const Menu = styled.div`
  position: relative;
`;

const ImageSlide = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 7px;
  .slick-slide img {
    width: 100%;
    height: 400px;
    border-radius: 7px;
  }
`;

const StyledSlider = styled(Slider)`
  height: 400px;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  z-index: 30;
`;

const DivNext = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  z-index: 30;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
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
