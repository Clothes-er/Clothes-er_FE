"use client";

import Topbar from "@/components/common/Topbar";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/styles/theme";
import Header from "@/components/common/Header";
import Filter from "@/components/common/Filter";
import Post from "@/components/home/Post";
import { postList } from "@/data/homeData";
import Tabbar from "@/components/common/Tabbar";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

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
            강남구 역삼로 150길
          </Location>
          <Content>
            <SearchBox placeholder="원하는 상품명을 검색하세요!"></SearchBox>
            <Filter />
            <Posts>
              {postList.map((data) => (
                <Post
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  minPrice={data.minPrice}
                  createdAt={data.createdAt}
                  nickname={data.nickname}
                />
              ))}
            </Posts>
          </Content>
        </Layout>
        <Edit onClick={() => router.push("/home/write")}>
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

export default Home;

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
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.gray500};
    ${(props) => props.theme.fonts.b2_regular};
  }
`;

const Posts = styled.div`
  width: 100%;
  margin-top: 16px;
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
