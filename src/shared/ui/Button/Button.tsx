import React, { FC } from 'react';
import { default as MuiButton } from '@mui/material/Button';
import { ButtonProps } from '@mui/material';

declare module '@mui/material/Button' {
  //eslint-disable-next-line
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }

  //eslint-disable-next-line
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

export const Button: FC<ButtonProps> = ({ ...props }) => {
  return <MuiButton {...props} />;
};
