import styled, { css } from "styled-components";
import SquarePost from "../common/SquarePost";
import { useEffect, useState } from "react";
import AuthAxios from "@/api/authAxios";
import { ClosetPostList } from "@/type/post";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { showToast } from "@/hooks/showToast";
import { useRouter } from "next/navigation";

interface MyClosetContentProps {
  userSid?: string;
}

const MyClosetContent: React.FC<MyClosetContentProps> = ({ userSid }) => {
  const router = useRouter();
  const [postList, setPostList] = useState<ClosetPostList[]>();
  const [isSuspended, setIsSuspended] = useState<boolean>(false);

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

  useEffect(() => {
    AuthAxios.get("/api/v1/users/profile")
      .then((response) => {
        const data = response.data.result;
        setIsSuspended(data.isSuspended);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddCloth = () => {
    if (isSuspended) {
      showToast({
        text: `신고 접수로 글 작성이 불가합니다.`,
        icon: "❌",
        type: "error",
      });
    } else {
      router.push("/mycloset/write/choice");
    }
  };

  return (
    <>
      <WriteButton $isSuspended={isSuspended + ""} onClick={handleAddCloth}>
        <Image
          src={`/assets/icons/ic_plus_${isSuspended ? "gray" : "purple"}.svg`}
          width={16}
          height={16}
          alt="plus"
        />
        옷장 채우기
      </WriteButton>
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

const WriteButton = styled.button<{ $isSuspended?: string }>`
  width: 90px;
  height: 23px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 20px;
  background: ${theme.colors.purple50};
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.c2_bold};
  position: absolute;
  top: 40px;
  right: 0;
  white-space: nowrap;

  transition: color 200ms, background-color 200ms;
  &:hover {
    background: ${theme.colors.purple150};
  }
  &:active {
    background: ${theme.colors.purple150};
  }

  ${({ $isSuspended }) =>
    $isSuspended === "true" &&
    css`
      color: ${theme.colors.gray900};
      background: ${theme.colors.gray100};

      &:hover {
        background: ${theme.colors.gray300};
      }
      &:active {
        background: ${theme.colors.gray300};
      }
    `}
`;
