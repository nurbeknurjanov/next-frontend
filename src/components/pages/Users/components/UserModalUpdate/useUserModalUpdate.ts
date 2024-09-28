import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './UserModalUpdate';
import { useUserForm } from '../useUserForm';
import { notify } from 'store/common/thunks';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'store/users/query';
import { skipToken } from '@reduxjs/toolkit/query';

export function useUserModalUpdate({ onClose, id }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tUserPage = useTranslations('UserPage');
  const tUser = useTranslations('User');

  const { data: model, isLoading } = useGetUserByIdQuery(id ?? skipToken);
  const [updateModel, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

  const { register, errors, isValid, isDirty, handleSubmit, watch, setValue } =
    useUserForm({
      model: model!,
    });

  const updateUser = async (id: string, formData: IUserPost) => {
    const { data } = await updateModel({ id, ...formData });

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
    }
  };

  const submitForm = (formData: IUserPost) => {
    updateUser(id!, formData);
  };

  return {
    tCommon,
    tUserPage,
    tUser,
    isLoadingUpdate,
    isLoading,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    watch,
    setValue,
  };
}
