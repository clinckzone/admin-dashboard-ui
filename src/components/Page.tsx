import { useCallback } from 'react';
import { User } from '../utils/types';
import Row from './Row';
import RowHeader from './RowHeader';

type PageProps = {
	users: User[];
	searchText: string;
	selectedUsers: User[];
	setSelectedUsers: (users: User[] | ((users: User[]) => User[])) => void;
};

const Page: React.FC<PageProps> = ({ users, searchText, selectedUsers, setSelectedUsers }) => {
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
		<div className="w-9/12">
			<RowHeader
				isChecked={users.every((user) => selectedUsers.includes(user))}
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
							toggleUserSelection={toggleUserSelection}
							key={user.id}
						/>
					);
				})
			) : (
				<div className="flex items-center justify-center font-bold h-[200px] bg-slate-100">
					{`No results for "${searchText}"`}
				</div>
			)}
		</div>
	);
};

export default Page;
