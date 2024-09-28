'use client';
import React, { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useSetPageData } from 'shared/hooks';
import { withPageWrapper } from 'shared/hocs';
import { SEX_ENUM, STATUS_ENUM } from 'api/usersApi';
import { useGetUserByIdQuery, useAddUserMutation } from 'store/users/query';

let Contact: FC = () => {
  const tContactPage = useTranslations('ContactPage');
  useSetPageData(tContactPage('title'), [tContactPage('title')]);

  const { data, isLoading } = useGetUserByIdQuery('66c20d6a473ee51e08f7f8041');

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
