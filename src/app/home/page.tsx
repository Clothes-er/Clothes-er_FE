"use client";

import Topbar from "@/components/common/Topbar";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/styles/theme";
import Header from "@/components/common/Header";
import Filter from "@/components/common/Filter";
import Post from "@/components/home/Post";
import Tabbar from "@/components/common/Tabbar";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import AuthAxios from "@/api/authAxios";
import { getCoordsAddress } from "@/hooks/getCoordsAddress";
import { useRequireAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { categoryMsg } from "@/data/category";
import CategoryCard from "@/components/common/CategoryCard";
import {
  SkeletonPost,
  SkeletonText,
  SkeletonCircle,
  SkeletonBox,
  SkeletonDiv,
} from "@/components/common/Skeleton";
import { getToken } from "@/hooks/getToken";

interface PostList {
  id: number;
  imgUrl: string;
  nickname: string;
  title: string;
  minPrice: number;
  createdAt: string;
}

const Home = () => {
  useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  /* 검색 및 필터링을 위한 상태 관리 */
  const [postList, setPostList] = useState<PostList[]>([]);
  const [location, setLocation] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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

  const situation = searchParams.get("situation");

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

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
    if (situation) {
      params.append("situation", situation);
    }
    return params.toString();
  };

  /* 위치 정보 받아오기 */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 로딩 시작
      console.log("토큰", getToken());
      try {
        const response = await AuthAxios.get(`/api/v1/users/address`);
        const latitude = response.data.result.latitude;
        const longitude = response.data.result.longitude;
        console.log("데이터", response.data);
        console.log(response.data.message);
        const newLocation = await getCoordsAddress(longitude, latitude);
        setLocation(newLocation);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [location, postList]);

  /* 대여글 목록 조회(검색, 필터링, 카테고리) */
  useEffect(() => {
    const fetchPostList = async () => {
      setLoading(true); // 로딩 시작
      try {
        const queryString = buildQueryString(); // Query String 생성
        console.log("queryString", queryString);
        const response = await AuthAxios.get(`/api/v1/rentals?${queryString}`);
        const data = response.data.result;
        console.log("쿼리 응답 성공");
        setPostList(data);
        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    if (location) {
      fetchPostList();
    }
  }, [
    location,
    search,
    sort,
    gender,
    minHeight,
    maxHeight,
    age,
    category,
    style,
    situation,
  ]);

  const handleCardClick = (params: string) => {
    if (selectedCard === params) {
      setSelectedCard(null);
      router.push("/home");
    } else {
      setSelectedCard(params);
      router.push(`/home?situation=${params}`);
    }
  };

  return (
    <>
      <Contain>
        <Layout>
          <Header />
          <Topbar text="홈" align="left" />
          <Location onClick={() => router.push("/home/location")}>
            <Image
              src="/assets/icons/ic_pin.svg"
              width={24}
              height={24}
              alt="pin"
            />
            {loading ? "Loading..." : location || "위치를 설정해 주세요"}
          </Location>
          <Content>
            <SearchBox
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="원하는 상품명을 검색하세요!"
            />
            <Filter onClick={() => router.push("/home/filter")} />
            <CategorySlider>
              {categoryMsg.map((item) => (
                <CategoryCard
                  key={item.id}
                  keyword={item.keyword}
                  description={item.description}
                  image={item.image}
                  color={item.color}
                  params={item.params}
                  selectedCard={selectedCard}
                  onClick={() => handleCardClick(item.params)}
                />
              ))}
            </CategorySlider>
            {loading ? (
              // 로딩 중일 때 스켈레톤 UI 표시
              <>
                <SkeletonPost>
                  <SkeletonCircle />
                  <SkeletonDiv>
                    <SkeletonText width="60%" />
                    <SkeletonText width="40%" />
                  </SkeletonDiv>
                </SkeletonPost>
                <SkeletonPost>
                  <SkeletonCircle />
                  <SkeletonDiv>
                    <SkeletonText width="60%" />
                    <SkeletonText width="40%" />
                  </SkeletonDiv>
                </SkeletonPost>
                <SkeletonPost>
                  <SkeletonCircle />
                  <SkeletonDiv>
                    <SkeletonText width="60%" />
                    <SkeletonText width="40%" />
                  </SkeletonDiv>
                </SkeletonPost>
              </>
            ) : (
              // 로딩 완료 후 실제 데이터 표시
              <Posts>
                {postList?.map((data, index) => (
                  <PostContainer key={data.id}>
                    <Post
                      key={data.id}
                      id={data.id}
                      imgUrl={data.imgUrl}
                      title={data.title}
                      minPrice={data.minPrice}
                      createdAt={data.createdAt}
                      nickname={data.nickname}
                    />
                    {index < postList.length - 1 && <Divider />}
                  </PostContainer>
                ))}
              </Posts>
            )}
          </Content>
        </Layout>
        <Edit onClick={() => router.push("/home/write/choice")}>
          <Image
            src="/assets/icons/ic_edit.svg"
            width={48}
            height={48}
            alt="edit"
          />
        </Edit>
      </Contain>
      <Tabbar />
    </>
  );
};

export default function HomePaging() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}

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

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${(props) => props.theme.fonts.b2_medium};
  cursor: pointer;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBox = styled.input`
  width: calc(100% - 20px);
  height: 50px;
  margin: 23px 0 31px 0;
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

const CategorySlider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  gap: 10px;
  flex-wrap: nowrap;
  margin-top: 15px;
  margin-bottom: 15px;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
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

const Edit = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50px;
  background: ${theme.colors.purple400};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  position: absolute;
  bottom: 100px;
  right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  cursor: pointer;
`;
