import { useState } from "react";
import Chip from "./Chip";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import Image from "next/image";
import FilterChip from "./FilterChip";
import Button from "./Button";
import { categories, styles } from "@/data/filterData";
import { theme } from "@/styles/theme";
import { getGenderLabel } from "@/interface/Gender";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setSelectedGender,
  setSelectedCategory,
  setSelectedStyle,
} from "@/redux/slices/categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const selectedGender = useSelector(
    (state: RootState) => state.category.selectedGender
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const selectedStyle = useSelector(
    (state: RootState) => state.category.selectedStyle
  );

  /* 필터 Popup 열기 */
  const handleChipClick = () => {
    setIsPopupOpen(true);
  };

  /* 필터 Popup 닫기 */
  const handleComplete = () => {
    setIsPopupOpen(false);
  };

  /* 각각Redux로 dispatch 하는 함수들 */
  const handleGenderSelect = (gender: string | null) => {
    dispatch(setSelectedGender(gender));
  };

  const handleCategorySelect = (category: string | null) => {
    dispatch(
      setSelectedCategory(category === selectedCategory ? null : category)
    );
  };

  const handleStyleSelect = (style: string | null) => {
    dispatch(setSelectedStyle(style === selectedStyle ? null : style));
  };

  return (
    <Layout>
      <Chip
        label="성별"
        value={getGenderLabel(selectedGender)}
        onClick={handleChipClick}
      />
      <Chip
        label="카테고리"
        value={selectedCategory || ""}
        onClick={handleChipClick}
      />
      <Chip
        label="스타일"
        value={selectedStyle || ""}
        onClick={handleChipClick}
      />
      {isPopupOpen && (
        <PopupBackground>
          <PopupContent>
            <div>
              <Top>
                <Image
                  src="/assets/icons/ic_arrow.svg"
                  width={24}
                  height={24}
                  alt="back"
                  onClick={() => setIsPopupOpen(false)}
                  style={{ cursor: "pointer" }}
                />
                필터
              </Top>
              <OptionsList>
                <div>
                  <Label>성별</Label>
                  <GenderCheckbox>
                    <Checkbox
                      text="여자"
                      checked={selectedGender === "FEMALE"}
                      onChange={() =>
                        handleGenderSelect(
                          selectedGender === "FEMALE" ? null : "FEMALE"
                        )
                      }
                      labelFontSize={
                        selectedGender === "FEMALE"
                          ? "c1_semiBold"
                          : "c1_medium"
                      }
                      color={selectedGender === "FEMALE" ? "purple" : "black"}
                    />
                    <Checkbox
                      text="남자"
                      checked={selectedGender === "MALE"}
                      onChange={() =>
                        handleGenderSelect(
                          selectedGender === "MALE" ? null : "MALE"
                        )
                      }
                      labelFontSize={
                        selectedGender === "MALE" ? "c1_semiBold" : "c1_medium"
                      }
                      color={selectedGender === "MALE" ? "purple" : "black"}
                    />
                  </GenderCheckbox>
                </div>
                <div>
                  <Label>카테고리</Label>
                  <CategoryGrid>
                    {Object.keys(categories).map((category) => (
                      <SameCategory key={category}>
                        {category}
                        {categories[category].map((data) => (
                          <FilterChip
                            key={data}
                            label={data}
                            value={data}
                            onClick={handleCategorySelect}
                            selected={selectedCategory === data}
                          />
                        ))}
                      </SameCategory>
                    ))}
                  </CategoryGrid>
                </div>
                <div>
                  <Label>스타일</Label>
                  <SameStyle>
                    {styles.map((data) => (
                      <FilterChip
                        key={data}
                        label={data}
                        value={data}
                        onClick={handleStyleSelect}
                        selected={selectedStyle === data}
                      />
                    ))}
                  </SameStyle>
                </div>
              </OptionsList>
            </div>
            <Button
              buttonType="primary"
              size="large"
              text="선택 완료"
              onClick={handleComplete}
            />
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Top = styled.div`
  width: calc(50% + 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 30px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Label = styled.div`
  display: flex;
  margin-bottom: 15px;
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.b1_bold};
`;

const GenderCheckbox = styled.div`
  display: flex;
  gap: 50px;
`;

const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const SameCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

const SameStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;
`;
