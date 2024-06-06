import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  nickname: string;
  email: string;
  password: string;
  phone: string;
  birth: string;
  token: string; // accessToken
  isFirstLogin: boolean;
}

const initialState: UserState = {
  name: '',
  nickname: '',
  email: '',
  password: '',
  phone: '',
  birth: '',
  token: '',
  isFirstLogin: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.birth = action.payload.birth;
      state.token = action.payload.token;
      state.isFirstLogin = action.payload.isFirstLogin;
    },
    clearUser: (state) => {
      state.name = '';
      state.nickname = '';
      state.email = '';
      state.password = '';
      state.phone = '';
      state.birth = '';
      state.token = '';
      state.isFirstLogin = true;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
