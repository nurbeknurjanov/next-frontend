'use client';
import React from 'react';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import styles from './footer.module.scss';

export const Footer = () => {
  const theme = useTheme();
  return (
    <Paper
      className={styles.footer}
      sx={{ color: 'secondary.main', mx: theme.spacing(3) }}
    >
      Next © 2024
    </Paper>
  );
};
