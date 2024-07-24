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

interface PostList {
  id: number;
  imgUrl: string;
  nickname: string;
  title: string;
  minPrice: number;
  createdAt: string;
}

const ClosetPage = () => {
  useRequireAuth();
  const router = useRouter();
  // const [postList, setPostList] = useState<PostList[]>();

  return (
    <>
      <Contain>
        <Layout>
          <Header />
          <Topbar text="옷장 구경" align="left" />

          <Content>
            <Filter />
            {/* <Posts>
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
            </Posts> */}
            <GridContainer>
              <SquarePost />
              <SquarePost />
              <SquarePost />
              <SquarePost />
              <SquarePost />
              <SquarePost />
              <SquarePost />
              <SquarePost />
            </GridContainer>
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

// const Posts = styled.div`
//   width: 100%;
// `;

// const PostContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const Divider = styled.div`
//   height: 0.5px;
//   background-color: rgba(219, 219, 219, 0.7);
// `;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px 0;
  justify-content: center;
  row-gap: 15px;
  column-gap: 22px;
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
