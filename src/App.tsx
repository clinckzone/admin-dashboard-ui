import Pagination from './components/Pagination';
import Page from './components/Page';
import Search from './components/Search';
import DeleteButton from './components/DeleteButton';
import { useFetchUsers } from './hooks/useFetchUsers';

function App() {
  useFetchUsers();
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold my-5'>Admin Dashboard</h1>
      <Search />
      <Page />
      <div className='w-9/12 grid grid-cols-[150px_auto_150px]'>
        <DeleteButton />
        <Pagination />
      </div>
    </div>
  );
}

export default App;
