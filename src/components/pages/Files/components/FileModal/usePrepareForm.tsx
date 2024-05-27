import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IFilePost } from 'api/fileApi';

export function usePrepareForm() {
  const initialValues = {} as IFilePost;

  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    fileField: Joi.any().custom((value: FileList, helper) => {
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

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<IFilePost>({
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
