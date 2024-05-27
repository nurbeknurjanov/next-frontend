import { UserApiService } from './userApi';
import { BASE_URL } from 'shared/utils';

export const userApi = new UserApiService({
  baseURL: BASE_URL,
});
