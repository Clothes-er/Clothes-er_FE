"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "@/components/home/Post";
import AuthAxios from "@/api/authAxios";
import { postList, PostList } from "@/data/homeData";
import { theme } from "@/styles/theme";

const WriteChoice = () => {
  const router = useRouter();

  // 추후 보유글 목록 조회 API 연동 후 수정
  // const [postList, setPostList] = useState<PostList[]>();

  // 예시 데이터 - 추후 삭제
  const [exPostList, setExPostList] = useState<PostList[] | undefined>(
    postList
  );

  const [clothesId, setClothesId] = useState<number | undefined>();

  /* 보유글 목록 조회 */
  // useEffect(() => {
  //   AuthAxios.get("/api/v1/clothes")
  //     .then((response) => {
  //       const data = response.data.result;
  //       setPostList(data);
  //       console.log(data);
  //       console.log(response.data.message);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleClickChoice = (id: number) => {
    if (clothesId === id) {
      setClothesId(undefined);
    } else {
      setClothesId(id);
    }
  };

  const handleChoicePost = () => {
    router.push(`/home/write/post?clothesId=${clothesId}`);
  };

  return (
    <Layout>
      <div>
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Top>
          <Image
            src="/assets/icons/ic_arrow.svg"
            width={24}
            height={24}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          대여 글 작성
        </Top>
        <Sub>보유 목록 중 대여 글 작성할 옷을 선택해주세요.</Sub>
        <Content>
          <Posts>
            {exPostList?.map((data, index) => (
              <PostContainer key={data.id}>
                <Post
                  key={data.id}
                  id={data.id}
                  imgUrl={data.imgUrl}
                  title={data.title}
                  minPrice={data.minPrice}
                  createdAt={data.createdAt}
                  nickname={data.nickname}
                  onClickChoice={handleClickChoice}
                  isSelected={clothesId === data.id}
                />
                {index < exPostList.length - 1 && <Divider />}
              </PostContainer>
            ))}
          </Posts>
        </Content>
      </div>
      <SubmitButton>
        <Button
          buttonType="primary"
          size="large"
          text="선택 완료"
          onClick={handleChoicePost}
          disabled={!clothesId}
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

const Top = styled.div`
  width: calc(50% + 60px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 15px;
  ${(props) => props.theme.fonts.h2_bold};
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
