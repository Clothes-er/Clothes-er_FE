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
import { useRequireFirstAuth } from "@/hooks/usefirstAuth copy";

const Step1 = () => {
  useRequireFirstAuth();
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
      <Content>
        <Story>
          동네 설정을 위한
          <br />
          주소를 입력해주세요.
        </Story>
        <Box>
          <Postcode
            location={location}
            setLocation={setLocation}
            size="small"
          />
        </Box>
        <StyledButton>
          <Button
            buttonType="primaryDeep"
            size="large"
            text="다음 단계"
            onClick={handleNext}
            disabled={!location}
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
  height: 100vh;
  overflow-x: hidden;
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

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Box = styled.div`
  width: 100%;
  height: 550px;
`;

const Story = styled.div`
  width: 100%;
  text-align: left;
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.h1_bold};
  z-index: 10;
  margin-bottom: 54px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledButton = styled.div`
  width: 100%;
  position: sticky;
  bottom: 38px;
`;
