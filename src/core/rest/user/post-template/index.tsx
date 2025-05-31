import axios from 'axios';
import { EVENT_BASE_URL } from '@/src/constants/api/apiConst';

export const postTemplate = async (templateId: number) => {
  const response = await axios.post(
    `${EVENT_BASE_URL}/event-service/user/select-lending-template/${templateId}`,
  );
  return response.data;
};
