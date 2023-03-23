import { ChangeEvent, MutableRefObject, useContext, useEffect, useRef } from 'react';
import './searchbar.scss';
import { ReactComponent as Lupa } from '../../assets/lupa.svg';
import { AppContext } from '../../context';

export const SearchBar = () => {

  const { updateData } = useContext(AppContext);

  const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const input: MutableRefObject<HTMLInputElement | null> = useRef(null);

  useEffect(() => {
    const newValue = localStorage.getItem('bestbookstore-input-data');
    console.log(input);
    console.log(wrapper);
    console.log(newValue);
    if (newValue && input && input.current) {
      input.current.value = newValue;
      updateData(newValue);
    }
    return () => {
      const neededValue = input?.current?.value;
      console.log(input);  //null  ?
      console.log(wrapper);  //null  ?
      console.log(neededValue);
    if (neededValue) {
      localStorage.setItem('bestbookstore-input-data', neededValue.toString());
    } else {
      localStorage.setItem('bestbookstore-input-data', '');
    }
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateData(event.target.value);
  }

  const handleFocus = () => {
    if (wrapper.current !== null) wrapper.current.style.flexGrow = '1';
    if (input && input.current) input.current.style.color = '#109966';
  }

  const handleBlur = () => {
    if (wrapper.current && input && document.activeElement !== input.current) wrapper.current.style.flexGrow = '0';
    if (input && input.current) input.current.style.color = '#105544';
  }

  return(
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
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
      </div>
    </div>
  );
}
