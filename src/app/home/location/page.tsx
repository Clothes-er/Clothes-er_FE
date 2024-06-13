"use client";

import styled from "styled-components";
import Image from "next/image";
import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";
import Postcode from "@/components/common/Postcode";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { getAddressCoords } from "@/hooks/getAddressCoords";
import AuthAxios from "@/api/authAxios";
import { getCoordsAddress } from "@/hooks/getCoordsAddress";
import { useRequireAuth } from "@/hooks/useAuth";

const Location = () => {
  useRequireAuth();
  const router = useRouter();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [location, setLocation] = useState("");

  /* 위치 설정 변경 */
  const handleChangeAddress = async () => {
    try {
      console.log("location", location);
      const coords = await getAddressCoords(location);
      console.log("주소 변환에 성공하였습니다.", coords);

      setLatitude(coords.y);
      setLongitude(coords.x);

      const response = await AuthAxios.patch(`/api/v1/users/address`, {
        latitude: coords.y,
        longitude: coords.x,
      });

      console.log("주소 업데이트 성공", response.data);
      console.log("업데이트한 위도경도", coords.y, coords.x);
      console.log(response.data.message);
    } catch (error) {
      console.error("주소 변환에 실패하였습니다.");
    }
  };

  useEffect(() => {
    console.log("위도 경도 set");
  }, [longitude, latitude]);

  /* 위치 정보 받아오기 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios.get(`/api/v1/users/address`);
        const latitude = response.data.result.latitude;
        const longitude = response.data.result.longitude;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log(response.data.message);
        const newLocation = await getCoordsAddress(longitude, latitude);
        setLocation(newLocation);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [latitude, longitude]);

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
          {location}
        </Map>
        <InputBox>
          <InfoIcon
            src="/assets/icons/ic_info.svg"
            width={24}
            height={24}
            alt="info"
          />
          {/* <InfoText>상자</InfoText> */}
          <Postcode
            location={location}
            setLocation={setLocation}
            size="medium"
          />
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
  margin-top: 20px;
  margin-bottom: 22px;
`;

const InputBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const InfoIcon = styled(Image)`
  &:hover + .div {
    display: block;
  }
`;

const InfoText = styled.div``;
