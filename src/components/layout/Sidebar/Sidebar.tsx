'use client';
import React from 'react';
import Paper from '@mui/material/Paper';
import styles from './siderbar.module.scss';
import { ListMenu } from './components';

export function Sidebar() {
  return (
    <section className={styles.sidebar}>
      <Paper sx={{ height: '100%' }}>
        <ListMenu />
      </Paper>
    </section>
  );
}
