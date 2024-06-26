'use client';
import * as React from 'react';
import styles from './content.module.scss';
import { Page, Title, Buttons, Breadcrumbs, Notify } from './components';
import { PropsWithChildren } from 'react';

export function Content({ children }: PropsWithChildren) {
  return (
    <section className={styles.content}>
      <div className={styles.top}>
        <Breadcrumbs />
        <Buttons />
      </div>

      <div className={styles.bottom}>
        <Notify />
        <Title />
        <Page>{children}</Page>
      </div>
    </section>
  );
}
