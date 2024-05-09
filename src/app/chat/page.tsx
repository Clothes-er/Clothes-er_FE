"use client";
import styled from "styled-components";

const Chat = () => {
  return (
    <>
      <Layout>채팅</Layout>
    </>
  );
};

export default Chat;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  gap: 23px;
  position: relative;
`;
