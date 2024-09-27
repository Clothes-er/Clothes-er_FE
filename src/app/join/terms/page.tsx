"use client";

import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { useNoRequireAuth } from "@/hooks/useNoAuth";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Terms = () => {
  useNoRequireAuth();
  const router = useRouter();
  const [terms, setTerms] = useState({
    all: false,
    service: false,
    private: false,
    marketing: false,
  });

  const onChangeAll = (e: any) => {
    const checked = e.target.checked;
    setTerms({
      all: checked,
      service: checked,
      private: checked,
      marketing: checked,
    });
  };

  const onChangeService = (e: any) => {
    setTerms({ ...terms, service: e.target.checked });
  };
  const onChangePrivate = (e: any) => {
    setTerms({ ...terms, private: e.target.checked });
    console.log(terms);
  };
  const onChangeMarketing = (e: any) => {
    setTerms({ ...terms, marketing: e.target.checked });
    console.log(terms);
  };

  const isButtonDisable = !terms.service || !terms.private;

  const handleNext = () => {
    console.log(terms);
    router.push("/join/step1");
  };

  return (
    <TermsContainer>
      <Title>
        Clothes:er 이용 전,
        <br />
        약관 동의가 필요해요
      </Title>
      <div>
        <Check>
          <Column>
            <Checkbox
              checkboxType="checkBtn"
              label="약관 전체 동의"
              color="gray"
              labelFontSize="b2_bold"
              value={terms.all}
              checked={terms.all}
              onChange={onChangeAll}
            />
            <Div />
          </Column>
          <Checkbox
            checkboxType="checkArrow"
            label="서비스 이용약관"
            text="(필수)"
            color="purple"
            value={terms.service}
            checked={terms.service}
            onChange={onChangeService}
          />
          <Checkbox
            checkboxType="checkArrow"
            label="개인정보 수집 및 동의"
            text="(필수)"
            color="purple"
            value={terms.private}
            checked={terms.private}
            onChange={onChangePrivate}
          />
          <Checkbox
            checkboxType="checkArrow"
            label="마케팅 수신 동의"
            text="(선택)"
            color="gray"
            value={terms.marketing}
            checked={terms.marketing}
            onChange={onChangeMarketing}
          />
        </Check>
        <Button
          buttonType="primary"
          size="large"
          text="다음 단계"
          onClick={handleNext}
          disabled={isButtonDisable}
        />
      </div>
    </TermsContainer>
  );
};

export default Terms;

const TermsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  margin-left: 17px;
  ${(props) => props.theme.fonts.h1_bold};
`;

const Check = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 51px;
`;

const Div = styled.div`
  width: 100%;
  height: 1px;
  background: ${theme.colors.purple100};
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
