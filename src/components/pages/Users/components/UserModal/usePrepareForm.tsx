import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IUserPost } from 'api/userApi';

export function usePrepareForm({ id }: { id?: string }) {
  const initialValues = {} as IUserPost;

  const i18nJoi = useI18nJoi();
  const fields = {
    name: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['ru', 'com', 'net'] },
    }),
  };
  if (!id) {
    //@ts-ignore
    fields.password = Joi.string();
  }
  const schema = i18nJoi.object(fields);

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<IUserPost>({
    mode: 'onTouched',
    resolver: joiResolver(schema),
    defaultValues: initialValues!,
  });

  return {
    watch,
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    reset,
  };
}
