import { useCallback, useEffect, useMemo, useState } from 'react';
import { USERS_FETCH_ENDPOINT, USERS_PER_PAGE } from './utils/constants';
import { User } from './utils/types';
import Pagination from './components/Pagination';
import Page from './components/Page';

function App() {
	const [page, setPage] = useState<number>(0);

	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

	useEffect(() => {
		async function fetchUsers(): Promise<User[]> {
			const data = await fetch(USERS_FETCH_ENDPOINT);
			const users = await data.json();
			return users;
		}

		fetchUsers().then((data) => {
			setUsers(data);
			setFilteredUsers(data);
		});
	}, []);

	const getUserOnPage = useCallback(
		(pageNum: number): User[] => {
			const minIndex = pageNum * USERS_PER_PAGE;
			const maxIndex = USERS_PER_PAGE * (pageNum + 1);

			return filteredUsers.filter((item, index) => index >= minIndex && index < maxIndex);
		},
		[filteredUsers]
	);

	const totalPages = useMemo(() => {
		if (filteredUsers.length % USERS_PER_PAGE === 0) {
			return filteredUsers.length / USERS_PER_PAGE;
		} else return filteredUsers.length / USERS_PER_PAGE + 1;
	}, [filteredUsers.length]);

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl font-bold my-5">Admin Dashboard</h1>
			<Page users={getUserOnPage(page)} />
			<Pagination totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
		</div>
	);
}

export default App;
