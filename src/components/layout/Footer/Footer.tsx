'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

export const Footer = () => {
  const theme = useTheme();
  return (
    <Box mx={theme.spacing(3)}>
      <Paper component={'footer'}>Footer</Paper>
    </Box>
  );
};
