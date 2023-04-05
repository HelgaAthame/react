import { filterFunc } from '../app/SearchBar';
import { BookType } from '../app/types';
import { createContext, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { getDocs } from './getDocs';

type ChildrenProps = {
  children: ReactNode;
};

export type ContextT = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setDocs: React.Dispatch<React.SetStateAction<BookType[]>>;
  docs: BookType[];
  error: string | null;
  getDocs: () => Promise<BookType[]>;
};

export const AppContext = createContext<ContextT>({
  isLoading: true,
  docs: [],
  setIsLoading: function (value: SetStateAction<boolean>): void {
    throw new Error(`Function not implemented. ${value}`);
  },
  setError: function (value: SetStateAction<string | null>): void {
    throw new Error(`Function not implemented. ${value}`);
  },
  setDocs: function (value: SetStateAction<BookType[]>): void {
    throw new Error(`Function not implemented. ${value}`);
  },
  error: null,
  getDocs: function (): Promise<BookType[]> {
    throw new Error('Function not implemented.');
  },
});

export const AppContextProvider = ({ children }: ChildrenProps) => {
  const [docs, setDocs] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDocs()
      .then((docs) => {
        setIsLoading(false);
        const sortValue = localStorage.getItem('bestbookstore-input-data') || '';
        const sortedDocs = filterFunc(docs, sortValue);
        setDocs(sortedDocs);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, []);

  const value = { docs, setDocs, getDocs, isLoading, setIsLoading, error, setError };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
