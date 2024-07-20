import { myClosetTabs } from "@/data/tabsData";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const ListTab = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSubTab, setSelectedSubTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
    setSelectedSubTab(0);
    const newPath = getTabPath(tabIndex, 0);
    router.push(newPath);
  };

  const handleSubTabClick = (subIndex: number) => {
    setSelectedSubTab(subIndex);
    const newPath = getTabPath(selectedTab, subIndex);
    router.push(newPath);
  };

  const getTabPath = (tabIndex: number, subIndex: number) => {
    const basePath = "/mycloset"; // 기본 경로

    const tab = myClosetTabs[tabIndex];
    const tabPath = tab.path; // 주요 탭의 경로

    // 하위 탭이 있는 경우
    if (tab.sub && subIndex < tab.sub.length) {
      const subTabPath = tab.sub[subIndex].path; // 선택된 하위 탭의 경로
      return `${basePath}${tabPath}${subTabPath}`;
    }

    // 하위 탭이 없는 경우
    return `${basePath}${tabPath}`;
  };

  return (
    <Container>
      {myClosetTabs.map((item, index) => (
        <Tab
          key={index}
          selected={selectedTab === index}
          onClick={() => handleTabClick(index)}
        >
          {item.tab}
          {selectedTab === index && (
            <SubTabs>
              {item.sub?.map((list, subIndex) => (
                <SubTab
                  key={index}
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
    </Container>
  );
};

export default ListTab;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  padding: 0px 40px;
  border-bottom: 1px solid ${theme.colors.gray200};
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
