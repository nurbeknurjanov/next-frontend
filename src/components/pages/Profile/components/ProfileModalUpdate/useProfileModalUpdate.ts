import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IUserPost, useUpdateProfileMutation } from 'api/users';
import { IProps } from './ProfileModalUpdate';
import { useUserForm } from 'components/pages/Users';
import { notify } from 'store/common/thunks';
import { getAuthUser } from 'store/common/selectors';

export function useProfileModalUpdate({ onClose }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tProfilePage = useTranslations('ProfilePage');
  const tUser = useTranslations('User');

  const model = useAppSelector(getAuthUser);
  const [updateProfileAction, { isLoading }] = useUpdateProfileMutation();

  const { register, errors, isValid, isDirty, handleSubmit, watch, setValue } =
    useUserForm({
      model: model!,
    });

  const updateProfile = async (formData: IUserPost) => {
    const { data } = await updateProfileAction(formData);

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
    }
  };

  const submitForm = (formData: IUserPost) => {
    updateProfile(formData);
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
