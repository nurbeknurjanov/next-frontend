import React from 'react';
import styles from '../../../components/layout/Content/components/Page/page.module.scss';
import { Counter } from 'components';
import { serverStore } from 'store/store';
import { common, counter } from 'store';
import type { PageProps } from 'app/types';

//eslint-disable-next-line
export default async function ManualPage(props: PageProps) {
  serverStore.dispatch(common.title.actions.set({ title: 'Manual' }));
  await serverStore.dispatch(counter.actions.incrementByAmount(100));

  return (
    <div className={styles.page}>
      <div>
        SEO without USE CLIENT works {serverStore.getState().counter.value}
        <br />
        SEO with USE CLIENT DOESNT work even if you use serverStore
        <br />
        in that case now u gotta use client hydrated store
      </div>
      <Counter />
    </div>
  );
}
