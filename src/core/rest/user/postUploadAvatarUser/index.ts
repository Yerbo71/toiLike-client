import axios from 'axios';
import type { operations } from '@/src/types/api2';
import { EVENT_BASE_URL } from '@/src/constants/api/apiConst';

export const postUploadAvatarUser = async (
  token: string,
  data: operations['uploadAvatar']['requestBody'],
): Promise<operations['uploadAvatar']['responses'][200]['content']['*/*']> => {
  const response = await axios.post(
    `${EVENT_BASE_URL}/event-service/user/upload-avatar`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
