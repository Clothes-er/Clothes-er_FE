export type postType = "share" | "rental";

export interface PostList {
    id?: number;
    userSid?: string;
    postType?: postType;
    imgUrl?: string | null;
    nickname?: string;
    title: string;
    minPrice?: number;
    isDeleted?: boolean;
    isReviewed?: boolean;
    showReviewed?: boolean;
    onClickReview?: () => void;
    onClickChoice?: (id: number) => void;
    createdAt?: string;
    startDate?: string;
    endDate?: string;
    size?: "nomal" | "small";
    isSelected?: boolean;
}

export const postList :PostList[] = [
    {
        "id": 7,
        "userSid": "cy8rNm1CNFA2dHhYdjlhYnhGWnpXQT09",
        "imgUrl": "https://clotheser-s3-bucket.s3.ap-northeast-2.amazonaws.com/rentals/e03ad52f-8338-4895-b2bc-9d7ce07f4317_nasi_blouse_1.png",
        "nickname": "카리나",
        "title": "레이스 스트링 나시 블라우스",
        "minPrice": 2000,
        "createdAt": "25일 전"
      },
      {
        "id": 4,
        "userSid": "QUtGMXJRcmRXeUJESVphSEFpSlBpUT09",
        "imgUrl": null,
        "nickname": "Clothes:er",
        "title": "오프숄더 리본 반팔 티",
        "minPrice": 4000,
        "createdAt": "1개월 전"
      },
      {
        "id": 3,
        "userSid": "QUtGMXJRcmRXeUJESVphSEFpSlBpUT09",
        "imgUrl": null,
        "nickname": "Clothes:er",
        "title": "정장 세트",
        "minPrice": 5000,
        "createdAt": "1개월 전"
      },
      {
        "id": 2,
        "userSid": "VklpOFpuZFVvdGh5N2ZwU2RKVVM0UT09",
        "imgUrl": null,
        "nickname": "눈송이",
        "title": "청바지 멜빵 원피스",
        "minPrice": 4000,
        "createdAt": "1개월 전"
      },
];