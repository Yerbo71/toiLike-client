import axios from 'axios';
import type { operations } from '@/src/types/api2';
import { EVENT_BASE_URL } from '@/src/constants/api/apiConst';

export const postUploadBackgroundUser = async (
  token: string,
  data: operations['uploadSecondaryImage']['requestBody'],
): Promise<
  operations['uploadSecondaryImage']['responses'][200]['content']['*/*']
> => {
  const response = await axios.post(
    `${EVENT_BASE_URL}/event-service/user/upload-secondary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
