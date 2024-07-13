import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LoginRequestBodyParams } from 'api/commonApi';
import { loginThunk } from 'store/common/thunks';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useI18nJoi } from 'shared/utils';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import tlds from 'tlds';
import { common } from 'store';

export const useLogin = () => {
  const tCommon = useTranslations('Common');
  const tLoginPage = useTranslations('LoginPage');
  const tLoginPageFields = useTranslations('LoginPage.fields');
  const dispatch = useAppDispatch();
  const loginState = useAppSelector(common.login.selector.state);
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['accessToken']);

  const initialValues: LoginRequestBodyParams = {
    email: '',
    password: '',
  };

  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: tlds },
      })
      .label(tLoginPage('fields.email')),
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
      setCookie('accessToken', data, { path: '/' });
      router.push('/');
    }
  };

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
