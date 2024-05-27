import * as React from 'react';
import { useAppSelector } from 'store/hooks';
import { common } from 'store';
import styles from 'css/global.module.scss';

export const PageTopContentButtons: React.FC = () => {
  const buttons = useAppSelector(common.pageTopContentButtons.selector.state);
  if (!buttons) {
    return null;
  }

  return <div className={styles.pageTopContentButtons}>{buttons}</div>;
};
