import { User } from '../utils/types';
import Row from './Row';
import RowHeader from './RowHeader';

type PageProps = {
	users: User[];
};

const Page: React.FC<PageProps> = ({ users }) => {
	return (
		<div className="w-9/12">
			<RowHeader />
			{users.map((user) => (
				<Row user={user} key={user.id} />
			))}
		</div>
	);
};

export default Page;
