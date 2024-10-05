'use client';
import { FC, PropsWithChildren, useEffect } from 'react';
import { baseApi } from 'api/base';
import { attacheTokens, handleErrorToken } from 'api/base/interceptors';
import { useAppSelector } from 'store/hooks';
import { getAuthStateSelector } from 'store/common/selectors';

export const SettingsWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { accessToken, refreshToken } = useAppSelector(getAuthStateSelector);

  useEffect(() => {
    const accessTokenInterceptor = baseApi
      .getAxiosInstance()
      .interceptors.request.use(
        attacheTokens(accessToken!, refreshToken!),
        error => Promise.reject(error)
      );

    return () => {
      baseApi
        .getAxiosInstance()
        .interceptors.request.eject(accessTokenInterceptor);
    };
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const refreshTokenInterceptor = baseApi
      .getAxiosInstance()
      .interceptors.response.use(
        response => response,
        handleErrorToken(refreshToken!)
      );

    return () => {
      baseApi
        .getAxiosInstance()
        .interceptors.request.eject(refreshTokenInterceptor);
    };
  }, [refreshToken]);

  return children;
};
