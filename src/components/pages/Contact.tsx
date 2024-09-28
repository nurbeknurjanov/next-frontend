'use client';
import React, { FC, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { withPageWrapper } from 'shared/hocs';
import { SEX_ENUM, STATUS_ENUM } from 'api/usersApi';
import { useGetUserByIdQuery, useAddUserMutation } from 'store/users/query';
import { notify } from 'store/common/thunks';
import { useAppDispatch } from 'store/hooks';

let Contact: FC = () => {
  const tContactPage = useTranslations('ContactPage');
  useSetPageData(tContactPage('title'), [tContactPage('title')]);

  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetUserByIdQuery(
    '66c20d6a473ee51e08f7f8041'
  );

  useEffect(() => {
    if (error && 'data' in error) {
      dispatch(notify(error.data.message, 'error'));
    }
  }, [error, dispatch]);

  const [addUser, { isLoading: isAdding }] = useAddUserMutation();

  return (
    <>
      {tContactPage('description', { phone: '996558011477' })}
      <br />
      <div>{JSON.stringify(data)}</div>
      <button
        onClick={() =>
          addUser({
            name: 'New user',
            email: 'newuser@mail.ru',
            age: 20,
            sex: SEX_ENUM.MALE,
            status: STATUS_ENUM.ENABLED,
            password: '123123',
          })
        }
      >
        Add user
      </button>
    </>
  );
};

Contact = withPageWrapper(Contact);

export { Contact };
