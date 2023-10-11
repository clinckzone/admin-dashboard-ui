import { User, Columns } from '../utils/types';
import DeleteIcon from '../assets/delete.svg?react';
import EditIcon from '../assets/edit.svg?react';

const Row: React.FC<{ user: User }> = ({ user }) => {
	return (
		<div
			className={`grid grid-cols-8 items-center h-10 ${
				user.id % 2 ? 'bg-slate-300' : 'bg-slate-100'
			}`}
		>
			<input type="checkbox" className="h-5 col-span-1" id={`${user.id}`} />
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
