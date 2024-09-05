export type chatListType = "rental" | "user";

export interface ChatList {
    type: chatListType;
    id: number;
    userSid: string;
    nickname: string;
    profileImgUrl: string;
    recentMessage: string;
    recentMessageTime: string;
    rentalImgUrl?: string;
    rentalState?: string;
    title?: string;
    isDeleted?: boolean;
    isRestricted?: boolean;
    isSuspended?: boolean;
  }