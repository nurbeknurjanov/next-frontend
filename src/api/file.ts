import { FileApiService } from './fileApi';
import { BASE_URL } from 'shared/utils';

export const fileApi = new FileApiService({
  baseURL: BASE_URL,
});
