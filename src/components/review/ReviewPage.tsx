import React from "react";
import KeywordBox from "./KeywordBox";
import TextBox from "./TextBox";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import Image from "next/image";

export interface KeywordProps {
  keyword: string;
  count: number;
}

export interface TextProps {
  nickname: string;
  profileUrl: string;
  userSid: string;
  content: string;
  createdAt: string;
}

export interface ReviewProps {
  nickname: string;
  profileUrl: string;
  keywordReviews: KeywordProps[];
  textReviews: TextProps[];
}

const ReviewPage: React.FC<ReviewProps> = ({
  nickname,
  profileUrl,
  keywordReviews,
  textReviews,
}) => {
  return (
    <Container>
      <Profile>
        <Image
          src={`${profileUrl || "/assets/images/basic_profile.svg"}`}
          width={147}
          height={147}
          alt="profile"
          style={{ borderRadius: "50%" }}
        />
        <Label>{nickname} 님</Label>
      </Profile>
      <Left>
        <div>
          <Label>받은 키워드 후기</Label>
          <Keywords>
            {keywordReviews ? (
              keywordReviews.map((item, index) => (
                <KeywordBox
                  key={index}
                  keyword={item.keyword}
                  count={item.count}
                />
              ))
            ) : (
              <NoData>아직 받은 키워드 후기가 없네요!</NoData>
            )}
          </Keywords>
        </div>
        <div>
          <Label>받은 텍스트 후기</Label>
          <Texts>
            {textReviews ? (
              textReviews.map((item, index) => (
                <TextBox
                  key={index}
                  nickname={item.nickname}
                  profileUrl={item.profileUrl}
                  userSid={item.userSid}
                  content={item.content}
                  createdAt={item.createdAt}
                />
              ))
            ) : (
              <NoData>아직 받은 텍스트 후기가 없네요!</NoData>
            )}
          </Texts>
        </div>
      </Left>
    </Container>
  );
};

export default ReviewPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const Profile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Left = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 50px;
`;

const Label = styled.div`
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.b2_bold};
  margin-bottom: 18px;
`;

const Keywords = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Texts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NoData = styled.div`
  width: 100%;
  height: auto;
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
