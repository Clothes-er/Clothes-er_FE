"use client";

import Button from "@/components/common/Button";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import Postcode from "@/components/common/Postcode";
import { getAddressCoords } from "@/hooks/getAddressCoords";
import { useDispatch } from "react-redux";
import { setStep1 } from "@/redux/slices/firstLoginSlice";
import AuthAxios from "@/api/authAxios";

const Step1 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");

  const handleNext = async () => {
    console.log("location-page", location);
    const coords = await getAddressCoords(location);
    router.push("/first/step2");

    const step1Info = {
      address: location,
      latitude: Number(coords.y),
      longitude: Number(coords.x),
    };

    dispatch(setStep1(step1Info));
  };

  return (
    <Layout>
      <Background>
        <Image
          src="/assets/images/shape.svg"
          width={575}
          height={592}
          alt="logo"
        />
      </Background>
      <Character>
        <Image
          src="/assets/images/character.svg"
          width={48}
          height={55}
          alt="logo"
        />
      </Character>
      <Logo>
        <Image
          src="/assets/images/logo.svg"
          width={111}
          height={36}
          alt="logo"
        />
      </Logo>
      <Content>
        <Story>
          앗..
          <br />
          요청하신 페이지가
          <br />
          없습니다!
        </Story>
        <StoryMini>404 NOT FOUND ERROR</StoryMini>
        <StyledButton>
          <Button
            buttonType="primaryDeep"
            size="large"
            text="메인 홈으로 이동"
            onClick={() => router.push("/")}
          />
        </StyledButton>
      </Content>
    </Layout>
  );
};

export default Step1;

const Layout = styled.div`
  max-width: 560px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 86px 40px 38px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 0;
`;

const Character = styled.div`
  position: absolute;
  top: 100px;
  right: 50px;
`;

const Logo = styled.div`
  width: 100%;
  margin-bottom: 45px;
  z-index: 10;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const Story = styled.div`
  width: 100%;
  text-align: left;
  color: ${theme.colors.white};
  font-size: 30px;
  font-weight: 700;
  z-index: 10;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StoryMini = styled.div`
  width: 100%;
  text-align: left;
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  z-index: 10;
  margin-bottom: 800px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledButton = styled.div`
  width: 100%;
  position: sticky;
  bottom: 38px;
`;
