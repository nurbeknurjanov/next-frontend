import {
  getUsersObject,
  deleteUserObject,
  updateUserObject,
  getUserObject,
  createUserObject,
  userChangePasswordObject,
  updateProfileObject,
} from './slices';

export const users = {
  getUsers: getUsersObject,
  updateUser: updateUserObject,
  deleteUser: deleteUserObject,
  getUser: getUserObject,
  createUser: createUserObject,
  userChangePassword: userChangePasswordObject,
  updateProfile: updateProfileObject,
};
