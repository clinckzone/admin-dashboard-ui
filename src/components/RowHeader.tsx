import { Columns } from '../utils/types';
import { capitalizeFirstLetter } from '../utils/helper';

const RowHeader: React.FC = () => {
	return (
		<div className="grid grid-cols-8 h-10 font-bold items-center bg-slate-100">
			<input type="checkbox" className="h-5 col-span-1" id={`rowHeader`} />
			{Columns.map((column) => (
				<div key={column} className="col-span-2">
					{capitalizeFirstLetter(column)}
				</div>
			))}
			<div className="col-span-1">Actions</div>
		</div>
	);
};

export default RowHeader;
