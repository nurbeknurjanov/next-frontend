import { useAppDispatch, useAppSelector } from 'store/hooks';
import { users } from 'store';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './UserModalChangePassword';
import { notify } from 'store/common/thunks';
import { updateUserThunk } from 'store/users/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';

export function useUserModalChangePassword({
  onClose,
  afterUpdate,
  id,
}: IProps) {
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

  const updateUserPassword = async (id: string, formData: IUserPost) => {
    const { data } = await dispatch(updateUserThunk(id, formData));

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
      afterUpdate();
    }
  };

  const submitForm = (formData: IUserPost) => {
    updateUserPassword(id!, formData);
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
