import { ChangeEvent, useContext, useEffect, useState,  KeyboardEventHandler } from 'react';
import './searchbar.scss';
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg';
import { AppContext } from '../../context';
import { BookType } from '../types';

export const filterFunc = (toFilter: BookType[], sortVal: string) => {
  return toFilter.filter((el) =>
    Object.values(el).find(
      (value: string | number) =>
        value.toString().toLowerCase().search(sortVal.toLowerCase()) !== -1
    )
  );
}

export const SearchBar = () => {
  const { isLoading, setIsLoading, getDocs, setDocs } = useContext(AppContext);

  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('bestbookstore-input-data') || ''
  );

  useEffect(() => {
    return () => {
    if (inputValue) {
      localStorage.setItem('bestbookstore-input-data', inputValue);
    } else {
      localStorage.setItem('bestbookstore-input-data', '');
    }
  };
}, [inputValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.code === 'Enter' && !isLoading) {
      const inputEl = e.target as HTMLInputElement;
      setIsLoading(true);
      const books = (await getDocs()) as BookType[];
      const filtered = filterFunc(books, inputValue);
      setDocs(filtered);
    }
  };

  return (
    <div className="wrapper">
      <div className="search_wrapper">
        <div className="searchIcon">
          <SearchIcon />
        </div>
        <input
          data-testid="input search"
          value={inputValue}
          type="search"
          className="input"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          required
        />
      </div>
    </div>
  );
};
