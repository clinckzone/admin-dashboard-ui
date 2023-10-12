import { User, Columns } from '../utils/types';
import DeleteIcon from '../assets/delete.svg?react';
import EditIcon from '../assets/edit.svg?react';

type RowProps = {
	user: User;
	index: number;
	isChecked: boolean;
	toggleUserSelection: (user: User, checked: boolean) => void;
};

const Row: React.FC<RowProps> = ({ user, index, isChecked, toggleUserSelection }) => {
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
				onChange={(e) => toggleUserSelection(user, e.target.checked)}
			/>
			{Columns.map((column) => {
				return (
					<div key={column} className="col-span-2">
						{user[column]}
					</div>
				);
			})}
			<RowActions />
		</div>
	);
};

const RowActions: React.FC = () => {
	return (
		<div className="flex gap-2 col-span-1">
			<EditIcon className="hover:cursor-pointer" />
			<DeleteIcon className="hover:cursor-pointer text-red-500" />
		</div>
	);
};

export default Row;
