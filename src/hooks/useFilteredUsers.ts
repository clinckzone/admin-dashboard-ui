import { useRecoilValue } from 'recoil';
import { usersState } from '../store/atoms/users';
import { searchTextState } from '../store/atoms/search';
import { User } from '../utils/types';

export const useFilteredUsers: () => User[] = () => {
  const users = useRecoilValue(usersState);
  const searchText = useRecoilValue(searchTextState);

  return users.filter((user) => {
    return JSON.stringify(user).includes(searchText);
  });
};
