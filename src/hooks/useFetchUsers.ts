import { useEffect } from 'react';
import { User } from '../utils/types';
import { USERS_FETCH_ENDPOINT } from '../utils/constants';
import { useRecoilState } from 'recoil';
import { usersState } from '../store/atoms/users';

export const useFetchUsers: () => User[] = () => {
	const [users, setUsers] = useRecoilState(usersState);

	useEffect(() => {
		async function fetchUsers(): Promise<User[]> {
			const data = await fetch(USERS_FETCH_ENDPOINT);
			const users = await data.json();
			return users;
		}

		fetchUsers().then((data) => {
			setUsers(data);
		});
	}, [setUsers]);

	return users;
};
