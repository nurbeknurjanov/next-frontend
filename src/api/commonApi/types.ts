import { ResponseApiError } from 'api/baseApi';
import { AxiosRequestConfig } from 'axios';

export type LoginRequestBodyParams = {
  email: string;
  password: string;
};

export type LoginResponse = string;

export type CommonApiConfig = AxiosRequestConfig;

export interface CommonApiError extends ResponseApiError<string> {}

//export interface CommonApiError extends ResponseApiError<string | {code: number, message: string}> {}
