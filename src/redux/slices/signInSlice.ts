import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignInState {
  step1: {
    name: string;
    nickname: string;
    email: string;
    emailAuth: string;
  };
  step2: {
    password: string;
    repassword: string;
    birth: string;
  };
  step3: {
    phone: string;
    phoneAuth: string;
  };
}

const initialState: SignInState = {
  step1: {
    name: '',
    nickname: '',
    email: '',
    emailAuth: '',
  },
  step2: {
    password: '',
    repassword: '',
    birth: '',
  },
  step3: {
    phone: '',
    phoneAuth: '',
  },
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setStep1: (state, action: PayloadAction<SignInState['step1']>) => {
      state.step1 = action.payload;
    },
    setStep2: (state, action: PayloadAction<SignInState['step2']>) => {
      state.step2 = action.payload;
    },
    setStep3: (state, action: PayloadAction<SignInState['step3']>) => {
      state.step3 = action.payload;
    },
  },
});

export const { setStep1, setStep2, setStep3 } = signInSlice.actions;
export default signInSlice.reducer;