export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

// 함수 정의: enum 값에 따라 문자열 반환
export const getGenderLabel = (
  gender: Gender | string | string[] | null
): string => {
  switch (gender) {
    case Gender.MALE:
      return "남자";
    case Gender.FEMALE:
      return "여자";
    default:
      return "";
  }
};
