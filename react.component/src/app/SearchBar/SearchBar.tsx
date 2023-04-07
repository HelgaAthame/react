import { KeyboardEvent, ChangeEvent } from 'react';
import './searchbar.scss';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';

import { useDispatch } from 'react-redux';
import { store, changeSearchText, fetchChars, AppDispatch } from '../../redux-folder';

export const SearchBar = () => {

  const { searchText } = store.getState().curState;
  const dispatch = useDispatch<AppDispatch>();

  const handleKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      const target = e.target as HTMLInputElement;
      const inputValue = target.value;
      dispatch(changeSearchText(inputValue));
      dispatch(fetchChars(inputValue));
      localStorage.setItem('bestbookstore-input-data', inputValue);
    }
  };

  const handleChange = async  (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
      dispatch(changeSearchText(e.target.value));
      console.log(`handle change: searchText = ${searchText}`);
  };

  return (
    <div className="wrapper">
      <div
        className="search_wrapper"
      >
        <div className="searchIcon">
          <SearchIcon />
        </div>
        <input
          defaultValue={localStorage.getItem('bestbookstore-input-data') || ''}
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
