import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchTextState } from '../store/atoms/search';
import { pageState } from '../store/atoms/page';
import { useCallback } from 'react';
import { selectedUsersState } from '../store/atoms/users';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const setSelectedUsers = useSetRecoilState(selectedUsersState);
  const setPage = useSetRecoilState(pageState);

  const updateSearchText = useCallback(
    (searchText: string) => {
      setPage(1);
      setSelectedUsers([]);
      setSearchText(searchText);
    },
    [setPage, setSearchText, setSelectedUsers]
  );

  return (
    <input
      type='text'
      value={searchText}
      placeholder='Search users'
      onChange={(e) => updateSearchText(e.target.value)}
      className='mb-2 p-2 border-2 rounded-[4px] border-slate-200 focus:outline-slate-400 bg-slate-100 w-[25%] h-10'
    />
  );
};

export default Search;
