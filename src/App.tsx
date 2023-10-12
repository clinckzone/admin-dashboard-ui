import { useCallback, useEffect, useState } from 'react';
import { USERS_FETCH_ENDPOINT, USERS_PER_PAGE } from './utils/constants';
import { User } from './utils/types';
import Pagination from './components/Pagination';
import Page from './components/Page';
import Search from './components/Search';
import DeleteButton from './components/DeleteButton';

function App() {
	const [page, setPage] = useState<number>(1);
	const [searchText, setSearchText] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
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

	// const deleteSelectedUsers = useCallback(() => {

	// }, []);

	const filterUsersBySearch = useCallback(
		(searchText: string) => {
			setSearchText(searchText);
			setSelectedUsers([]);
			setPage(1);

			const filteredUsers = users.filter((user) => {
				return JSON.stringify(user).includes(searchText);
			});

			setFilteredUsers(filteredUsers);
		},
		[users]
	);

	const getUserOnPage = useCallback(
		(page: number): User[] => {
			// Reduce pageNum by 1 since array index starts from 1
			const minIndex = (page - 1) * USERS_PER_PAGE;
			const maxIndex = USERS_PER_PAGE * page;

			return filteredUsers.filter((_, index) => index >= minIndex && index < maxIndex);
		},
		[filteredUsers]
	);

	const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
	const setCurrentPage = useCallback(
		(page: number) => {
			if (page >= 1 && page <= totalPages) {
				setPage(page);
				setSelectedUsers([]);
			}
		},
		[totalPages]
	);

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl font-bold my-5">Admin Dashboard</h1>
			<Search searchText={searchText} filterUsersBySearch={filterUsersBySearch} />
			<Page
				users={getUserOnPage(page)}
				searchText={searchText}
				selectedUsers={selectedUsers}
				setSelectedUsers={setSelectedUsers}
			/>
			<div className="w-9/12 grid grid-cols-[150px_auto_150px]">
				<DeleteButton active={selectedUsers.length > 0} />
				{filteredUsers.length > 0 && (
					<Pagination
						totalPages={totalPages}
						currentPage={page}
						setCurrentPage={setCurrentPage}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
