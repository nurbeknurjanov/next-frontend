import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LoginRequestBodyParams } from 'api/commonApi';
import { loginThunk, logout } from 'store/common/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useI18nJoi } from 'shared/utils';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import tlds from 'tlds';
import { common } from 'store';
import { useEffect } from 'react';

export const useLogin = () => {
  const tCommon = useTranslations('Common');
  const tLoginPage = useTranslations('LoginPage');
  const tLoginPageFields = useTranslations('LoginPage.fields');
  const dispatch = useAppDispatch();
  const loginState = useAppSelector(common.login.selector.state);
  const router = useRouter();
  const [_cookies, setCookie, removeCookie] = useCookies([
    'refreshToken',
    'accessToken',
  ]);

  const initialValues: LoginRequestBodyParams = {
    email: '',
    password: '',
  };

  const i18nJoi = useI18nJoi();
  let emailSchema = Joi.string();
  emailSchema = emailSchema
    .email({
      minDomainSegments: 2,
      tlds: { allow: tlds },
    })
    .label(tLoginPage('fields.email'));

  const schema = i18nJoi.object({
    email: emailSchema,
    password: Joi.string().label(tLoginPageFields('password')).min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginRequestBodyParams>({
    mode: 'onTouched',
    //criteriaMode: "all",
    resolver: joiResolver(schema),
    defaultValues: initialValues,
  });

  const login = async (formData: LoginRequestBodyParams) => {
    const { data } = await dispatch(loginThunk(formData));
    if (data) {
      setCookie('refreshToken', data.refreshToken, { path: '/' });
      setCookie('accessToken', data.accessToken, { path: '/' });
      router.push('/');
    }
  };

  useEffect(() => {
    removeCookie('refreshToken', { path: '/' });
    removeCookie('accessToken', { path: '/' });
    dispatch(logout());
  }, [removeCookie, dispatch]);

  return {
    register,
    handleSubmit,
    isValid,
    isDirty,
    errors,
    tCommon,
    tLoginPage,
    login,
    loginState,
  };
};
