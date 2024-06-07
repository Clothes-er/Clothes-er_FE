import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../store'
import AuthAxios from '@/api/authAxios';

export const postFirstLoginData = createAsyncThunk(
  'firstLogin/postFirstLoginData',
  async (_, { getState }) => {
    try {
      const firstLoginData = (getState() as RootState).firstLogin;
      
      const requestData = {
        latitude: firstLoginData.step1.latitude,
        longitude: firstLoginData.step1.longitude,
        gender: firstLoginData.step2.gender,
        height: firstLoginData.step2.height,
        weight: firstLoginData.step2.weight,
        shoeSize: firstLoginData.step2.shoeSize,
        bodyShapes: firstLoginData.step2.bodyShapes,
        categories: firstLoginData.step3.categories,
        styles: firstLoginData.step3.styles,
      };

      console.log("requestData", requestData);

      const response = await AuthAxios.post('/api/v1/users/first-login', requestData);
      console.log("리덕스", requestData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to first login: ' +  (error as AxiosError).message);
    }
  }
);
