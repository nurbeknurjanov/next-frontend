'use client';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'store/hooks';
import { common } from 'store';
import { useEffect } from 'react';

export const Title = () => {
  const { title } = useAppSelector(common.title.selector.state);

  useEffect(() => {
    //document.title = pageTitle;
  }, [title]);

  if (!title) {
    return null;
  }

  return (
    <Typography variant="h5" sx={{ mb: 2 }}>
      {title}
    </Typography>
  );
};
