import { PostList } from "@/data/homeData";
import { useEffect, useState } from "react";
import AuthAxios from "@/api/authAxios";
import Post from "../home/Post";
import styled from "styled-components";

interface MyShareContentProps {
  userSid?: string;
}

const MyShareContent: React.FC<MyShareContentProps> = ({ userSid }) => {
  const [postList, setPostList] = useState<PostList[]>();

  /* 보유 > 공유 등록 목록 조회 */
  useEffect(() => {
    const url = userSid
      ? `/api/v1/closet/${userSid}/rentals`
      : `/api/v1/closet/rentals`;
    AuthAxios.get(url)
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
      {postList?.map((data) => (
        <Post
          key={data.id}
          id={data.id}
          imgUrl={data.imgUrl}
          title={data.title}
          minPrice={data.minPrice}
          createdAt={data.createdAt}
          nickname={data.nickname}
        />
      ))}
    </ListContainer>
  );
};

export default MyShareContent;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
