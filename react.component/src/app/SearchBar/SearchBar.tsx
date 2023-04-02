import { MutableRefObject, useEffect, useRef, KeyboardEvent } from 'react';
import './searchbar.scss';
import { ReactComponent as Lupa } from '../../assets/lupa.svg';

import { useDispatch } from 'react-redux';
import { useGetCharsQuery } from '../../redux-folder';
import { setCards, sortCards } from '../../redux-folder';

export const SearchBar = () => {
  const { data } = useGetCharsQuery(null);
  const dispatch = useDispatch();

  const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const input: MutableRefObject<HTMLInputElement | null> = useRef(null);

  useEffect(() => {
    const val = localStorage.getItem('bestbookstore-input-data')
      ? localStorage.getItem('bestbookstore-input-data')
      : '';
    const inpUt = input.current as HTMLInputElement;
    inpUt.value = val as string;
  }, []);

  const handleKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      const target = e.target as HTMLInputElement;
      const inputValue = target.value;
      if (data) dispatch(setCards(data.docs));
      dispatch(sortCards(inputValue));
      localStorage.setItem('bestbookstore-input-data', inputValue);
    }
  };

  const handleFocus = () => {
    if (wrapper.current !== null) wrapper.current.style.flexGrow = '1';
    if (input && input.current) input.current.style.color = '#109966';
  };

  const handleBlur = () => {
    if (wrapper.current && input && document.activeElement !== input.current)
      wrapper.current.style.flexGrow = '0';
    if (input && input.current) input.current.style.color = '#105544';
  };

  return (
    <div className="wrapper">
      <div
        ref={wrapper}
        className="search_wrapper"
        onMouseOver={handleFocus}
        onMouseOut={handleBlur}
      >
        <div className="lupa">
          <Lupa />
        </div>
        <input
          ref={input}
          type="search"
          className="input"
          onKeyUp={handleKeyUp}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
      </div>
    </div>
  );
};
