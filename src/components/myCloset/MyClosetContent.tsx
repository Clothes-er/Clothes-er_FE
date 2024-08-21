import styled from "styled-components";
import SquarePost from "../common/SquarePost";
import { useEffect, useState } from "react";
import AuthAxios from "@/api/authAxios";
import { ClosetPostList } from "@/type/post";

interface MyClosetContentProps {
  userSid?: string;
}

const MyClosetContent: React.FC<MyClosetContentProps> = ({ userSid }) => {
  const [postList, setPostList] = useState<ClosetPostList[]>();

  /* 보유 > 옷장 등록 목록 조회 */
  useEffect(() => {
    const url = userSid
      ? `/api/v1/closet/${userSid}/clothes`
      : `/api/v1/closet/clothes`;
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
    <GridContainer>
      {postList?.map((data) => (
        <SquarePost
          key={data.id}
          id={data.id}
          userSid={data.userSid}
          nickname={data.nickname}
          imgUrl={data.imgUrl}
          brand={data.brand}
          createdAt={data.createdAt}
        />
      ))}
    </GridContainer>
  );
};

export default MyClosetContent;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px 0;
  justify-content: center;
  row-gap: 15px;
  column-gap: 22px;
`;
