import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatPostState {
  title: string | null;
  minPrice: number | null;
  imgUrl: string | null;
  id: number | null;
  isDeleted: boolean;
  isReviewed: boolean;
  showReviewed: boolean;
}

const initialState: ChatPostState = {
  title: null,
  minPrice: null,
  imgUrl: null,
  id: null,
  isDeleted: false,
  isReviewed: false,
  showReviewed: false,
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
