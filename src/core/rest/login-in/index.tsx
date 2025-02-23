import axios from 'axios';
import { BASE_URL } from '@/src/constants/api/api';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${BASE_URL}auth-service/auth/login-in`,
    data,
  );
  return response.data;
};
