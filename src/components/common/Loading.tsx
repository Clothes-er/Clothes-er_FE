import React from "react";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      {/* <h3>잠시만 기다려주세요.</h3> */}
      <SyncLoader color="gray" />
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: #797979;
`;
