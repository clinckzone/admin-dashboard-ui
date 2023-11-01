type DeleteButtonProps = {
  active: boolean;
  onDelete: () => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ active, onDelete }) => {
  const activeStyle = 'hover:bg-red-600 bg-red-500';
  const inactiveStyle = 'bg-red-200';
  return (
    <button
      onClick={() => onDelete()}
      className={`my-4 h-10 self-center rounded-[4px] text-white ${
        active ? activeStyle : inactiveStyle
      }`}
    >
      Delete Selected
    </button>
  );
};

export default DeleteButton;
