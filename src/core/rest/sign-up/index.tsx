import axios from 'axios';
import type { operations } from '@/src/types/api';

const BASE_URL = 'http://13.60.16.27:8777';

export const signUp = async (
  data: operations['signUp']['requestBody']['content']['application/json'],
): Promise<operations['signUp']['responses'][200]['content']['*/*']> => {
  const response = await axios.post(
    `${BASE_URL}/auth-service/auth/sign-up`,
    data,
  );
  return response.data;
};
