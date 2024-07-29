export type postType = "share" | "rental";

export interface PostList {
    id?: number;
    postType?: postType;
    imgUrl?: string | null;
    nickname?: string;
    title: string;
    minPrice?: number;
    isDeleted?: boolean;
    isReviewed?: boolean;
    showReviewed?: boolean;
    onClickReview?: () => void;
    createdAt?: string;
    startDate?: string;
    endDate?: string;
    size?: "nomal" | "small";
}

export const postList :PostList[] = [
    {
        "id": 4,
        "imgUrl": null,
        "nickname": "Clothes:er",
        "title": "오프숄더 리본 반팔 티",
        "minPrice": 4000,
        "createdAt": "30분 전"
    },
    {
        "id": 3,
        "imgUrl": null,
        "nickname": "Clothes:er",
        "title": "정장 세트",
        "minPrice": 5000,
        "createdAt": "1시간 전"
    },
    {
        "id": 2,
        "imgUrl": null,
        "nickname": "눈송이",
        "title": "청바지 멜빵 원피스",
        "minPrice": 4000,
        "createdAt": "1일 전"
    },
    {
        "id": 1,
        "imgUrl": null,
        "nickname": "Clothes:er",
        "title": "오프숄더 리본 반팔 티",
        "minPrice": 4000,
        "createdAt": "30분 전"
    },
    {
        "id": 5,
        "imgUrl": null,
        "nickname": "Clothes:er",
        "title": "정장 세트",
        "minPrice": 5000,
        "createdAt": "1시간 전"
    },
    {
        "id": 6,
        "imgUrl": null,
        "nickname": "눈송이",
        "title": "청바지 멜빵 원피스",
        "minPrice": 4000,
        "createdAt": "1일 전"
    },
];