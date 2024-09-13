"use client";

import Topbar from "@/components/common/Topbar";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Header from "@/components/common/Header";
import Filter from "@/components/common/Filter";
import Tabbar from "@/components/common/Tabbar";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/hooks/useAuth";
import SquarePost from "@/components/common/SquarePost";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AuthAxios from "@/api/authAxios";
import { ClosetPostList } from "@/type/post";

const ClosetPage = () => {
  useRequireAuth();
  const router = useRouter();
  const [postList, setPostList] = useState<ClosetPostList[]>();
  const [search, setSearch] = useState<string>("");

  const sort = useSelector((state: RootState) => state.filter.selectedSort);
  const gender = useSelector((state: RootState) => state.filter.selectedGender);
  const minHeight = useSelector(
    (state: RootState) => state.filter.selectedMinHeight
  );
  const maxHeight = useSelector(
    (state: RootState) => state.filter.selectedMaxHeight
  );
  const age = useSelector((state: RootState) => state.filter.selectedAge);
  const category = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );
  const style = useSelector((state: RootState) => state.filter.selectedStyle);

  /* Query String 생성 함수 */
  const buildQueryString = () => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    if (gender.length > 0) params.append("gender", gender.join(","));
    if (minHeight !== 130 || maxHeight !== 200) {
      params.append("minHeight", String(minHeight));
      params.append("maxHeight", String(maxHeight));
    }
    if (age.length > 0)
      params.append("age", age.map((a) => a.replace(/\s+/g, "")).join(","));
    if (category.length > 0)
      params.append(
        "category",
        category.map((c) => c.replace(/\s+/g, "")).join(",")
      );
    if (style.length > 0)
      params.append("style", style.map((s) => s.replace(/\s+/g, "")).join(","));

    return params.toString();
  };

  /* 보유글 목록 조회(검색, 필터링) */
  useEffect(() => {
    const queryString = buildQueryString(); // Query String 생성

    console.log(queryString);
    AuthAxios.get(`/api/v1/clothes?${queryString}`)
      .then((response) => {
        const data = response.data.result;
        console.log("보유글 목록 조회 성공");
        setPostList(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, sort, gender, age, category, style]);

  return (
    <>
      <Contain>
        <Layout>
          <Header />
          <Topbar text="옷장 구경" align="left" />
          <Content>
            <Filter onClick={() => router.push("/closet/filter")} />
            {postList && postList.length > 0 ? (
              <GridContainer>
                {postList.map((data) => (
                  <SquarePost
                    key={data.id}
                    id={data.id}
                    userSid={data.userSid}
                    nickname={data.nickname}
                    imgUrl={data.imgUrl}
                    name={data.name}
                    createdAt={data.createdAt}
                  />
                ))}
              </GridContainer>
            ) : (
              <NoData>
                {buildQueryString() === "" ? (
                  <>
                    아직 다른 유저들의 옷장이 채워져있지 않습니다!
                    <br />
                    옷장을 채워볼까요?
                  </>
                ) : (
                  <>
                    해당 필터링에 대한 검색 결과가 없습니다 :(
                    <br />
                    다른 조건으로 검색해보는 건 어떨까요?
                  </>
                )}
              </NoData>
            )}
          </Content>
        </Layout>
      </Contain>
      <Tabbar />
    </>
  );
};

export default ClosetPage;

const Contain = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Layout = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  overflow-x: hidden;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px 0;
  justify-content: center;
  row-gap: 15px;
  column-gap: 22px;
  margin-top: 10px;
`;

const NoData = styled.div`
  width: 100%;
  height: 100%;
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
