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

export interface ClosetPostList {
    id: number;
    userSid: string;
    nickname?: string;
    imgUrl: string;
    name?: string;
    brand?: string;
    createdAt: string;
  }