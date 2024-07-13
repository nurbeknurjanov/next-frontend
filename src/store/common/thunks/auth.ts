import { AuthStateType } from '../slices';
import { common } from 'store';
export const authorize = (data: Omit<AuthStateType, 'isAuth'>) =>
  common.auth.actions.set({ ...data, isAuth: true });
export const logout = () => common.auth.actions.reset();
