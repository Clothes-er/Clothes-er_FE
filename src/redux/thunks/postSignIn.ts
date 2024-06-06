import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../store'
import Axios from '@/api/axios';

/* 회원가입 정보를 서버에 보내는 Thunk 액션 생성자 */
export const postSignUpData = createAsyncThunk(
  'signIn/postSignUpData',
  async (_, { getState }) => {
    try {
      /* 현재 스토어에서 회원가입 정보 가져오기 */
      const signUpData = (getState() as RootState).signIn;
      
      /* API 호출을 위한 요청 데이터 준비 */
      const requestData = {
        name: signUpData.step1.name,
        nickname: signUpData.step1.nickname,
        email: signUpData.step1.email,
        password: signUpData.step2.password,
        confirmedPassword: signUpData.step2.repassword,
        birthday: signUpData.step2.birth,
        phoneNumber: signUpData.step3.phone,
      };

      console.log("requestData", requestData);

      const response = await Axios.post('/api/v1/users/signup', requestData);
      console.log("리덕스", requestData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to sign up: ' +  (error as AxiosError).message);
    }
  }
);
