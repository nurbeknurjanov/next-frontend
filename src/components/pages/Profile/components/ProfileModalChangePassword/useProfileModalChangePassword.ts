import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './ProfileModalChangePassword';
import { notify } from 'store/common/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';
import { useUpdateProfilePasswordMutation } from 'api/usersQuery';

export function useProfileModalChangePassword({ onClose }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProfilePage = useTranslations('ProfilePage');

  const tUser = useTranslations('User');
  const [updateProfilePasswordAction, { isLoading }] =
    useUpdateProfilePasswordMutation();

  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    currentPassword: Joi.string().min(6).label(tUser('currentPassword')),
    password: Joi.string().min(6).label(tUser('newPassword')),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<Pick<IUserPost, 'password'> & { currentPassword: string }>({
    mode: 'onTouched',
    resolver: joiResolver(schema),
  });

  const updateProfilePassword = async (
    formData: Pick<IUserPost, 'password'>
  ) => {
    const { error } = await updateProfilePasswordAction(formData);

    if (error) {
      if (error.data.fieldsErrors?.currentPassword) {
        setError('currentPassword', {
          type: '400',
          message: error.data.fieldsErrors.currentPassword,
        });
      }
      return;
    }

    onClose();
    dispatch(notify(tCommon('successUpdated'), 'success'));
  };

  const submitForm = (formData: Pick<IUserPost, 'password'>) => {
    updateProfilePassword(formData);
  };

  return {
    tCommon,
    tProfilePage,
    tUser,
    isLoading,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  };
}
