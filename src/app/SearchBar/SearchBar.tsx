import { KeyboardEvent, ChangeEvent } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';

import { useDispatch, useSelector } from 'react-redux';
import { changeSearchText, fetchChars, AppDispatch, RootState } from '../../redux-folder';
import React from 'react';

export const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { searchText } = useSelector((state: RootState) => state.curState);

  const handleKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      const target = e.target as HTMLInputElement;
      const inputValue = target.value;
      dispatch(changeSearchText(inputValue));
      dispatch(fetchChars(searchText));
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchText(e.target.value));
  };

  return (
    <div className="wrapper flex grow justify-start mt-4 mx-2">
      <div className="search_wrapper bg-white pl-6 rounded-sm border border-emerald-900 border-solid m-0 w-20 flex flex-nowrap text-3xl items-center duration-1000 grow-0 hover:grow hover:border-emerald-600
      [&:has(.input:focus)]:grow [&:has(.input:hover)]:grow">
        <div className="searchIcon">
          <SearchIcon className="w-8 h-7"/>
        </div>
        <input
          defaultValue={searchText}
          type="search"
          data-testid="search-input"
          className="input light-font text-emerald-900 text-3xl outline-none border-none grow w-full my-4 duration-1000"
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};
