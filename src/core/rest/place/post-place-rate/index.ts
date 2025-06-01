import axios from 'axios';
import { EVENT_BASE_URL } from '@/src/constants/api/apiConst';
import { components, operations } from '@/src/types/api2';

type RateRequest = components['schemas']['RateRequest'];
type ApiResponse =
  operations['rateUserVendor']['responses'][200]['content']['*/*'];

export const postPlaceRate = async (
  data: RateRequest,
): Promise<ApiResponse> => {
  const response = await axios.post(
    `${EVENT_BASE_URL}/event-service/place/rate`,
    data,
  );
  return response.data;
};
