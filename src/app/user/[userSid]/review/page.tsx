"use client";

import AuthAxios from "@/api/authAxios";
import Topbar from "@/components/common/Topbar";
import ReviewPage, { ReviewProps } from "@/components/review/ReviewPage";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const UserReview = () => {
  const router = useRouter();
  const { userSid } = useParams();
  const [review, setReview] = useState<ReviewProps>();

  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const response = await AuthAxios.get(`/api/v1/reviews/${userSid}`);
        const data = response.data.result;
        console.log(data);
        setReview(data);
        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserReview();
  }, []);

  return (
    <>
      <Layout>
        <Background />
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Topbar text="거래 후기" icon={true} align="center" />
        <Content>
          {review && (
            <ReviewPage
              nickname={review.nickname}
              profileUrl={review.profileUrl}
              keywordReviews={review.keywordReviews}
              textReviews={review.textReviews}
            />
          )}
        </Content>
      </Layout>
    </>
  );
};

export default UserReview;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: none;
  background: ${theme.colors.ivory};
  z-index: 1;
`;
const Background = styled.div`
  width: 100%;
  max-width: 480px;
  height: 500px;
  border-radius: 0 0 200px 200px;
  background: linear-gradient(180deg, #d8d1ff 0%, #f3f1ff 100%);
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -10;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  overflow-y: scroll;
  padding: 35px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
