import React from "react";
import Chip from "./Chip";
import styled from "styled-components";
import { useSelector } from "react-redux";
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
  const {
    selectedSort,
    selectedGender,
    selectedAge,
    selectedMinHeight,
    selectedMaxHeight,
    selectedCategory,
    selectedStyle,
  } = useSelector((state: RootState) => state.filter);

  const defaultMinHeight = 130;
  const defaultMaxHeight = 200;

  const isHeightChanged =
    selectedMinHeight !== defaultMinHeight ||
    selectedMaxHeight !== defaultMaxHeight;

  return (
    <Layout>
      {Object.entries(filterLabels).map(([label, key]) => {
        const values = {
          selectedSort: [selectedSort],
          selectedGender: selectedGender ? [selectedGender] : [],
          selectedAge: selectedAge ? [selectedAge] : [],
          selectedCategory: selectedCategory ? [selectedCategory] : [],
          selectedStyle: selectedStyle ? [selectedStyle] : [],
        }[key];

        const firstValue = values || "";

        return (
          <div key={label}>
            {label === "정렬" ? (
              firstValue && (
                <Chip
                  label={getSortLabel(String(firstValue[0])) || label}
                  value={
                    (firstValue[0] === "createdAt" && "최신순") ||
                    (firstValue[0] === "closetScore" && "옷장 점수순") ||
                    ""
                  }
                  onClick={onClick}
                />
              )
            ) : (
              <Chip
                label={`${label}`}
                value={
                  label === "키·연령"
                    ? isHeightChanged
                      ? label
                      : ""
                    : firstValue[0] && firstValue[0].length > 0
                    ? label
                    : ""
                }
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
