import { useAppSelector } from 'store/hooks';
import { useRef } from 'react';
import { users } from 'store';
import { useSetPageData, useHydrateState } from 'shared/hooks';
import { getAggStates } from 'store/common/types';
import { useGetUser } from './useGetUser';
import { useParams } from 'next/navigation';
import { UserPageProps } from 'app/[locale]/users/[id]/page';

export function useUser() {
  const isServerStoreActual = useRef<boolean>();
  isServerStoreActual.current = useHydrateState();
  const { id } = useParams<UserPageProps['params']>();
  const { model } = useGetUser({ id });

  //const gamesState = useAppSelector(games.getGames.selector.state);
  const userState = useAppSelector(users.getUser.selector.state);
  const aggStates = getAggStates(userState);

  const title = model?.name || '';

  useSetPageData(title, [
    {
      label: 'Users',
      href: '/users',
    },
    title,
  ]);

  return {
    model,
    aggStates,
  };
}
