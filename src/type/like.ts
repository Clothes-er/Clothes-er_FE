export interface LikeList {
  rentalListResponse: {
    id: number;
    imgUrl: string;
    title: string;
    minPrice: number;
    minDays: number;
    nickname: string;
    brand: string;
    createdAt: string;
  };
  isLiked: boolean;
}
  