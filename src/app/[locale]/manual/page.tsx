import React from 'react';
import { Counter } from 'components';
import { serverStore } from 'store/store';
import { common, counter } from 'store';
import type { PageProps } from 'app/types';

//eslint-disable-next-line
export default async function ManualPage(props: PageProps) {
  serverStore.dispatch(common.title.actions.set({ title: 'Manual' }));
  await serverStore.dispatch(counter.actions.incrementByAmount(100));

  return <Counter />;
}
