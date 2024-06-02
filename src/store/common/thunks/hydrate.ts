import { common } from 'store';

export const setIsServerStoreActual = (isServerStoreActual: boolean) =>
  common.hydrate.actions.setIsServerStoreActual(isServerStoreActual);

export const setServerWait = (waitForServer: boolean) =>
  common.hydrate.actions.setServerWait(waitForServer);
