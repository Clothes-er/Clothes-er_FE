import styled from "styled-components";
import SquarePost from "../common/SquarePost";
import { useEffect, useState } from "react";
import AuthAxios from "@/api/authAxios";
import { PostList } from "@/data/homeData";

interface MyClosetContentProps {
  userSid?: string;
}

const MyClosetContent: React.FC<MyClosetContentProps> = ({ userSid }) => {
  // const [postList, setPostList] = useState<PostList[]>();

  // /* 보유 > 옷장 등록 목록 조회 */
  // useEffect(() => {
  //   const url = userSid
  //     ? `/api/v1/closet/${userSid}/rentals`
  //     : `/api/v1/closet/rentals`;
  //   AuthAxios.get(url)
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

  return (
    <GridContainer>
      {/* {postList?.map((data) => (
        <SquarePost
          key={data.id}
          id={data.id}
          imgUrl={data.imgUrl}
          title={data.title}
          minPrice={data.minPrice}
          createdAt={data.createdAt}
        />
      ))} */}
      <SquarePost />
      <SquarePost />
      <SquarePost />
      <SquarePost />
      <SquarePost />
      <SquarePost />
    </GridContainer>
  );
};

export default MyClosetContent;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px 0;
  justify-content: center;
  row-gap: 15px;
  column-gap: 22px;
`;
