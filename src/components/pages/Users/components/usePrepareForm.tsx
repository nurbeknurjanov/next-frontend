import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IUserPost, IUser, STATUS_ENUM, SEX_ENUM } from 'api/usersApi';
import { pick } from 'lodash';
import { useEffect, useMemo } from 'react';

interface IProps {
  model?: IUser;
}
export function usePrepareForm({ model }: IProps) {
  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    age: Joi.number(),
    sex: Joi.number().allow(SEX_ENUM.FEMALE),
    //.valid(SEX_ENUM.MALE, SEX_ENUM.FEMALE),
    status: Joi.number().valid(STATUS_ENUM.ENABLED, STATUS_ENUM.DISABLED),
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

  console.log('errors', errors);
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
