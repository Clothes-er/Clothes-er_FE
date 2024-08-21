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
      <div>
        <Label>받은 키워드 후기</Label>
        <Keywords>
          {keywordReviews.map((item, index) => (
            <KeywordBox key={index} keyword={item.keyword} count={item.count} />
          ))}
        </Keywords>
      </div>
      <div>
        <Label>받은 텍스트 후기</Label>
        <Texts>
          {textReviews.map((item, index) => (
            <TextBox
              key={index}
              nickname={item.nickname}
              profileUrl={item.profileUrl}
              content={item.content}
              createdAt={item.createdAt}
            />
          ))}
        </Texts>
      </div>
    </Container>
  );
};

export default ReviewPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
