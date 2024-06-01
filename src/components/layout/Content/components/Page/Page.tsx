import * as React from 'react';
import { PropsWithChildren } from 'react';

export const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};
