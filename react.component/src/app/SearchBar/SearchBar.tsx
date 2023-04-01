import { ChangeEvent, KeyboardEvent, MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import './searchbar.scss';
import { ReactComponent as Lupa } from '../../assets/lupa.svg';
//import { AppContext } from '../../context';
import { BookType } from '../types';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { sortCards } from '../../redux/searchSlice';

import { useGetCharsQuery } from '../../redux/api';

export const SearchBar = () => {

  const { isLoading, isError, error, data=[] } = useGetCharsQuery();
  //const dispatch = useDispatch();

  //const { docs, isLoading, setIsLoading, getDocs, setDocs } = useContext(AppContext);

  const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const input: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const handleKeyUp = async (e: any) => {
    if (e.code === "Enter") {
      const inputValue = e.target.value;
      //setIsLoading(true);
      //dispatch(setIsLoading(true));
      ////dispatch(sortCards(inputValue));
      //dispatch(setIsLoading(false));

      /*const books = await getDocs() as BookType[];
      const filtered = books.filter((book) =>
        Object.values(book).find(
          (value: string | number) =>
            value.toString().toLowerCase().search(inputValue.toLowerCase()) !== -1
        ))
      setDocs(filtered);*/
    }
  }

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
