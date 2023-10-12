import { Columns } from '../utils/types';
import { capitalizeFirstLetter } from '../utils/helper';

type RowHeaderProp = {
	isChecked: boolean;
	togglePageSelection: (checked: boolean) => void;
};

const RowHeader: React.FC<RowHeaderProp> = ({ isChecked, togglePageSelection }) => {
	return (
		<div className="grid grid-cols-8 h-10 font-bold items-center bg-slate-300">
			<input
				type="checkbox"
				checked={isChecked}
				className="h-5 col-span-1"
				id={`rowHeader`}
				onChange={(e) => togglePageSelection(e.target.checked)}
			/>
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
