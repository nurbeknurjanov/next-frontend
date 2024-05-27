import {
  getUsersObject,
  deleteUserObject,
  updateUserObject,
  getUserObject,
  createUserObject,
} from './slices';

export const users = {
  getUsers: getUsersObject,
  updateUser: updateUserObject,
  deleteUser: deleteUserObject,
  getUser: getUserObject,
  createUser: createUserObject,
};
