import React from 'react';
import styles from 'css/loadingPage.module.scss';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div className={styles.loadingPage}>
      <CircularProgress />
    </div>
  );
}
