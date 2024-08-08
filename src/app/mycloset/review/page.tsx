"use client";

import AuthAxios from "@/api/authAxios";
import ReviewPage, { ReviewProps } from "@/components/review/ReviewPage";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MyClosetReview = () => {
  const router = useRouter();
  const [review, setReview] = useState<ReviewProps>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await AuthAxios.get("/api/v1/reviews");
        const data = response.data.result;
        console.log(data);
        setReview(data);
        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
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
        <Top>
          <Image
            src="/assets/icons/ic_arrow.svg"
            width={24}
            height={24}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          거래 후기
          <div />
        </Top>
        <Content>
          {review && (
            <ReviewPage
              keywordReviews={review.keywordReviews}
              textReviews={review.textReviews}
            />
          )}
        </Content>
      </Layout>
    </>
  );
};

export default MyClosetReview;

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
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

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  margin-bottom: 15px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const Content = styled.div`
  display: flex;
  padding: 35px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
