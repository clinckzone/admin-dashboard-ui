import { atom } from 'recoil';
import { User } from '../../utils/types';

export const usersState = atom<User[]>({
  key: 'usersState',
  default: [],
});

export const selectedUsersState = atom<User[]>({
  key: 'selectedUserState',
  default: [],
});
