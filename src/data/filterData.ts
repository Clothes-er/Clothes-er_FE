export const ages: string[] = ["10대", "20대 초반", "20대 중반", "20대 후반", "30대"];

export const ageMapping: Record<string, string> = {
  "10대": "TEENAGER",
  "20대 초반": "EARLY_TWENTIES",
  "20대 중반": "MID_TWENTIES",
  "20대 후반": "LATE_TWENTIES",
  "30대": "OTHER",
};

type Categories = {
    [key: string]: string[];
  };

export const categories: Categories = {
    상의: ["티셔츠", "니트", "셔츠", "블라우스", "후드티"],
    팬츠: ["데님팬츠", "일자팬츠", "슬랙스", "와이드팬츠", "숏팬츠"],
    원피스: ["미니원피스", "롱원피스"],
    스커트: ["미니스커트", "롱스커트"],
    아우터: ["가디건", "자켓", "코트", "점퍼"],
    슈즈: ["힐", "로퍼", "부츠", "샌들"],
    가방: ["크로스백", "숄더백", "백팩"],
    패션잡화: ["양말", "모자", "목걸이", "반지"],
};

export const styles = [
    "캐주얼",
    "러블리",
    "엘레강스",
    "시크",
    "빈티지",
    "하이틴",
    "글램",
    "스트릿",
    "비즈니스",
    "키치",
    "힙",
    "미니멀",
];
  