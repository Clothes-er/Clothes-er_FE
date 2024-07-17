"use client";

import Topbar from "@/components/common/Topbar";
import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Layout = (props: any) => {
  return (
    <StyledLayout>
      <Logo>
        <Image
          src="/assets/images/logo.svg"
          width={111}
          height={36}
          alt="logo"
        />
      </Logo>
      <Topbar text="회원가입" icon={true} align="left" />
      {props.children}
    </StyledLayout>
  );
};

export default Layout;

const StyledLayout = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  padding: 25px 23px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Logo = styled.div`
  width: 100%;
  margin-left: 21px;
  z-index: 10;
`;
