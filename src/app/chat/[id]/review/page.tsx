"use client";

import AuthAxios from "@/api/authAxios";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import Modal from "@/components/common/Modal";
import Topbar from "@/components/common/Topbar";
import Post from "@/components/home/Post";
import { bad_review_keywords, good_review_keywords } from "@/data/reviewData";
import { RootState } from "@/redux/store";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ReviewPage = () => {
  const router = useRouter();
  /* roomId */
  const { id } = useParams();
  const searchParams = useSearchParams();
  const params = searchParams.get("reviewType");

  const [checkListData, setCheckListData] = useState(good_review_keywords);
  const [selectedCheckList, setSelectedCheckList] = useState<string[]>();
  const [description, setDescription] = useState<string>();

  /* chatPost 리덕스에서 꺼내오기 */
  const chatPost = useSelector((state: RootState) => state.chatPost);

  /* 후기 작성 확인 Modal */
  const [reviewCaution, setReviewCaution] = useState<boolean>();

  const isLender = chatPost.opponentNickname === chatPost.lenderNickname;

  useEffect(() => {
    if (params === "good") {
      setCheckListData(
        good_review_keywords.filter(
          (item) =>
            item.target === "COMMON" ||
            (isLender ? item.target === "LENDER" : item.target === "SELLER")
        )
      );
    } else {
      setCheckListData(
        bad_review_keywords.filter(
          (item) =>
            item.target === "COMMON" ||
            (isLender ? item.target === "LENDER" : item.target === "SELLER")
        )
      );
    }
  }, []);

  useEffect(() => {
    console.log("Selected keywords:", selectedCheckList);
  }, [selectedCheckList]);

  /* 후기 키워드 선택 */
  const handleKeywordSelect = (keyword: string) => {
    setSelectedCheckList((prev = []) => {
      if (prev?.includes(keyword)) {
        return prev.filter((item) => item !== keyword);
      } else {
        return [...prev, keyword];
      }
    });
  };

  /* 후기 작성하기 버튼 클릭 */
  const handleComplete = () => {
    setReviewCaution(true);
  };

  /* 후기 제출하기 */
  const handleSubmitReview = () => {
    AuthAxios.post(`/api/v1/reviews/${id}`, {
      keywords: selectedCheckList,
      content: description,
    })
      .then((response) => {
        console.log("거래 후기 작성 성공", response.data);
        router.push("/closet");
      })
      .catch((error) => {
        console.log("거래 후기 작성 실패", error);
      });
  };

  return (
    <Layout>
      <div>
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Topbar text="거래 후기 작성" icon={true} align="center" />
        <Content>
          {chatPost && (
            <Post
              title={chatPost.title || ""}
              minPrice={chatPost.minPrice || undefined}
              imgUrl={chatPost.imgUrl}
              id={chatPost.id || undefined}
              isDeleted={chatPost.isDeleted}
              size="small"
            />
          )}
          <Box>
            <Label>
              키워드로 옷장 평가를 해주세요!<Span>(필수)</Span>
            </Label>
            {checkListData.map((item) => (
              <Checkbox
                key={item.id}
                text={item.description}
                checked={selectedCheckList?.includes(item.keyword)}
                onChange={() => handleKeywordSelect(item.keyword)}
                labelFontSize={
                  selectedCheckList?.includes(item.keyword)
                    ? "b3_semiBold"
                    : "b3_medium"
                }
                color={
                  selectedCheckList?.includes(item.keyword) ? "purple" : "black"
                }
              />
            ))}
          </Box>
          <Box>
            <Label>
              거래 후기를 남겨주세요!<Span>(선택)</Span>
            </Label>
            <TextAreaInput
              value={description}
              placeholder="남겨주신 따뜻한 후기는 큰 도움이 됩니다."
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(event.target.value);
              }}
            />
          </Box>
        </Content>
        <SubmitButton>
          <Button
            buttonType="primary"
            size="large"
            text="후기 작성하기"
            onClick={handleComplete}
            disabled={!selectedCheckList?.length}
          />
        </SubmitButton>
      </div>
      {reviewCaution && (
        <Modal
          title={`후기를 전달하시겠습니까?`}
          text={`본 내용은 상대방 프로필에 반영되니,\n다시 한번 확인해주세요:)`}
          onClose={() => {
            setReviewCaution(false);
          }}
          onCheck={handleSubmitReview}
          no="아니요"
          yes="네"
          width="305px"
          height="184px"
        />
      )}
    </Layout>
  );
};

export default ReviewPage;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 37px 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

const SubmitButton = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0px;
  left: 50%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 0;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 45px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 11px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 15px;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.b1_bold};
`;

const Span = styled.span`
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.b3_regular};
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.gray700};
  background: #fff;
  color: ${theme.colors.b100};
  outline: none;
  resize: none;
  ${(props) => props.theme.fonts.c1_regular};
  &::placeholder {
    color: ${theme.colors.gray600};
  }
`;
