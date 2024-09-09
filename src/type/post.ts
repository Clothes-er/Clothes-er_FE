export type postType = "normal" | "rental" | "choice" | "my" | "transition";

export interface PostList {
  id?: number;
  userSid?: string;
  postType?: postType;
  imgUrl?: string | null;
  nickname?: string;
  brand?: string;
  title: string;
  minPrice?: number;
  minDays?: number;
  isDeleted?: boolean;
  isReviewed?: boolean;
  showReviewed?: boolean;
  isRestricted?: boolean;
  isSuspended?: boolean;
  onClickReview?: () => void;
  onClickChoice?: (id: number) => void;
  createdAt?: string;
  startDate?: string;
  endDate?: string;
  size?: "normal" | "small";
  isSelected?: boolean;
  roomId?: number;
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