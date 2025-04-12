import axios from 'axios';
import type { operations } from '@/src/types/api';
import { AUTH_BASE_URL } from '@/src/constants/api/apiConst';

export type SignUpRequest =
  operations['signUp']['requestBody']['content']['application/json'] & {
    role: 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_COMPANY';
  };

export const signUp = async (
  data: SignUpRequest,
): Promise<operations['signUp']['responses'][200]['content']['*/*']> => {
  const response = await axios.post(
    `${AUTH_BASE_URL}/auth-service/auth/sign-up`,
    data,
  );
  return response.data;
};
