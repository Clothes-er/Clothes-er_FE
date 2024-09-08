import { PostList } from "@/type/post";
import { useEffect, useState } from "react";
import AuthAxios from "@/api/authAxios";
import Post from "../home/Post";
import styled from "styled-components";
import { theme } from "@/styles/theme";

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
    <>
      {postList && postList?.length > 0 ? (
        <ListContainer>
          {postList.map((data) => (
            <Post
              key={data.id}
              postType="my"
              id={data.id}
              imgUrl={data.imgUrl}
              title={data.title}
              minPrice={data.minPrice}
              createdAt={data.createdAt}
              nickname={data.nickname}
              brand={data.brand}
            />
          ))}
        </ListContainer>
      ) : (
        <NoData>
          <>등록한 대여글이 없네요!</>
        </NoData>
      )}
    </>
  );
};

export default MyShareContent;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
