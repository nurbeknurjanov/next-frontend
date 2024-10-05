import { BaseApiService } from './BaseApiService';
import { BASE_URL } from 'shared/utils';

export const baseApi = new BaseApiService({ baseURL: BASE_URL });
