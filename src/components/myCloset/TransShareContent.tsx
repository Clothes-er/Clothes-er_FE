import styled from "styled-components";
import Post from "../home/Post";
import { PostList } from "@/type/post";
import { useEffect, useState } from "react";
import AuthAxios from "@/api/authAxios";

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
    <ListContainer>
      {postList?.map((data, index) => (
        <PostContainer key={data.id}>
          <Post
            id={data.id}
            postType="rental"
            imgUrl={data.imgUrl}
            title={data.title}
            minPrice={data.minPrice}
            startDate={data.startDate}
            endDate={data.endDate}
            nickname={data.nickname}
            isDeleted={data.isDeleted}
          />
          {index < postList.length - 1 && <Divider />}
        </PostContainer>
      ))}
    </ListContainer>
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
