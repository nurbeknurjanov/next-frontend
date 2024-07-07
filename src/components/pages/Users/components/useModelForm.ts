import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IUserPost, IUser, STATUS_ENUM, SEX_ENUM } from 'api/usersApi';
import { pick } from 'lodash';
import { useEffect, useMemo } from 'react';
import tlds from 'tlds';
import { useTranslations } from 'next-intl';

interface IProps {
  model?: IUser;
}
export function useModelForm({ model }: IProps) {
  const tUser = useTranslations('User');
  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    name: Joi.string().label(tUser('name')),
    email: Joi.string()
      .label(tUser('email'))
      .email({
        minDomainSegments: 2,
        tlds: { allow: tlds },
      }),
    password: Joi.string().label(tUser('password')),
    age: Joi.number().label(tUser('age')),
    sex: Joi.number().label(tUser('sex')).valid(SEX_ENUM.MALE, SEX_ENUM.FEMALE),
    status: Joi.number()
      .label(tUser('status'))
      .valid(STATUS_ENUM.ENABLED, STATUS_ENUM.DISABLED),
  });

  const initialValues = useMemo<IUserPost>(() => {
    if (!model) {
      return {
        name: null,
        email: null,
        password: null,
        age: null,
        sex: null,
        status: null,
      };
    }

    return pick(model, ['name', 'email', 'password', 'age', 'sex', 'status']);
  }, [model]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
    setValue,
  } = useForm<IUserPost>({
    mode: 'onTouched',
    resolver: joiResolver(schema),
    defaultValues: initialValues!,
  });

  useEffect(() => {
    reset(initialValues);
  }, [reset, initialValues]);

  return {
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    watch,
    setValue,
  };
}
