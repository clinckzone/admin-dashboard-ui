type SearchProps = {
  searchText: string;
  updateSearchText: (searchText: string) => void;
};

const Search: React.FC<SearchProps> = ({ searchText, updateSearchText }) => {
  return (
    <input
      type="text"
      value={searchText}
      placeholder="Search users"
      onChange={(e) => updateSearchText(e.target.value)}
      className="mb-2 p-2 border-2 rounded-[4px] border-slate-200 focus:outline-slate-400 bg-slate-100 w-[25%] h-10"
    />
  );
};

export default Search;
