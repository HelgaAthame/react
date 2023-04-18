import { KeyboardEvent, ChangeEvent } from 'react';
import './searchbar.scss';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';

import { useDispatch, useSelector } from 'react-redux';
import { changeSearchText, fetchChars, AppDispatch, RootState } from '../../redux-folder';

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
    <div className="wrapper">
      <div className="search_wrapper">
        <div className="searchIcon">
          <SearchIcon />
        </div>
        <input
          defaultValue={searchText}
          type="search"
          className="input"
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};
