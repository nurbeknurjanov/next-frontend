import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './ProfileModalUpdate';
import { useUserForm } from 'components/pages/Users';
import { notify } from 'store/common/thunks';
import { getAuthUser } from 'store/common/selectors';
import { useUpdateProfileMutation } from 'api/usersQuery';

export function useProfileModalUpdate({ onClose }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProfilePage = useTranslations('ProfilePage');
  const tUser = useTranslations('User');

  const model = useAppSelector(getAuthUser);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { register, errors, isValid, isDirty, handleSubmit, watch, setValue } =
    useUserForm({
      model: model!,
    });

  const updateUser = async (formData: IUserPost) => {
    const { data } = await updateProfile(formData);

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
    }
  };

  const submitForm = (formData: IUserPost) => {
    updateUser(formData);
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
    watch,
    setValue,
  };
}
