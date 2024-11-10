type followListType = "follower" | "followee";

export interface FollowList {
  profileUrl: string;
  nickname: string;
  isFollowing: boolean;
  isWithdrawn: boolean;
  userSid: string;
}