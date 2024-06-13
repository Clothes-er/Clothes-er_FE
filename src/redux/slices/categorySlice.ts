import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  selectedGender: string | null;
  selectedCategory: string | null;
  selectedStyle: string | null;
}

const initialState: CategoryState = {
  selectedGender: null,
  selectedCategory: null,
  selectedStyle: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedGender(state, action: PayloadAction<string | null>) {
      state.selectedGender = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setSelectedStyle(state, action: PayloadAction<string | null>) {
      state.selectedStyle = action.payload;
    },
    clearCategory: (state) => {
      state.selectedGender = '';
      state.selectedCategory = '';
    state.selectedStyle = '';
    },
  }
});

export const { setSelectedGender, setSelectedCategory, setSelectedStyle, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
