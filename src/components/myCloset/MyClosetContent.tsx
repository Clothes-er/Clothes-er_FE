import styled from "styled-components";
import SquarePost from "../common/SquarePost";
import { useEffect, useState } from "react";
import AuthAxios from "@/api/authAxios";
import { ClosetPostList } from "@/type/post";
import { theme } from "@/styles/theme";

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
    <>
      {postList && postList.length > 0 ? (
        <GridContainer>
          {postList?.map((data) => (
            <SquarePost
              key={data.id}
              id={data.id}
              userSid={data.userSid}
              nickname={data.nickname}
              name={data.name}
              imgUrl={data.imgUrl}
              brand={data.brand}
              createdAt={data.createdAt}
            />
          ))}
        </GridContainer>
      ) : (
        <NoData>
          <>등록한 보유 옷이 없네요!</>
        </NoData>
      )}
    </>
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
