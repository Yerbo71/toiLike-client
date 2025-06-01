import axios from 'axios';
import type { operations } from '@/src/types/api3';
import { CHAT_BASE_URL } from '@/src/constants/api/apiConst';

type GetChatResponse =
  operations['createChat']['responses'][200]['content']['*/*'];

export const getChatByUser = async (
  userId: number,
): Promise<GetChatResponse> => {
  const response = await axios.get(
    `${CHAT_BASE_URL}/chat/create-chat/${userId}`,
  );
  return response.data;
};
