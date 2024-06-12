import { useState } from "react";
import Chip from "./Chip";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FilterChip from "./FilterChip";
import Button from "./Button";
import { categories, styles } from "@/data/filterData";

interface ChipProps {
  label: string;
  value: string;
}

interface OptionItemProps {
  selected: boolean;
}

const Category = () => {
  const filter = ["성별", "카테고리", "스타일"];
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChipClick = () => {
    setIsPopupOpen(true);
  };

  // const handleValueSelect = (selectedValue: any) => {
  //   setSelectedValues([...selectedValues, selectedValue]);
  // };

  const handleComplete = () => {
    setIsPopupOpen(false);
  };

  return (
    <Layout>
      {filter.map((data, index) => (
        <Chip key={index} label={data} value={data} onClick={handleChipClick} />
      ))}
      {isPopupOpen && (
        <PopupBackground>
          <PopupContent>
            <Top>
              <Image
                src="/assets/icons/ic_arrow.svg"
                width={24}
                height={24}
                alt="back"
                onClick={() => router.back()}
                style={{ cursor: "pointer" }}
              />
              필터
            </Top>
            <OptionsList>
              <Label>성별</Label>
              <Checkbox text="여자" />
              <Checkbox text="남자" />
              <Label>카테고리</Label>
              <CategoryGrid>
                {Object.keys(categories).map((category) => (
                  <div key={category}>
                    {category}
                    {categories[category].map((data) => (
                      <FilterChip
                        key={data}
                        label={data}
                        value={data}
                        // onClick={() => handleValueSelect(option)}
                        // selected={selectedValues.includes(option)}
                      />
                    ))}
                  </div>
                ))}
              </CategoryGrid>
              <Label>스타일</Label>
              <Grid>
                {styles.map((data) => (
                  <FilterChip
                    key={data}
                    label={data}
                    value={data}
                    // onClick={() => handleValueSelect(option)}
                    // selected={selectedValues.includes(option)}
                  />
                ))}
              </Grid>
            </OptionsList>
            <CompleteButton>
              <Button
                buttonType="primary"
                size="large"
                text="선택 완료"
                onClick={handleComplete}
                // disabled
              />
            </CompleteButton>
          </PopupContent>
        </PopupBackground>
      )}
    </Layout>
  );
};

export default Category;

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 5px;
`;

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const PopupContent = styled.div`
  width: 400px;
  height: 700px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  position: relative;
`;

const Top = styled.div`
  width: calc(50% + 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 15px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.div`
  display: flex;
  gap: 3px;
  ${(props) => props.theme.fonts.b1_bold};
`;

const OptionItem = styled.div<OptionItemProps>`
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#F3F2FF" : "#ffffff")};
  color: ${(props) => (props.selected ? "#6C63FF" : "#000000")};
`;

const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: flex-start;
  align-items: center;
`;

const CompleteButton = styled.button`
  width: calc(100% - 40px);
  display: inline-flex;
  justify-content: center;
  align-self: start;
  cursor: pointer;
  background-color: #6c63ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  bottom: 20;
  left: 20;
`;
