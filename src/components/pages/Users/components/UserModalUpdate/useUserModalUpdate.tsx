import { useAppDispatch, useAppSelector } from 'store/hooks';
import { users } from 'store';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './UserModalUpdate';
import { usePrepareForm } from '../usePrepareForm';
import { useUserModel } from 'components/pages/User';
import { notify } from 'store/common/thunks';
import { updateUserThunk } from 'store/users/thunks';
import { getAggStates } from 'store/common/types';

export function useUserModalUpdate({ onClose, refreshList, id }: IProps) {
  const dispatch = useAppDispatch();
  const tCommon = useTranslations('Common');
  const tUserPage = useTranslations('UserPage');
  const tUser = useTranslations('User');

  const { model, getUserState } = useUserModel({ id });

  const updateUserState = useAppSelector(users.updateUser.selector.state);
  const aggStates = getAggStates(updateUserState);

  const { register, errors, isValid, isDirty, handleSubmit, watch, setValue } =
    usePrepareForm({
      model: model!,
    });

  const updateUser = async (id: string, formData: IUserPost) => {
    const { data } = await dispatch(updateUserThunk(id, formData));

    if (data) {
      onClose();
      dispatch(notify(tCommon('successUpdated'), 'success'));
      refreshList();
    }
  };

  const submitForm = (formData: IUserPost) => {
    updateUser(id!, formData);
  };

  return {
    tCommon,
    tUserPage,
    tUser,
    aggStates,
    getUserState,
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
