import { combineReducers } from '@reduxjs/toolkit';
import {
  getUsersObject,
  updateUserObject,
  deleteUserObject,
  getUserObject,
  createUserObject,
  userChangePasswordObject,
  updateProfileObject,
} from './slices';

export const usersReducer = combineReducers({
  getUsers: getUsersObject.reducer,
  updateUser: updateUserObject.reducer,
  deleteUser: deleteUserObject.reducer,
  getUser: getUserObject.reducer,
  createUser: createUserObject.reducer,
  userChangePassword: userChangePasswordObject.reducer,
  updateProfile: updateProfileObject.reducer,
});
