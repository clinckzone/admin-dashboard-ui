import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedUsersState, usersState } from '../store/atoms/users';
import { useCallback } from 'react';
import { User } from '../utils/types';

const DeleteButton: React.FC = () => {
  const activeStyle = 'hover:bg-red-600 bg-red-500';
  const inactiveStyle = 'bg-red-200';

  const setUsers = useSetRecoilState(usersState);
  const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUsersState);

  const onDelete = useCallback(() => {
    setUsers((prevUsers: User[]) => {
      const newUsers = [...prevUsers];
      return newUsers.filter((user) => !selectedUsers.includes(user));
    });
    setSelectedUsers([]);
  }, [selectedUsers, setSelectedUsers, setUsers]);

  return (
    <button
      onClick={() => onDelete()}
      className={`my-4 h-10 self-center rounded-[4px] text-white ${
        selectedUsers.length > 0 ? activeStyle : inactiveStyle
      }`}
    >
      Delete Selected
    </button>
  );
};

export default DeleteButton;
