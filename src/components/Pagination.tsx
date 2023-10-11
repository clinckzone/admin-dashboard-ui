type PaginationProps = {
	totalPages: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {
	return <div></div>;
};

export default Pagination;
