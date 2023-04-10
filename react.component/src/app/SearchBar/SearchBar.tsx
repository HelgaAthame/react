import { MutableRefObject, useEffect, useRef, KeyboardEvent } from 'react';
import './searchbar.scss';
import { ReactComponent as Lupa } from '../../assets/lupa.svg';

import { useDispatch } from 'react-redux';
import { useGetCharsQuery } from '../../redux-folder';
import { setCards, sortCards } from '../../redux-folder';

export const SearchBar = () => {
  const { data } = useGetCharsQuery(null);
  const dispatch = useDispatch();

  const handleKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      const target = e.target as HTMLInputElement;
      const inputValue = target.value;
      if (data) dispatch(setCards(data.docs));
      dispatch(sortCards(inputValue));
    }
  };

  return (
    <div className="wrapper">
      <div
        className="search_wrapper"
      >
        <div className="lupa">
          <Lupa />
        </div>
        <input
          type="search"
          className="input"
          onKeyUp={handleKeyUp}
          required
        />
      </div>
    </div>
  );
};
