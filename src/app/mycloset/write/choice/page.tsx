"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "@/components/home/Post";
import AuthAxios from "@/api/authAxios";
import { theme } from "@/styles/theme";
import { PostList } from "@/type/post";
import Topbar from "@/components/common/Topbar";

const WriteChoice = () => {
  const router = useRouter();
  const [postList, setPostList] = useState<PostList[]>();
  const [rentalId, setRentalId] = useState<number | null>(null);

  /* 보유 옷이 없는 나의 대여글 목록 조회 */
  useEffect(() => {
    AuthAxios.get("/api/v1/clothes/my-rentals")
      .then((response) => {
        const data = response.data.result;
        setPostList(data);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClickChoice = (id: number) => {
    if (rentalId === id) {
      setRentalId(null);
    } else {
      setRentalId(id);
    }
  };

  const handleChoicePost = () => {
    router.push(`/mycloset/write?rentalId=${rentalId}`);
  };

  return (
    <Layout>
      <Container>
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Topbar text="보유 글 작성" icon={true} align="center" />
        <Sub>대여 목록 중 보유 글 작성할 옷을 선택해주세요.</Sub>
        <Content>
          {postList && postList.length > 0 ? (
            <Posts>
              {postList?.map((data, index) => (
                <PostContainer key={data.id}>
                  <Post
                    key={data.id}
                    id={data.id}
                    imgUrl={data.imgUrl}
                    title={data.title}
                    minPrice={data.minPrice}
                    minDays={data.minDays}
                    brand={data.brand}
                    createdAt={data.createdAt}
                    onClickChoice={handleClickChoice}
                    isSelected={rentalId === data.id}
                  />
                  {index < postList.length - 1 && <Divider />}
                </PostContainer>
              ))}
            </Posts>
          ) : (
            <NoData>선택 가능한 대여 옷이 없습니다!</NoData>
          )}
        </Content>
      </Container>
      <SubmitButton>
        <Button
          buttonType="primary"
          size="large"
          text={rentalId ? "선택 완료" : "미선택"}
          onClick={handleChoicePost}
        />
      </SubmitButton>
    </Layout>
  );
};

export default WriteChoice;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 37px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Sub = styled.div`
  width: 100%;
  text-align: center;
  margin: 27px 0;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.b2_semiBold};
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Posts = styled.div`
  width: 100%;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 0.5px;
  background-color: rgba(219, 219, 219, 0.7);
`;

const SubmitButton = styled.div`
  position: sticky;
  bottom: 20px;
  left: 50%;
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
