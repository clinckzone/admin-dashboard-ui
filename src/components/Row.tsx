import { useCallback, useState } from 'react';
import { User, Columns } from '../utils/types';
import TickIcon from '../assets/tick.svg?react';
import DeleteIcon from '../assets/delete.svg?react';
import EditIcon from '../assets/edit.svg?react';
import { capitalizeFirstLetter } from '../utils/helper';

type RowProps = {
	user: User;
	index: number;
	isChecked: boolean;
	updateUser: (user: User) => void;
	deleteUser: (user: User) => void;
	toggleUserSelection: (user: User, checked: boolean) => void;
};

const Row: React.FC<RowProps> = ({
	user,
	index,
	isChecked,
	toggleUserSelection,
	updateUser,
	deleteUser,
}) => {
	const [editMode, toggleEditMode] = useState(false);
	const [userData, setUserData] = useState<User>(user);

	const updateUserData = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>, column: keyof User) => {
			setUserData((prevUser: User) => {
				const newUser = { ...prevUser, [column]: e.target.value };
				return newUser;
			});
		},
		[]
	);

	return (
		<div
			className={`grid grid-cols-8 items-center h-10  ${
				isChecked ? 'bg-blue-500 text-white' : index % 2 ? 'bg-slate-300' : 'bg-slate-100'
			}`}
		>
			<input
				type="checkbox"
				className="h-5 col-span-1"
				id={`${user.id}`}
				checked={isChecked}
				onChange={(e) => {
					if (!editMode) toggleUserSelection(user, e.target.checked);
				}}
			/>
			{editMode
				? Columns.map((column) => (
						<input
							type="text"
							value={userData[column]}
							placeholder={capitalizeFirstLetter(column)}
							className={`col-span-2 h-8 mr-2 px-2 border-2 rounded-[4px] ${
								index % 2
									? 'bg-slate-200 outline-slate-500 border-slate-100'
									: 'outline-slate-400'
							}`}
							onChange={(e) => updateUserData(e, column)}
						/>
				))
				: Columns.map((column) => (
						<div key={column} className="col-span-2">
							{user[column]}
						</div>
				))}
			<div className="flex gap-2 col-span-1">
				{editMode ? (
					<TickIcon
						className="hover:cursor-pointer hover:scale-[1.2] text-green-500"
						onClick={() => {
							updateUser(userData);
							toggleEditMode(false);
						}}
					/>
				) : (
					<EditIcon
						className="hover:cursor-pointer hover:scale-[1.2]"
						onClick={() => {
							if (!isChecked) return toggleEditMode(true);
						}}
					/>
				)}
				<DeleteIcon
					className="hover:cursor-pointer hover:scale-[1.2] text-red-500"
					onClick={() => deleteUser(user)}
				/>
			</div>
		</div>
	);
};

export default Row;
