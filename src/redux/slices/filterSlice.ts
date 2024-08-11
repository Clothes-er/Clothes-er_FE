import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilteryState {
  selectedSort: string | null;
  selectedGender: string[];
  selectedAge: string[];
  selectedMinHeight: number;
  selectedMaxHeight: number;
  selectedCategory: string[];
  selectedStyle: string[]; 
}

const initialState: FilteryState = {
  selectedSort: null,
  selectedGender: [],
  selectedAge: [],
  selectedMinHeight: 130,
  selectedMaxHeight: 200,
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
    
    setSelectedGender(state, action: PayloadAction<string[]>) {
      state.selectedGender = action.payload;  // 이제 배열 자체를 업데이트
    },

    setSelectedMinHeight(state, action: PayloadAction<number>) {
      state.selectedMinHeight = action.payload;
    },

    setSelectedMaxHeight(state, action: PayloadAction<number>) {
      state.selectedMaxHeight = action.payload;
    },

    setSelectedAge(state, action: PayloadAction<string[]>) {
      state.selectedAge = action.payload;  // 이제 배열 자체를 업데이트
    },

    setSelectedCategory(state, action: PayloadAction<string[]>) {
      state.selectedCategory = action.payload;  // 이제 배열 자체를 업데이트
    },

    setSelectedStyle(state, action: PayloadAction<string[]>) {
      state.selectedStyle = action.payload;  // 이제 배열 자체를 업데이트
    },

    clearCategory: (state) => {
      state.selectedSort = '';
      state.selectedGender = [];
      state.selectedMinHeight= 130,
      state.selectedMaxHeight= 200,
      state.selectedAge = [];
      state.selectedCategory = [];
      state.selectedStyle = [];
    },
  }
});

export const { setSelectedSort, setSelectedGender, setSelectedMinHeight, setSelectedMaxHeight, setSelectedAge, setSelectedCategory, setSelectedStyle, clearCategory } = filterSlice.actions;
export default filterSlice.reducer;
