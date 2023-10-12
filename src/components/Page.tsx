import { User } from '../utils/types';
import Row from './Row';
import RowHeader from './RowHeader';

type PageProps = {
	users: User[];
	searchText: string;
};

const Page: React.FC<PageProps> = ({ users, searchText }) => {
	return (
		<div className="w-9/12">
			<RowHeader />
			{users.length > 0 ? (
				users.map((user, index) => <Row user={user} index={index} key={user.id} />)
			) : (
				<div className="flex items-center justify-center font-bold h-[200px] bg-slate-100">
					{`No results for "${searchText}"`}
				</div>
			)}
		</div>
	);
};

export default Page;
