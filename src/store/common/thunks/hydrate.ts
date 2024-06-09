import { common } from 'store';

export const hydratedToClient = () => common.hydrate.actions.hydratedToClient();

export const setServerWait = (waitForServer: boolean) =>
  common.hydrate.actions.setServerWait(waitForServer);
