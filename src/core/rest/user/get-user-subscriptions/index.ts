import axios from 'axios';
import type { operations } from '@/src/types/api2';
import { EVENT_BASE_URL } from '@/src/constants/api/apiConst';

type GetResponse =
  operations['getAllSubscriptions']['responses'][200]['content']['*/*'];

export const getUserSubscriptions = async (): Promise<GetResponse> => {
  const response = await axios.get(
    `${EVENT_BASE_URL}/event-service/user/subscriptions`,
  );
  return response.data;
};
