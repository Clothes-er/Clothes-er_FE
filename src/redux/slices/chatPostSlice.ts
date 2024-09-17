import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatPostState {
  title: string | null;
  minPrice: number | null;
  minDays: number | null;
  imgUrl: string | null;
  id: number | null;
  isDeleted: boolean;
  isReviewed: boolean;
  showReviewed: boolean;
  buyerNickname: string | null;
  lenderNickname: string | null;
  opponentNickname: string | null;
}

const initialState: ChatPostState = {
  title: null,
  minPrice: null,
  minDays: null,
  imgUrl: null,
  id: null,
  isDeleted: false,
  isReviewed: false,
  showReviewed: false,
  buyerNickname: null,
  lenderNickname: null,
  opponentNickname: null,
};

const chatPostSlice = createSlice({
  name: 'chatPost',
  initialState,
  reducers: {
    setChatPost(state, action: PayloadAction<ChatPostState>) {
      return { ...state, ...action.payload };
    },
    clearChatPost: () => initialState,
  },
});

export const { setChatPost, clearChatPost } = chatPostSlice.actions;
export default chatPostSlice.reducer;
