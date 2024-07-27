export enum Sort {
  NEW = "NEW",
  SCORE = "SCORE",
}

// 함수 정의: enum 값에 따라 문자열 반환
export const getSortLabel = (sort: string): string => {
  switch (sort) {
    case Sort.NEW:
      return "최신순";
    case Sort.SCORE:
      return "옷장 점수순";
    default:
      return "";
  }
};
