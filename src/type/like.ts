export interface LikeList {
    userRentalListResponse: {
      id: number;
      imgUrl: string;
      title: string;
      minPrice: number;
      minDays: number;
      brand: string;
      createdAt: string;
    };
    isLiked: boolean;
  }
  