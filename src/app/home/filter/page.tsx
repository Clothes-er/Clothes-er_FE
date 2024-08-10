"use client";

import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import FilterChip from "@/components/common/FilterChip";
import Topbar from "@/components/common/Topbar";
import { ageMapping, ages, categories, styles } from "@/data/filterData";
import {
  setSelectedAge,
  setSelectedCategory,
  setSelectedGender,
  setSelectedSort,
  setSelectedStyle,
} from "@/redux/slices/filterSlice";
import { RootState } from "@/redux/store";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const FilterPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const selectedSort = useSelector(
    (state: RootState) => state.filter.selectedSort
  );

  const selectedGender = useSelector(
    (state: RootState) => state.filter.selectedGender
  );
  const selectedAge = useSelector(
    (state: RootState) => state.filter.selectedAge
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );
  const selectedStyle = useSelector(
    (state: RootState) => state.filter.selectedStyle
  );

  /* 각각Redux로 dispatch 하는 함수들 */
  const handleSortSelect = (sort: string | null) => {
    dispatch(setSelectedSort(sort));
  };

  const handleGenderSelect = (gender: string) => {
    dispatch(setSelectedGender(gender));
  };

  const handleAgeSelect = (age: string) => {
    const mappedAge = ageMapping[age]; // 표시용 값을 저장용 값으로 변환
    if (mappedAge) {
      dispatch(setSelectedAge(mappedAge));
    }
  };

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleStyleSelect = (style: string) => {
    dispatch(setSelectedStyle(style));
  };

  const handleComplete = () => {
    router.push("/home");
  };

  return (
    <Layout>
      <div>
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Topbar text="필터" icon={true} link="/closet" align="center" />
        <Content>
          <div>
            <OptionsList>
              <div>
                <Label>정렬</Label>
                <GenderCheckbox>
                  <Checkbox
                    text="최신순"
                    checked={selectedSort === "createdAt"}
                    onChange={() =>
                      handleSortSelect(
                        selectedSort === "createdAt" ? null : "createdAt"
                      )
                    }
                    labelFontSize={
                      selectedSort === "createdAt" ? "c1_semiBold" : "c1_medium"
                    }
                    color={selectedSort === "createdAt" ? "purple" : "black"}
                  />
                  <Checkbox
                    text="옷장 점수순"
                    checked={selectedSort === "closetScore"}
                    onChange={() =>
                      handleSortSelect(
                        selectedSort === "closetScore" ? null : "closetScore"
                      )
                    }
                    labelFontSize={
                      selectedSort === "closetScore"
                        ? "c1_semiBold"
                        : "c1_medium"
                    }
                    color={selectedSort === "closetScore" ? "purple" : "black"}
                  />
                </GenderCheckbox>
              </div>
              <div>
                <Label>성별</Label>
                <GenderCheckbox>
                  <Checkbox
                    text="여자"
                    checked={selectedGender.includes("FEMALE")}
                    onChange={() => handleGenderSelect("FEMALE")}
                    labelFontSize={
                      selectedGender.includes("FEMALE")
                        ? "c1_semiBold"
                        : "c1_medium"
                    }
                    color={
                      selectedGender.includes("FEMALE") ? "purple" : "black"
                    }
                  />
                  <Checkbox
                    text="남자"
                    checked={selectedGender.includes("MALE")}
                    onChange={() => handleGenderSelect("MALE")}
                    labelFontSize={
                      selectedGender.includes("MALE")
                        ? "c1_semiBold"
                        : "c1_medium"
                    }
                    color={selectedGender.includes("MALE") ? "purple" : "black"}
                  />
                </GenderCheckbox>
              </div>
              <div>
                <Label>연령대</Label>
                <SameStyle>
                  {ages.map((data: string) => (
                    <FilterChip
                      key={data}
                      label={data}
                      value={data}
                      onClick={handleAgeSelect}
                      selected={selectedAge.includes(ageMapping[data])} // ageMapping에서 변환된 값 사용
                    />
                  ))}
                </SameStyle>
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
                          selected={selectedCategory.includes(data)}
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
                      selected={selectedStyle.includes(data)}
                    />
                  ))}
                </SameStyle>
              </div>
            </OptionsList>
          </div>
        </Content>
        <SubmitButton>
          <Button
            buttonType="primary"
            size="large"
            text="선택 완료"
            onClick={handleComplete}
            // disabled
          />
        </SubmitButton>
      </div>
    </Layout>
  );
};

export default FilterPage;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 37px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const SubmitButton = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0px;
  left: 50%;
`;

const Content = styled.div`
  width: 100%;
  height: 980px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 400px) {
    height: 1200px;
  }
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 30px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 30px;
  }
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
