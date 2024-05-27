import { useAppDispatch } from 'store/hooks';
import { useEffect } from 'react';
import { users } from 'store';
import { AppThunk } from 'store/store';
import { pick } from 'lodash';
import { IUserPost } from 'api/userApi';
import { useNotify } from 'shared/hooks';
import { IProps } from './UserModal';
import { usePrepareForm } from './usePrepareForm';
import { useGetUser } from '../../../User/useGetUser';

export function useUserModal({ id, type, onClose, refreshUsersList }: IProps) {
  const dispatch = useAppDispatch();
  const notify = useNotify();
  const { model } = useGetUser({ id: id! });

  const { watch, register, handleSubmit, errors, isValid, isDirty, reset } =
    usePrepareForm({ id });

  useEffect(() => {
    reset(pick(model, ['name', 'email']) as IUserPost);
  }, [model, reset]);

  const updateUserThunk =
    (formData: IUserPost): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(
        users.updateUser.thunk.request({
          id: id!,
          body: formData,
        })
      );
      const { error } = users.updateUser.selector.state(getState());

      if (error) {
        return notify(error.data, 'error');
      }

      notify('Successfully create new user', 'success');
      refreshUsersList();
      onClose(false);
    };

  const createUserThunk =
    (formData: IUserPost): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(
        users.createUser.thunk.request({
          body: formData,
        })
      );
      const { error } = users.createUser.selector.state(getState());

      if (error) {
        return notify(error.data, 'error');
      }

      notify('Successfully create new user', 'success');
      refreshUsersList();
      onClose(false);
    };

  const submitForm = (data: IUserPost) => {
    if (type === 'create') {
      dispatch(createUserThunk(data));
    }
    if (type === 'update') {
      dispatch(updateUserThunk(data));
    }
  };

  return {
    id,
    watch,
    submitForm,
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
  };
}
