import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const Header = () => {
  const router = useRouter();
  return (
    <Container>
      <Image
        src="/assets/images/logo_black.svg"
        width={101}
        height={18}
        alt="logo"
        onClick={() => router.push("/home")}
        style={{ cursor: "pointer" }}
      />
      <Icon>
        {/* <Image
          src="/assets/icons/ic_search.svg"
          width={24}
          height={24}
          alt="검색"
          style={{ cursor: "pointer" }}
        />
        <Image
          src="/assets/icons/ic_bell.svg"
          width={24}
          height={24}
          alt="알림"
          onClick={() => router.push("/notification")}
          style={{ cursor: "pointer" }}
        /> */}
      </Icon>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  gap: 17px;
`;
