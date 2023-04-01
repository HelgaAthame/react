import { ChangeEvent, MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import './searchbar.scss';
import { ReactComponent as Lupa } from '../../assets/lupa.svg';
import { AppContext } from '../../context';

export const SearchBar = () => {
  const { updateData } = useContext(AppContext);

  const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const input: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [inputValue, setInputValue] = useState(
    localStorage.getItem('bestbookstore-input-data')
      ? localStorage.getItem('bestbookstore-input-data')
      : ''
  );

  useEffect(() => {
    if (inputValue) {
      localStorage.setItem('bestbookstore-input-data', inputValue);
      updateData(inputValue);
    } else {
      localStorage.setItem('bestbookstore-input-data', '');
    }
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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
          value={inputValue as string}
          ref={input}
          type="search"
          className="input"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
      </div>
    </div>
  );
};
