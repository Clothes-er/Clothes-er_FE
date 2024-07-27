import React from "react";
import Chip from "./Chip";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getSortLabel } from "@/interface/Sort";

interface FilterProps {
  onClick: () => void;
}

const filterLabels = {
  정렬: "selectedSort",
  성별: "selectedGender",
  "키·연령": "selectedAge",
  카테고리: "selectedCategory",
  스타일: "selectedStyle",
};

const Filter: React.FC<FilterProps> = ({ onClick }) => {
  // const filter = ["정렬", "성별", "키·연령", "카테고리", "스타일"];

  const dispatch = useDispatch();
  const selectedFilter = useSelector((state: RootState) => state.filter);

  return (
    <Layout>
      {Object.entries(filterLabels).map(([label, key]) => {
        const values = {
          selectedSort: [selectedFilter.selectedSort],
          selectedGender: selectedFilter.selectedGender
            ? [selectedFilter.selectedGender]
            : [],
          selectedAge: selectedFilter.selectedAge
            ? [selectedFilter.selectedAge]
            : [],
          selectedCategory: selectedFilter.selectedCategory
            ? [selectedFilter.selectedCategory]
            : [],
          selectedStyle: selectedFilter.selectedStyle
            ? [selectedFilter.selectedStyle]
            : [],
        }[key];

        const firstValue = values || "";
        console.log(firstValue);

        return (
          <div key={label}>
            {label === "정렬" ? (
              firstValue && (
                <Chip
                  label={getSortLabel(String(firstValue[0])) || label}
                  value={firstValue[0] || ""}
                  onClick={onClick}
                />
              )
            ) : (
              <Chip
                label={`${label}`}
                value={firstValue[0] && firstValue[0].length > 0 ? label : ""}
                onClick={onClick}
              />
            )}
          </div>
        );
      })}
    </Layout>
  );
};

export default Filter;

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  gap: 5px;
`;
