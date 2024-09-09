import styled from "styled-components";
import Post from "../home/Post";
import { PostList } from "@/type/post";
import { useEffect, useState } from "react";
import AuthAxios from "@/api/authAxios";
import { theme } from "@/styles/theme";

const TransShareContent = () => {
  const [postList, setPostList] = useState<PostList[]>();

  /* 거래 현황 > 공유 목록 조회 */
  useEffect(() => {
    AuthAxios.get("/api/v1/closet/share-history")
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

  return (
    <>
      {postList && postList?.length > 0 ? (
        <ListContainer>
          {postList?.map((data, index) => (
            <PostContainer key={data.id}>
              <Post
                id={data.id}
                postType="transition"
                imgUrl={data.imgUrl}
                title={data.title}
                minPrice={data.minPrice}
                minDays={data.minDays}
                startDate={data.startDate}
                endDate={data.endDate}
                nickname={data.nickname}
                isDeleted={data.isDeleted}
                roomId={data.roomId}
              />
              {index < postList.length - 1 && <Divider />}
            </PostContainer>
          ))}
        </ListContainer>
      ) : (
        <NoData>
          <>
            공유 내역이 없어요.
            <br />
            자세한 글 작성으로 대여율을 높여봐요!
          </>
        </NoData>
      )}
    </>
  );
};

export default TransShareContent;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 0.5px;
  background-color: rgba(219, 219, 219, 0.7);
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
