'use client';
import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Checkbox } from 'shared/ui';
import { useSetPageData } from 'shared/hooks';

export function Manual() {
  const title = 'Manual page';
  useSetPageData(title, [
    {
      label: 'Home',
      href: '/',
    },
    title,
  ]);

  return (
    <>
      <Box component={'span'} sx={{ color: 'secondary.main', my: '20px' }}>
        Box
      </Box>
      <br />
      <Button variant={'contained'} color={'tertiary'}>
        Tertiary
      </Button>
      <Button variant={'dashed'}>Dashed</Button>
      <Button variant={'dashed'} color={'secondary'}>
        Dashed Secondary
      </Button>

      <Checkbox color={'tertiary'} checked />
      <br />
      <TextField label="Standard" variant="standard" color={'tertiary'} />
      <br />
    </>
  );
}
