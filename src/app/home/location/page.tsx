"use client";

import styled from "styled-components";
import Image from "next/image";
import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";
import Postcode from "@/components/common/Postcode";
import { useState } from "react";
import Button from "@/components/common/Button";
import { getAddressCoords } from "@/hooks/getAddressCoords";

const Location = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleChangeAddress = async () => {
    try {
      const coords = await getAddressCoords(location);
      console.log("주소 변환에 성공하였습니다.", coords);
    } catch (error) {
      console.error("주소 변환에 실패하였습니다.");
    }
  };

  return (
    <>
      <Layout>
        <Header />
        <Top>
          <Image
            src="/assets/icons/ic_arrow.svg"
            width={24}
            height={24}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          내 위치 설정
        </Top>
        <Map onClick={() => router.push("/home/location")}>
          <Image
            src="/assets/icons/ic_pin.svg"
            width={24}
            height={24}
            alt="pin"
          />
          강남구 역삼로 150길
        </Map>
        <InputBox>
          <InfoIcon
            src="/assets/icons/ic_info.svg"
            width={24}
            height={24}
            alt="info"
          />
          {/* <InfoText>상자</InfoText> */}
          <Postcode location={location} setLocation={setLocation} />
          <Button
            buttonType="primaryLight"
            text="변경"
            size="small"
            onClick={handleChangeAddress}
          />
        </InputBox>
      </Layout>
    </>
  );
};

export default Location;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const Top = styled.div`
  width: calc(50% + 60px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 15px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const Map = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${(props) => props.theme.fonts.b2_medium};
  cursor: pointer;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const InfoIcon = styled(Image)`
  &:hover + .div {
    display: block;
  }
`;

const InfoText = styled.div``;
