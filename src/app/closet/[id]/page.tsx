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
import { useRequireAuth } from "@/hooks/useAuth";
import MoreBox from "@/components/common/MoreBox";
import Modal from "@/components/common/Modal";

interface PostInfo {
  id: number;
  rentalId: number;
  userSid: string;
  profileUrl: string;
  nickname: string;
  isWriter: boolean;
  imgUrls: string[];
  name: string;
  description: string;
  gender: Gender;
  category: string;
  style: String;
  price: number;
  brand: string;
  size: string;
  shoppingUrl: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  useRequireAuth();
  const router = useRouter();
  const { id } = useParams();
  const [menu, setMenu] = useState<boolean>(false);
  const [postInfo, setPostInfo] = useState<PostInfo>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleBackButtonClick = () => {
    router.back();
  };

  const handleMoreMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    AuthAxios.get(`/api/v1/clothes/${id}`)
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

  const handleModifyClick = () => {
    router.push(`/closet/${id}/modify`);
    /* closet > modify 페이지 현재 X */
  };

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleReportClick = () => {
    router.push(
      `/report?type=closet&userSid=${postInfo?.userSid}&nickname=${postInfo?.nickname}`
    );
  };

  const handleSubmitDelete = () => {
    AuthAxios.delete(`/api/v1/clothes/${id}`)
      .then((response) => {
        const data = response.data.result;
        setDeleteModal(true);
        router.push("/closet");
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
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
            옷장 구경
            <Menu>
              <Image
                src="/assets/icons/ic_more_vertical.svg"
                width={24}
                height={24}
                alt="more"
                onClick={handleMoreMenu}
                style={{ cursor: "pointer" }}
              />
              {menu && (
                <MoreBox
                  type={postInfo?.isWriter ? "me" : "other"}
                  modifyOnClick={handleModifyClick}
                  deleteOnClick={handleDeleteClick}
                  reportOnClick={handleReportClick}
                />
              )}
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
        <Profile
          nickname={postInfo?.nickname ? postInfo.nickname : ""}
          profileUrl={postInfo?.profileUrl ? postInfo.profileUrl : ""}
          onClick={() => router.push(`/user/${postInfo?.userSid}`)}
        />
        <Body>
          <Title>{postInfo?.name}</Title>
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
              <Label>옷 정보</Label>
              <div>
                <ShoppingUrl
                  href={postInfo?.shoppingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    maxWidth: "80%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    verticalAlign: "middle",
                  }}
                >
                  {postInfo?.shoppingUrl}
                </ShoppingUrl>
              </div>
            </Row>
            <Row>
              <Label>구매처</Label>
              <div>{postInfo?.brand}</div>
            </Row>
            <Row>
              <Label>구매 가격</Label>
              <div>{postInfo?.price}원</div>
            </Row>
          </Info>
          <div>옷 후기</div>
          <Box>{postInfo?.description}</Box>
        </Body>
      </Layout>
      {postInfo && (
        <Bottom
          type="user"
          id={postInfo.id}
          rentalId={postInfo.rentalId}
          bottomType="closet"
          userSid={postInfo.userSid}
          isWriter={postInfo.isWriter}
        />
      )}
      {/* 삭제하기 모달 */}
      {deleteModal && (
        <Modal
          title="정말 삭제하시겠습니까?"
          text="채팅 중인 글의 경우, 삭제를 주의해주세요."
          no="취소"
          yes="삭제"
          onClose={() => setDeleteModal(false)}
          onCheck={handleSubmitDelete}
          width="305px"
          height="170px"
        />
      )}
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
  width: 100%;
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_regular};
  text-align: left;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const Label = styled.div`
  min-width: 105px;
  white-space: nowrap;
`;

const ShoppingUrl = styled.a`
  :hover {
    text-decoration: underline;
  }
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
