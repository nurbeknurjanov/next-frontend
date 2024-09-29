import React, { FC, ComponentType, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslations } from 'next-intl';

export const withMuiAdjust = <T extends object>(
  Component: ComponentType<T>
) => {
  const NewComponent: FC<T> = props => {
    const Theme = useTheme();
    const tCommon = useTranslations('Common');

    useEffect(() => {
      if (Theme.components!.MuiTablePagination) {
        Theme.components!.MuiTablePagination!.defaultProps = {
          ...Theme.components!.MuiTablePagination!.defaultProps,
          labelRowsPerPage: tCommon('labelRowsPerPage'),
        };
      }

      if (Theme.components?.MuiDataGrid?.defaultProps) {
        Theme.components.MuiDataGrid.defaultProps.localeText = {
          noRowsLabel: tCommon('noRowsLabel'),
        };
      }
    }, [Theme, tCommon]);

    return <Component {...props} />;
  };
  return NewComponent;
};
