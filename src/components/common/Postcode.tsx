import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import Input from "./Input";

interface PostcodeProps {
  location: string;
  setLocation: (location: string) => void;
  size: "large" | "medium" | "small";
}

const Postcode: React.FC<PostcodeProps> = ({ location, setLocation, size }) => {
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
        size={size}
        readOnly
      />
      {locationPopup && <StyledDaumPostcode onComplete={completeHandler} />}
    </Div>
  );
};

export default Postcode;

const Div = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledDaumPostcode = styled(DaumPostcode)`
  width: 100%;
  position: absolute;
  top: 70px;
  left: 0;
  z-index: 1;
`;
