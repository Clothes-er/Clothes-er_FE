import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { theme } from "@/styles/theme";

interface TabProps {
  selected: boolean;
}

const Tabbar = () => {
  const [selected, setSelected] = useState("/home");
  const router = useRouter();

  const handleTabClick = (path: any) => {
    setSelected(path);
    router.push(path);
  };

  return (
    <Container>
      <Tab
        onClick={() => handleTabClick("/home")}
        selected={selected === "/home"}
      >
        <Bar selected={selected === "/home"} />
        {selected === "/home" ? (
          <>
            <Image
              src="/assets/icons/ic_home_select.svg"
              width="24"
              height="24"
              alt="home"
            />
          </>
        ) : (
          <Image
            src="/assets/icons/ic_home.svg"
            width="24"
            height="24"
            alt="home"
          />
        )}
        홈
      </Tab>
      <Tab
        onClick={() => handleTabClick("/chat")}
        selected={selected === "/chat"}
      >
        <Bar selected={selected === "/chat"} />
        {selected === "/chat" ? (
          <Image
            src="/assets/icons/ic_chat_select.svg"
            width="24"
            height="24"
            alt="chat"
          />
        ) : (
          <Image
            src="/assets/icons/ic_chat.svg"
            width="24"
            height="24"
            alt="chat"
          />
        )}
        채팅
      </Tab>
      <Tab
        onClick={() => handleTabClick("/people")}
        selected={selected === "/people"}
      >
        <Bar selected={selected === "/people"} />
        {selected === "/people" ? (
          <Image
            src="/assets/icons/ic_closet_select.svg"
            width="24"
            height="24"
            alt="closet"
          />
        ) : (
          <Image
            src="/assets/icons/ic_closet.svg"
            width="24"
            height="24"
            alt="closet"
          />
        )}
        옷장 구경
      </Tab>
      <Tab
        onClick={() => handleTabClick("/mycloset")}
        selected={selected === "/mycloset"}
      >
        <Bar selected={selected === "/mycloset"} />
        {selected === "/mycloset" ? (
          <Image
            src="/assets/icons/ic_my_select.svg"
            width="24"
            height="24"
            alt="my"
          />
        ) : (
          <Image
            src="/assets/icons/ic_my.svg"
            width="24"
            height="24"
            alt="my"
          />
        )}
        나의 옷장
      </Tab>
    </Container>
  );
};

export default Tabbar;

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 34px;
  background-color: ${theme.colors.white};
  position: sticky;
  bottom: 0;
  left: 0;
`;

const Tab = styled.div<TabProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.purple800 : theme.colors.basic};
  ${(props) => props.theme.fonts.caption3_r}
  gap: 2px;
`;

const Bar = styled.div<TabProps>`
  width: 24px;
  height: 4px;
  border-radius: 4px;
  background: ${theme.colors.purple800};
  opacity: ${({ selected }) => (selected ? "100%" : "0%")};
`;
