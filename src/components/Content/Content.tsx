'use client';
import * as React from 'react';
import styles from 'css/global.module.scss';
import { Breadcrumbs } from 'shared/ui';
import { Page, Title, PageTopContentButtons, Notify } from 'components';
import { PropsWithChildren } from 'react';

export function Content({ children }: PropsWithChildren) {
  return (
    <section className={styles.content}>
      <div className={styles.pageTopContent}>
        <Breadcrumbs />
        <PageTopContentButtons />
      </div>

      <div className={styles.pageContent}>
        <Notify />
        <Title />
        <Page>{children}</Page>
      </div>
    </section>
  );
}
