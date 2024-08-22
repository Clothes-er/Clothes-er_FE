"use client";

import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import FilterChip from "@/components/common/FilterChip";
import RangeSlider from "@/components/common/RangeSlider";
import Topbar from "@/components/common/Topbar";
import { ageMapping, ages, categories, styles } from "@/data/filterData";
import {
  setSelectedAge,
  setSelectedCategory,
  setSelectedGender,
  setSelectedMaxHeight,
  setSelectedMinHeight,
  setSelectedSort,
  setSelectedStyle,
} from "@/redux/slices/filterSlice";
import { RootState } from "@/redux/store";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const FilterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  /* Redux에서 상태 가져오기 */
  const selectedSort = useSelector(
    (state: RootState) => state.filter.selectedSort
  );
  const selectedGender = useSelector(
    (state: RootState) => state.filter.selectedGender
  );
  const selectedMinHeight = useSelector(
    (state: RootState) => state.filter.selectedMinHeight
  );
  const selectedMaxHeight = useSelector(
    (state: RootState) => state.filter.selectedMaxHeight
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

  /* 로컬 상태 관리 */
  const [localSort, setLocalSort] = useState<string | null>(selectedSort);
  const [localGender, setLocalGender] = useState<string[]>(selectedGender);
  const [localHeightRange, setLocalHeightRange] = useState<number[]>([
    selectedMinHeight,
    selectedMaxHeight,
  ]);
  const [localAge, setLocalAge] = useState<string[]>(selectedAge);
  const [localCategory, setLocalCategory] =
    useState<string[]>(selectedCategory);
  const [localStyle, setLocalStyle] = useState<string[]>(selectedStyle);

  useEffect(() => {}, [
    localSort,
    localGender,
    localHeightRange,
    localAge,
    localCategory,
    localStyle,
  ]);

  /* 로컬 상태 업데이트 함수들 */
  const handleSortSelect = (sort: string | null) => {
    setLocalSort(sort);
  };

  const handleGenderSelect = (gender: string) => {
    setLocalGender((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  const handleHeightChange = (newHeightRange: number[]) => {
    setLocalHeightRange(newHeightRange);
  };

  const handleAgeSelect = (age: string) => {
    const mappedAge = ageMapping[age];
    if (mappedAge) {
      setLocalAge((prev) =>
        prev.includes(mappedAge)
          ? prev.filter((a) => a !== mappedAge)
          : [...prev, mappedAge]
      );
    }
  };

  const handleCategorySelect = (category: string) => {
    setLocalCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleStyleSelect = (style: string) => {
    setLocalStyle((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleResetFilter = () => {
    setLocalSort("");
    setLocalGender([]);
    setLocalHeightRange([130, 200]);
    setLocalAge([]);
    setLocalCategory([]);
    setLocalStyle([]);
  };

  /* 선택 완료 버튼 클릭 시 dispatch */
  const handleComplete = () => {
    dispatch(setSelectedSort(localSort));
    dispatch(setSelectedGender(localGender));
    dispatch(setSelectedMinHeight(localHeightRange[0]));
    dispatch(setSelectedMaxHeight(localHeightRange[1]));
    dispatch(setSelectedAge(localAge));
    dispatch(setSelectedCategory(localCategory));
    dispatch(setSelectedStyle(localStyle));
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
        <Topbar text="필터" icon={true} link="/home" align="center" />
        <Content>
          <div>
            <OptionsList>
              <div>
                <Label>정렬</Label>
                <GenderCheckbox>
                  <Checkbox
                    text="최신순"
                    checked={localSort === "createdAt"}
                    onChange={() =>
                      handleSortSelect(
                        localSort === "createdAt" ? null : "createdAt"
                      )
                    }
                    labelFontSize={
                      localSort === "createdAt" ? "c1_semiBold" : "c1_medium"
                    }
                    color={localSort === "createdAt" ? "purple" : "black"}
                  />
                  <Checkbox
                    text="옷장 점수순"
                    checked={localSort === "closetScore"}
                    onChange={() =>
                      handleSortSelect(
                        localSort === "closetScore" ? null : "closetScore"
                      )
                    }
                    labelFontSize={
                      localSort === "closetScore" ? "c1_semiBold" : "c1_medium"
                    }
                    color={localSort === "closetScore" ? "purple" : "black"}
                  />
                </GenderCheckbox>
              </div>
              <div>
                <Label>성별</Label>
                <GenderCheckbox>
                  <Checkbox
                    text="여자"
                    checked={localGender.includes("FEMALE")}
                    onChange={() => handleGenderSelect("FEMALE")}
                    labelFontSize={
                      localGender.includes("FEMALE")
                        ? "c1_semiBold"
                        : "c1_medium"
                    }
                    color={localGender.includes("FEMALE") ? "purple" : "black"}
                  />
                  <Checkbox
                    text="남자"
                    checked={localGender.includes("MALE")}
                    onChange={() => handleGenderSelect("MALE")}
                    labelFontSize={
                      localGender.includes("MALE") ? "c1_semiBold" : "c1_medium"
                    }
                    color={localGender.includes("MALE") ? "purple" : "black"}
                  />
                </GenderCheckbox>
              </div>
              <div>
                <Label>키</Label>
                <HeightText>
                  {localHeightRange[0]}cm ~ {localHeightRange[1]}cm
                </HeightText>
                <RangeSlider
                  minHeight={localHeightRange[0]}
                  maxHeight={localHeightRange[1]}
                  onChange={handleHeightChange}
                />
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
                      selected={localAge.includes(ageMapping[data])} // ageMapping에서 변환된 값 사용
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
                          selected={localCategory.includes(data)}
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
                      selected={localStyle.includes(data)}
                    />
                  ))}
                </SameStyle>
              </div>
            </OptionsList>
          </div>
        </Content>
        <SubmitButton>
          <ResetButton onClick={handleResetFilter}>초기화</ResetButton>
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

const Content = styled.div`
  width: 100%;
  height: 980px;
  padding: 20px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 100px;

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

const HeightText = styled.div`
  color: ${theme.colors.b500};
  ${(props) => props.theme.fonts.b3_medium};
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

const SubmitButton = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0px;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const ResetButton = styled.button`
  width: auto;
  height: 37px;
  padding: 6px 15px;
  border-radius: 20px;
  background: ${theme.colors.purple100};
  color: ${theme.colors.purple300};
  ${(props) => props.theme.fonts.b3_bold};
  display: flex;
  align-items: center;
  justify-content: center;
`;
