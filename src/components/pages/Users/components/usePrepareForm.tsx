import { useI18nJoi } from '../../../../shared/utils';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IUserPost, IUser } from '../../../../api/usersApi';
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
    sex: Joi.string(),
    status: Joi.string(),
  });

  const initialValues = useMemo<IUserPost>(() => {
    if (!model) {
      return {
        name: '',
        email: '',
        password: '',
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
  };
}
