'use client';
import { useAppDispatch } from 'store/hooks';
import { FC } from 'react';
import { common } from 'store';
import { AppThunk } from 'store/store';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import styles from './login.module.scss';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useI18nJoi } from 'shared/utils';
import { withCleanHooks } from 'shared/hocs';
import { useSetPageData } from 'shared/hooks';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

let Login: FC = () => {
  const t = useTranslations('LoginPage');
  //const tf = useTranslations('LoginPage.fields');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['accessToken']);

  useSetPageData(t('title'), [
    {
      label: 'Home',
      href: '/',
    },
    t('title'),
  ]);

  const initialValues = {
    email: 'eric@mail.ru',
    password: '123123',
  };

  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['ru', 'com', 'net'] },
      })
      .label(t('fields.email')),
    password: Joi.string()
      //.allow("") //надо так добавить чтоб пропускало, а то будет обязательным, несмотря на отстуствие required
      .label(t('fields.password'))
      .min(6)
      //.required() //не обязательно, и так будет работать
      //eslint-disable-next-line
      .custom((value, helper) => {
        //throw new Error("Some error");
        //return helper.error("any.custom");
        return value;
      }),
    /*notRequiredField: Joi.string().allow(""),
        notRequiredField: Joi.optional().allow(""),*/
  }); //.messages({ "string.email": 'some error' });

  //console.log(schema.validate({ email: "wronemail", password: "123123" }));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onTouched',
    //criteriaMode: "all",
    resolver: joiResolver(schema),
    defaultValues: initialValues,
  });

  const loginThunk =
    (formData: typeof initialValues): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(common.login.thunk.request({ body: formData }));
      const loginState = common.login.selector.state(getState());
      const { error, data } = loginState;

      if (error) {
        //return notify(error.data, 'error');
      }
      setCookie('accessToken', data, { path: '/' });
      router.push('/');
    };
  const submitForm = (data: typeof initialValues) => dispatch(loginThunk(data));

  const { name, onChange, onBlur, ref } = register('email');

  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          <div className={styles.loginContent}>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(submitForm)(e);
              }}
            >
              <TextField
                error={!!errors[name]}
                helperText={errors[name]?.message}
                label={t('fields.email')}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
              />
              <TextField
                label={t('fields.password')}
                error={!!errors['password']}
                helperText={errors['password']?.message}
                {...register('password')}
              />
              <Button
                type={'submit'}
                variant={'contained'}
                disabled={/*!isDirty || !isValid*/ false}
              >
                {t('submit')}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

Login = withCleanHooks(Login);

export { Login };
