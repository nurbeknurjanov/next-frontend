import React, { FC } from 'react';
import { default as MuiButton } from '@mui/material/Button';
import { ButtonProps as MuiButtonProps } from '@mui/material';

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

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({ loading, children, ...props }) => {
  let content = children;
  if (loading) {
    content = 'Loading';
  }
  return <MuiButton {...props}>{content}</MuiButton>;
};
