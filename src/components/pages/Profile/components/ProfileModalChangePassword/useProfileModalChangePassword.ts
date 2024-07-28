import { useAppDispatch, useAppSelector } from 'store/hooks';
import { users } from 'store';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './ProfileModalChangePassword';
import { notify } from 'store/common/thunks';
import { profileChangePasswordThunk } from 'store/users/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';

export function useProfileModalChangePassword({ onClose }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tUserPage = useTranslations('UserPage');
  const tUser = useTranslations('User');

  const userChangePasswordState = useAppSelector(
    users.userChangePassword.selector.state
  );

  const i18nJoi = useI18nJoi();
  const schema = i18nJoi.object({
    password: Joi.string().min(6).label(tUser('password')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IUserPost>({
    mode: 'onTouched',
    resolver: joiResolver(schema),
  });

  const updateProfilePassword = async (
    formData: Pick<IUserPost, 'password'>
  ) => {
    const { data } = await dispatch(profileChangePasswordThunk(formData));

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
    }
  };

  const submitForm = (formData: Pick<IUserPost, 'password'>) => {
    updateProfilePassword(formData);
  };

  return {
    tCommon,
    tUserPage,
    tUser,
    userChangePasswordState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  };
}
