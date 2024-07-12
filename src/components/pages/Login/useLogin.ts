import { useAppDispatch } from 'store/hooks';
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

export const useLogin = () => {
  const tLoginPage = useTranslations('LoginPage');
  const tLoginPageFields = useTranslations('LoginPage.fields');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['accessToken']);

  const initialValues = {
    email: null,
    password: null,
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

  const login = async (formData: typeof initialValues) => {
    const { data } = await dispatch(loginThunk(formData));
    if (data) {
      setCookie('accessToken', data, { path: '/' });
      router.push('/');
    }
  };
  const submitForm = (data: typeof initialValues) => login(data);

  return { submitForm };
};
