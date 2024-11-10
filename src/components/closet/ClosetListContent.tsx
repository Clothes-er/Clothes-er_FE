import { ClosetPostList } from "@/type/post";
import React, { useEffect, useState } from "react";
import SquarePost from "../common/SquarePost";
import AuthAxios from "@/api/authAxios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Filter from "../common/Filter";
import { useRouter } from "next/navigation";

type closetListType = "all" | "follow";

interface ClosetListContentProps {
  type: closetListType;
}

const ClosetListContent = (props: ClosetListContentProps) => {
  const { type } = props;

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

    if (type === "follow") {
      params.append("isFollowing", "true");
    } else {
      params.append("isFollowing", "false");
    }

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
        console.log("보유글", data);
        setPostList(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, sort, gender, age, category, style, type]);

  return (
    <Content>
      <SearchBox
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="원하는 상품명을 검색하세요!"
      />
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
  );
};

export default ClosetListContent;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBox = styled.input`
  width: calc(100% - 20px);
  height: 50px;
  margin: 0 0 31px 0;
  padding: 16px 20px;
  border-radius: 5px;
  border: none;
  background: ${theme.colors.white};
  box-shadow: 0px 4px 30px 5px rgba(149, 149, 149, 0.25);
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_regular};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.gray500};
    ${(props) => props.theme.fonts.b2_regular};
  }
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
