const DeleteButton: React.FC<{ active: boolean }> = ({ active }) => {
	const activeStyle = 'hover:bg-red-600 bg-red-500';
	const inactiveStyle = 'bg-red-200';
	return (
		<button
			className={`h-10 self-center rounded-[4px] text-white ${
				active ? activeStyle : inactiveStyle
			}`}
		>
			Delete Selected
		</button>
	);
};

export default DeleteButton;
