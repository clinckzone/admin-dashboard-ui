import { useCallback } from 'react';
import ArrowLeft from '../assets/arrow_left.svg?react';
import ArrowRight from '../assets/arrow_right.svg?react';
import DoubleArrowLeft from '../assets/double_arrow_left.svg?react';
import DoubleArrowRight from '../assets/double_arrow_right.svg?react';
import { useFilteredUsers } from '../hooks/useFilteredUsers';
import { USERS_PER_PAGE } from '../utils/constants';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { pageState } from '../store/atoms/page';
import { selectedUsersState } from '../store/atoms/users';

enum PaginationControl {
  START,
  BACK,
  PAGE,
  FORWARD,
  END,
}

const Pagination: React.FC = () => {
  const filteredUsers = useFilteredUsers();
  const [currentPage, setPage] = useRecoilState(pageState);
  const setSelectedUsers = useSetRecoilState(selectedUsersState);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const setCurrentPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setPage(page);
        setSelectedUsers([]);
      }
    },
    [setPage, setSelectedUsers, totalPages]
  );

  const defaultStyle =
    'w-10 h-10 rounded-full flex items-center justify-center hover:cursor-pointer select-none';

  const activeStyle = `${defaultStyle} hover:bg-gray-500 bg-gray-400 text-white`;
  const inactiveStyle = `${defaultStyle} border-2 border-gray-200 bg-gray-100 text-gray-300`;

  const activePageStyle = `${defaultStyle} border-2 border-gray-400 hover:bg-gray-100 bg-white text-gray-600 font-bold`;
  const inactivePageStyle = activeStyle;

  const PaginationControlStyle = useCallback(
    (button: PaginationControl, page?: number) => {
      switch (button) {
        case PaginationControl.START: {
          if (currentPage === 1) return inactiveStyle;
          else return activeStyle;
        }
        case PaginationControl.BACK: {
          if (currentPage === 1) return inactiveStyle;
          else return activeStyle;
        }
        case PaginationControl.PAGE: {
          if (currentPage === page) return activePageStyle;
          else return inactivePageStyle;
        }
        case PaginationControl.FORWARD: {
          if (totalPages !== currentPage) return activeStyle;
          else return inactiveStyle;
        }
        case PaginationControl.END: {
          if (totalPages !== currentPage) return activeStyle;
          else return inactiveStyle;
        }
      }
    },
    [
      activePageStyle,
      activeStyle,
      currentPage,
      inactivePageStyle,
      inactiveStyle,
      totalPages,
    ]
  );

  return (
    <div className='flex gap-5 m-5 items-center justify-self-center'>
      <div
        className={PaginationControlStyle(PaginationControl.START)}
        onClick={() => setCurrentPage(1)}
      >
        <DoubleArrowLeft className='w-8 h-8' />
      </div>
      <div
        className={PaginationControlStyle(PaginationControl.BACK)}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <ArrowLeft className='w-5 h-5' />
      </div>
      {Array.from(Array(totalPages)).map((_, index) => {
        return (
          <div
            key={index}
            className={PaginationControlStyle(
              PaginationControl.PAGE,
              index + 1
            )}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </div>
        );
      })}
      <div
        className={PaginationControlStyle(PaginationControl.FORWARD)}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <ArrowRight className='w-5 h-5' />
      </div>
      <div
        className={PaginationControlStyle(PaginationControl.END)}
        onClick={() => setCurrentPage(totalPages)}
      >
        <DoubleArrowRight className='w-8 h-8' />
      </div>
    </div>
  );
};

export default Pagination;
