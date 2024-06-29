import { common } from 'store';

export const setServerWait = (waitForServer: boolean) =>
  common.hydrate.actions.setServerWait(waitForServer);
