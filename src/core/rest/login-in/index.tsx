import axios from 'axios';
import type { operations } from '@/src/types/api';

const BASE_URL = 'http://13.60.16.27:8777';

export const login = async (
  data: operations['loginIn']['requestBody']['content']['application/json'],
): Promise<operations['loginIn']['responses'][200]['content']['*/*']> => {
  const response = await axios.post(
    `${BASE_URL}/auth-service/auth/login-in`,
    data,
  );
  return response.data;
};
