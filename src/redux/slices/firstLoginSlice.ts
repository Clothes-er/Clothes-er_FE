import { Gender } from '@/interface/Gender';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface FirstLoginState {
  step1: {
    address: string;
    latitude: number;
    longitude: number;
  };
  step2: {
    gender: Gender | undefined;
    height: number | undefined;
    weight: number | undefined;
    shoeSize: number | undefined;
    bodyShapes: string[] | undefined;
  };
  step3: {
    categories: string[];
    styles: string[];
  };
}

const initialState: FirstLoginState = {
  step1: {
    address: '',
    latitude: 0,
    longitude: 0,
  },
  step2: {
    gender: undefined,
    height: undefined,
    weight: undefined,
    shoeSize: undefined,
    bodyShapes: [""],
  },
  step3: {
    categories: [""],
    styles: [""],
  },
};

export const firstLoginSlice = createSlice({
  name: 'firstLogin',
  initialState,
  reducers: {
    setStep1: (state, action: PayloadAction<FirstLoginState['step1']>) => {
      state.step1 = action.payload;
    },
    setStep2: (state, action: PayloadAction<FirstLoginState['step2']>) => {
      state.step2 = action.payload;
    },
    setStep3: (state, action: PayloadAction<FirstLoginState['step3']>) => {
      state.step3 = action.payload;
    },
    clearFirstLogin: (state) => {
      state.step1 = initialState.step1;
      state.step2 = initialState.step2;
      state.step3 = initialState.step3;
    },
  },
});

export const { setStep1, setStep2, setStep3 } = firstLoginSlice.actions;
export default firstLoginSlice.reducer;