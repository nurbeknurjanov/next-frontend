'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import styles from './footer.module.scss';

export const Footer = () => {
  const theme = useTheme();
  return (
    <Box mx={theme.spacing(3)} className={styles.footer}>
      <Paper sx={{ color: 'secondary' }}>Next © 2024</Paper>
    </Box>
  );
};
