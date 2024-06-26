import { combineReducers } from '@reduxjs/toolkit';
import {
  getUsersObject,
  updateUserObject,
  deleteUserObject,
  getUserObject,
  createUserObject,
} from './slices';

export const usersReducer = combineReducers({
  getUsers: getUsersObject.reducer,
  updateUser: updateUserObject.reducer,
  deleteUser: deleteUserObject.reducer,
  getUser: getUserObject.reducer,
  createUser: createUserObject.reducer,
});
