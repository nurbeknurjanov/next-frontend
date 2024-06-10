import { useAppDispatch, useAppSelector } from 'store/hooks';
import { users } from 'store';
import { useTranslations } from 'next-intl';
import { IUserPost } from 'api/usersApi';
import { IProps } from './UserModalCreate';
import { usePrepareForm } from '../usePrepareForm';
import { notify } from 'store/common/thunks';
import { createUserThunk } from 'store/users/thunks';

export function useUserModalCreate({ onClose, refreshList }: IProps) {
  const dispatch = useAppDispatch();
  const tc = useTranslations('Common');
  const tp = useTranslations('UserPage');
  const tm = useTranslations('User');

  const createUserState = useAppSelector(users.createUser.selector.state);

  const { register, errors, isValid, isDirty, handleSubmit } = usePrepareForm(
    {}
  );

  const createUser = async (formData: IUserPost) => {
    const { data } = await dispatch(createUserThunk(formData));

    if (data) {
      dispatch(notify(tc('successCreated'), 'success'));
      refreshList();
      onClose();
    }
  };

  const submitForm = createUser;

  return {
    tm,
    tc,
    tp,
    createUserState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  };
}
