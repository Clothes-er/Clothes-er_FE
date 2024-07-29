import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilteryState {
  selectedSort: string | null;
  selectedGender: string[];
  selectedAge: string[];
  selectedCategory: string[];
  selectedStyle: string[]; 
}

const initialState: FilteryState = {
  selectedSort: null,
  selectedGender: [],
  selectedAge: [],
  selectedCategory: [],
  selectedStyle: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedSort(state, action: PayloadAction<string | null>) {
      state.selectedSort = action.payload;
    },
    setSelectedGender(state, action: PayloadAction<string>) {
      const gender = action.payload;
      if (!Array.isArray(state.selectedGender)) state.selectedGender = [];
      const index = state.selectedGender.indexOf(gender);
      if (index === -1) {
        state.selectedGender.push(gender);
      } else {
        state.selectedGender.splice(index, 1);
      }
    },
    setSelectedAge(state, action: PayloadAction<string>) {
      const age = action.payload;
      if (!Array.isArray(state.selectedAge)) state.selectedAge = [];
      const index = state.selectedAge.indexOf(age);
      if (index === -1) {
        state.selectedAge.push(age);
      } else {
        state.selectedAge.splice(index, 1);
      }
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      const category = action.payload;
      if (!Array.isArray(state.selectedCategory)) state.selectedCategory = [];
      const index = state.selectedCategory.indexOf(category);
      if (index === -1) {
        state.selectedCategory.push(category);
      } else {
        state.selectedCategory.splice(index, 1);
      }
    },
    setSelectedStyle(state, action: PayloadAction<string>) {
      const style = action.payload;
      if (!Array.isArray(state.selectedStyle)) state.selectedStyle = [];
      const index = state.selectedStyle.indexOf(style);
      if (index === -1) {
        state.selectedStyle.push(style);
      } else {
        state.selectedStyle.splice(index, 1);
      }
    },
    clearCategory: (state) => {
      state.selectedSort = '';
      state.selectedGender = [];
      state.selectedAge = [];
      state.selectedCategory = [];
      state.selectedStyle = [];
    },
  }
});

export const { setSelectedSort, setSelectedGender, setSelectedAge, setSelectedCategory, setSelectedStyle, clearCategory } = filterSlice.actions;
export default filterSlice.reducer;
