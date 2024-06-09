import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IProductPost, IProduct } from 'api/productsApi';
import { pick } from 'lodash';
import { useEffect, useMemo } from 'react';

interface IProps {
  model?: IProduct;
}
export function usePrepareForm({ model }: IProps) {
  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    name: Joi.string(),
    description: Joi.string(),
  });

  const initialValues = useMemo<IProductPost>(() => {
    if (!model) {
      return { name: '', description: '' };
    }

    return pick(model, ['name', 'description']);
  }, [model]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<IProductPost>({
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
