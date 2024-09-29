import { ResponseApiError } from 'api/base';
import { AxiosRequestConfig } from 'axios';

export type LoginRequestBodyParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
};

export type CommonApiConfig = AxiosRequestConfig;

export interface CommonApiError extends ResponseApiError<{ message: string }> {}
