import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IUserPost, useCreateUserMutation } from 'api/users';
import { IProps } from './UserModalCreate';
import { useUserForm } from '../useUserForm';
import { notify } from 'store/common/thunks';

export function useUserModalCreate({ onClose }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tUsersPage = useTranslations('UsersPage');
  const tUser = useTranslations('User');

  const [createModel, { isLoading }] = useCreateUserMutation();

  const { register, errors, isValid, isDirty, handleSubmit, watch, setValue } =
    useUserForm({});

  const createUser = async (formData: IUserPost) => {
    const { data } = await createModel(formData);

    if (data) {
      onClose();
      dispatch(notify(tCommon('successCreated'), 'success'));
    }
  };

  const submitForm = createUser;

  return {
    tCommon,
    tUsersPage,
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
