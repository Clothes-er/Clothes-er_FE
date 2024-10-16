export interface RentalLikeList {
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

export interface ClosetLikeList {
  clothesListResponse: {
    id: number;
    userSid: string;
    nickname: string;
    imgUrl: string;
    name: string;
    createdAt: string;
  };
  isLiked: boolean;
}
  