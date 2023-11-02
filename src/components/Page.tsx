import Row from './Row';
import { useCallback } from 'react';
import RowHeader from './RowHeader';
import { User } from '../utils/types';
import { pageState } from '../store/atoms/page';
import { USERS_PER_PAGE } from '../utils/constants';
import { searchTextState } from '../store/atoms/search';
import { useFilteredUsers } from '../hooks/useFilteredUsers';
import { selectedUsersState, usersState } from '../store/atoms/users';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const Page: React.FC = () => {
  const filteredUsers = useFilteredUsers();
  const page = useRecoilValue(pageState);
  const setUsers = useSetRecoilState(usersState);
  const searchText = useRecoilValue(searchTextState);
  const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUsersState);

  const updateUser = useCallback(
    (user: User) => {
      setUsers((prevUsers: User[]) => {
        const newUsers = [...prevUsers];
        const index = newUsers.findIndex((u) => u.id === user.id);
        newUsers.splice(index, 1, user);
        return newUsers;
      });
    },
    [setUsers]
  );

  const deleteUser = useCallback(
    (user: User) => {
      setUsers((prevUsers: User[]) => {
        const newUsers = [...prevUsers].filter((u) => u.id !== user.id);
        return newUsers;
      });
    },
    [setUsers]
  );

  const getUserOnPage = useCallback(
    (page: number): User[] => {
      // Reduce pageNum by 1 since array index starts from 1
      const minIndex = (page - 1) * USERS_PER_PAGE;
      const maxIndex = USERS_PER_PAGE * page;

      return filteredUsers.filter(
        (_, index) => index >= minIndex && index < maxIndex
      );
    },
    [filteredUsers]
  );

  const users = getUserOnPage(page);

  const togglePageSelection = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedUsers(users);
      } else {
        setSelectedUsers([]);
      }
    },
    [setSelectedUsers, users]
  );

  const toggleUserSelection = useCallback(
    (user: User, isChecked: boolean) => {
      if (isChecked) {
        setSelectedUsers((prevUsers: User[]) => {
          const newUsers = [...prevUsers];
          newUsers.push(user);
          return newUsers;
        });
      } else {
        setSelectedUsers((prevUsers: User[]) => {
          const newUsers = [...prevUsers];
          return newUsers.filter((newUser) => user.id !== newUser.id);
        });
      }
    },
    [setSelectedUsers]
  );

  return (
    <div className='w-9/12'>
      <RowHeader
        isChecked={
          users.length > 0 &&
          users.every((user) => selectedUsers.includes(user))
        }
        togglePageSelection={togglePageSelection}
      />
      {users.length > 0 ? (
        users.map((user, index) => {
          const isChecked = selectedUsers.includes(user);
          return (
            <Row
              user={user}
              index={index}
              isChecked={isChecked}
              updateUser={updateUser}
              deleteUser={deleteUser}
              toggleUserSelection={toggleUserSelection}
              key={user.id}
            />
          );
        })
      ) : (
        <div className='flex items-center justify-center font-bold h-[200px] bg-slate-100'>
          {`No results for "${searchText}"`}
        </div>
      )}
    </div>
  );
};

export default Page;
