import { AuthStateType } from '../slices';
import { common } from 'store';
export const auth = (data: AuthStateType) => common.auth.actions.set(data);
