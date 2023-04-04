import { ChangeEvent, useContext, useEffect, useState } from 'react';
import './searchbar.scss';
import { ReactComponent as Lupa } from '../../assets/lupa.svg';
import { AppContext } from '../../context';

export const SearchBar = () => {
  const { updateData } = useContext(AppContext);

  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('bestbookstore-input-data') || ''
  );

  useEffect(() => {
    return () => {
      if (inputValue) {
        localStorage.setItem('bestbookstore-input-data', inputValue);
        updateData(inputValue);
      } else {
        localStorage.setItem('bestbookstore-input-data', '');
      }
    };
  }, [inputValue, updateData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="wrapper">
      <div className="search_wrapper">
        <div className="lupa">
          <Lupa />
        </div>
        <input
          value={inputValue as string}
          type="search"
          className="input"
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};
