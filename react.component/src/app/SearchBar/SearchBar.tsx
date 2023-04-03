import { KeyboardEvent, MutableRefObject, useContext, useRef } from 'react';
import './searchbar.scss';
import { ReactComponent as Lupa } from '../../assets/lupa.svg';
import { AppContext } from '../../context';
import { BookType } from '../types';

export const SearchBar = () => {
  const { isLoading, setIsLoading, getDocs, setDocs } = useContext(AppContext);

  const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const input: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const handleKeyUp = async (e: KeyboardEvent) => {
    if (e.code === 'Enter' && !isLoading) {
      const inputEl = e.target as HTMLInputElement;
      const inputValue = inputEl.value;
      setIsLoading(true);
      const books = (await getDocs()) as BookType[];
      const filtered = books.filter((book) =>
        Object.values(book).find(
          (value: string | number) =>
            value.toString().toLowerCase().search(inputValue.toLowerCase()) !== -1
        )
      );
      setDocs(filtered);
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
