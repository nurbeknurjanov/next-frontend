'use client';
import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IProductPost, IProduct } from 'api/productsApi';
import { pick } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';

interface IProps {
  model?: IProduct;
}
export function usePrepareForm({ model }: IProps) {
  const tProduct = useTranslations('Product');
  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    name: Joi.string().label(tProduct('name')),
    description: Joi.string().label(tProduct('description')),
  });
  if (!model) {
    schema.append({ image: Joi.optional() });
  }

  //validation for file field
  schema.append({
    imageFile: Joi.any().custom((value: FileList, helper) => {
      if (!value?.[0]) {
        return value;
      }

      if (
        ![
          'image/jpg',
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
        ].includes(value?.[0]?.type?.toLowerCase())
      ) {
        return helper.error('custom.image_type');
      }

      if (value?.[0]?.size > 1048576 * 10) {
        return helper.error('custom.size');
      }

      return value;
    }),
  });

  const initialValues = useMemo<IProductPost>(() => {
    if (!model) {
      return { name: null, description: null, imageFile: null, image: null };
    }

    return {
      ...pick(model, ['name', 'description']),
      imageFile: null,
    };
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
