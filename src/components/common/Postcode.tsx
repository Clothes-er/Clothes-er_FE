import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import Input from "./Input";
import axios from "axios";

const Postcode: React.FC = () => {
  //   const [zipCode, setZipcode] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locationPopup, setLocationPopup] = useState(false);
  const completeHandler = (data: any) => {
    console.log(data);
    // setZipcode(data.zonecode);
    setLocation(data.roadAddress);
  };

  useEffect(() => {
    const response = axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json+`,
      {
        // Authorization: KakaoAK`${REACT_APP_KAKAO_REST_API_KEY}`,
      }
    );
  }, [location]);
  return (
    <Div>
      <Input
        value={location}
        onChange={(value: string) => setLocation(value)}
        placeholder="주소"
        onClick={() => setLocationPopup(!locationPopup)}
        readOnly
      />
      {locationPopup && <DaumPostcode onComplete={completeHandler} />}
    </Div>
  );
};

export default Postcode;

const Div = styled.div`
  width: 100%;
  position: absolute;
  top: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
