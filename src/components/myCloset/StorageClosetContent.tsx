import { getClothesLikes } from "@/api/like";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SquarePost from "../common/SquarePost";
import { ClosetLikeList } from "@/type/like";

interface MyClosetContentProps {
  userSid?: string;
}

const StorageClosetContent: React.FC<MyClosetContentProps> = ({ userSid }) => {
  const [postList, setPostList] = useState<ClosetLikeList[]>();

  useEffect(() => {
    const fetchRentalLikes = async () => {
      try {
        const data = await getClothesLikes();
        setPostList(data.result);
        console.log(data);
      } catch (error) {}
    };

    fetchRentalLikes();
  }, []);

  return (
    <>
      {postList && postList?.length > 0 ? (
        <GridContainer>
          {postList.map((data) => (
            <SquarePost
              key={data.clothesListResponse.id}
              id={data.clothesListResponse.id}
              userSid={data.clothesListResponse.userSid}
              nickname={data.clothesListResponse.nickname}
              name={data.clothesListResponse.name}
              imgUrl={data.clothesListResponse.imgUrl}
              createdAt={data.clothesListResponse.createdAt}
              isLikeList={true}
              isLiked={data.isLiked}
            />
          ))}
        </GridContainer>
      ) : (
        <NoData>
          <>지금 바로 찜하기를 시작해보세요!</>
        </NoData>
      )}
    </>
  );
};

export default StorageClosetContent;

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
