import { useCallback, useEffect, useState } from 'react';
import { USERS_FETCH_ENDPOINT, USERS_PER_PAGE } from './utils/constants';
import { User } from './utils/types';
import Pagination from './components/Pagination';
import Page from './components/Page';

function App() {
	const [page, setPage] = useState<number>(1);

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
		(page: number): User[] => {
			// Reduce pageNum by 1 since array index starts from 1
			const minIndex = (page - 1) * USERS_PER_PAGE;
			const maxIndex = USERS_PER_PAGE * page;

			return filteredUsers.filter((item, index) => index >= minIndex && index < maxIndex);
		},
		[filteredUsers]
	);

	const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
	const setCurrentPage = useCallback(
		(page: number) => {
			if (page >= 1 && page <= totalPages) {
				setPage(page);
			}
		},
		[totalPages]
	);

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl font-bold my-5">Admin Dashboard</h1>
			<Page users={getUserOnPage(page)} />
			<Pagination
				totalPages={totalPages}
				currentPage={page}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}

export default App;
