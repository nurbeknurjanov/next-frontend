import { ComponentType } from 'react';
import { withCleanPageData } from './withCleanPageData';
import { withMuiAdjust } from './withMuiAdjust';
import { withQueryErrorNotify } from './withQueryErrorNotify';
import { withHandleAccessToken } from './withHandleAccessToken';
import { withLanguageAdjust } from './withLanguageAdjust';

export const withPageWrapper = <T extends object>(
  Component: ComponentType<T>
) => {
  let NewComponent = withCleanPageData(Component);
  NewComponent = withMuiAdjust(NewComponent);
  NewComponent = withQueryErrorNotify(NewComponent);
  NewComponent = withHandleAccessToken(NewComponent);
  NewComponent = withLanguageAdjust(NewComponent);

  return NewComponent;
};
