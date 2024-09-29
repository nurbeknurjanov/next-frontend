import { ComponentType } from 'react';
import { withCleanPageData } from './withCleanPageData';
import { withMuiAdjust } from './withMuiAdjust';
import { withQueryErrorNotify } from './withQueryErrorNotify';
import { withHandleAccessToken } from './withHandleAccessToken';
import { withLanguageAdjust } from './withLanguageAdjust';

export const withPageWrapper = <T extends object>(
  Component: ComponentType<T>
) => {
  const CleanedComponent = withCleanPageData(Component);
  const MuiAdjustedComponent = withMuiAdjust(CleanedComponent);
  const WithQueryErrorComponent = withQueryErrorNotify(MuiAdjustedComponent);
  const WithHandleAccessTokenComponent = withHandleAccessToken(
    WithQueryErrorComponent
  );
  const LanguageAdjustedComponent = withLanguageAdjust(
    WithHandleAccessTokenComponent
  );

  return LanguageAdjustedComponent;
};
