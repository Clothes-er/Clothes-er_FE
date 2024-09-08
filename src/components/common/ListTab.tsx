import { chatTabs, myClosetTabs } from "@/data/tabsData";
import { theme } from "@/styles/theme";
import { useState } from "react";
import styled from "styled-components";
import StorageContent from "../myCloset/StorageContent";
import { useCurrentTab } from "@/hooks/useCurrentTab";
import MyClosetContent from "../myCloset/MyClosetContent";
import MyShareContent from "../myCloset/MyShareContent";
import TransShareContent from "../myCloset/TransShareContent";
import TransRentContent from "../myCloset/TransRentContent";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import ChatListContent from "../chat/ChatListContent";

type listType = "me" | "other" | "chat";

interface ListTabProps {
  listType: listType;
  userSid?: string;
}

// 각 탭의 데이터 타입 정의
interface TabItem {
  tab: string;
  key: string;
  sub?: {
    subTab: string;
    key: string;
  }[];
}

const ListTab: React.FC<ListTabProps> = ({ listType, userSid }) => {
  // const router = useRouter();
  const { currentTab, setCurrentTab, currentSubTab, setCurrentSubTab } =
    useCurrentTab(listType);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedSubTab, setSelectedSubTab] = useState<number>(0);

  // 탭 정보
  const tabsToDisplay: TabItem[] =
    listType === "chat"
      ? chatTabs
      : listType === "other"
      ? [myClosetTabs[0]]
      : myClosetTabs;

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
    setSelectedSubTab(0);
    if (listType === "chat") {
      const newTab = chatTabs[tabIndex].key;
      setCurrentTab(newTab);
      setCurrentSubTab("");
    } else {
      const newTab = myClosetTabs[tabIndex].key;
      setCurrentTab(newTab);
      setCurrentSubTab(myClosetTabs[tabIndex].sub?.[0]?.key || "");
      // router.push(`/mycloset/${newTab}/${myClosetTabs[tabIndex].sub?.[0]?.key || ''}`);
    }
  };

  const handleSubTabClick = (subIndex: number) => {
    setSelectedSubTab(subIndex);
    const newSubTab = myClosetTabs[selectedTab].sub?.[subIndex]?.key || "";
    setCurrentSubTab(newSubTab);
    // router.push(`/mycloset/${myClosetTabs[selectedTab].key}/${newSubTab}`);
  };

  return (
    <Container>
      <ListContainer listType={listType}>
        {tabsToDisplay.map((item, index) => (
          <Tab
            key={index}
            selected={selectedTab === index}
            onClick={() => handleTabClick(index)}
          >
            {item.tab}
            {selectedTab === index && item.sub && (
              <SubTabs>
                {item.sub.map((list, subIndex) => (
                  <SubTab
                    key={subIndex}
                    selected={selectedSubTab === subIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubTabClick(subIndex);
                    }}
                  >
                    {list.subTab}
                  </SubTab>
                ))}
              </SubTabs>
            )}
          </Tab>
        ))}
      </ListContainer>
      <ContentArea
        currentTab={currentTab}
        currentSubTab={currentSubTab}
        userSid={userSid}
      />
    </Container>
  );
};

function ContentArea({
  currentTab,
  currentSubTab,
  userSid,
}: {
  currentTab: string;
  currentSubTab: string;
  userSid?: string;
}) {
  if (currentTab === "my" && currentSubTab === "closet") {
    return <MyClosetContent userSid={userSid || ""} />;
  } else if (currentTab === "my" && currentSubTab === "share") {
    return <MyShareContent userSid={userSid || ""} />;
  } else if (currentTab === "transaction" && currentSubTab === "sharing") {
    return <TransShareContent />;
  } else if (currentTab === "transaction" && currentSubTab === "rental") {
    return <TransRentContent />;
  } else if (currentTab === "storage") {
    return <StorageContent />;
  } else if (currentTab === "rental") {
    return <ChatListContent type="rental" />;
  } else if (currentTab === "user") {
    return <ChatListContent type="user" />;
  }
  return null;
}

export default ListTab;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ListContainer = styled.div<{ listType: listType }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
  border-bottom: 1px solid ${theme.colors.gray200};
  margin-bottom: ${({ listType }) => (listType === "chat" ? "0px" : "30px")};
  gap: 20px;
`;

const Tab = styled.div<{ selected: boolean }>`
  width: 77px;
  padding: 5px 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.purple500 : theme.colors.b100};
  border-bottom: 2px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.purple500 : "transparent"};
  ${(props) => props.theme.fonts.b2_medium};
  position: relative;
  white-space: nowrap;
  cursor: pointer;
`;

const SubTabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  position: absolute;
  top: 38px;
  left: 50%;
  transform: translateX(-50%);
`;

const SubTab = styled.div<{ selected: boolean }>`
  color: ${({ selected, theme }) =>
    selected ? theme.colors.purple600 : theme.colors.b100};
  ${({ selected, theme }) =>
    selected ? theme.fonts.b3_bold : theme.fonts.b3_medium};
  cursor: pointer;
`;
