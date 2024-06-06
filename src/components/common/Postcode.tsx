import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import Input from "./Input";

interface PostcodeProps {
  location: string;
  setLocation: (location: string) => void;
}

const Postcode: React.FC<PostcodeProps> = ({ location, setLocation }) => {
  const [locationPopup, setLocationPopup] = useState(false);

  const completeHandler = (data: any) => {
    console.log(data);
    setLocation(data.roadAddress);
  };

  useEffect(() => {
    console.log("useEffect location", location);
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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
