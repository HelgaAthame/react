import { BookType } from '../app/types';
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';

interface CurrentType {
  setIsLoading: (value: boolean)=> void;
  isLoading: boolean;
  docs: BookType[];
}

type ChildrenProps = {
  children: ReactNode;
};

export const AppContext = createContext<any>({
  setIsLoading: () => {},
  isLoading: true,
  docs: [],
});

export const AppContextProvider = ({ children }: ChildrenProps) => {

  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] =useState(null);

  const getDocs = async () => {
    const response = await fetch(`https://the-one-api.dev/v2/character`, {
      method: 'get',
      headers: new Headers({
          'Authorization': 'Bearer TinzBFnLUdwvfCjMa4hL',
      }),
    });
    if (!response.ok) throw new Error('Could not fetch the data from the resourse');
    const data = await response.json();
    setIsLoading(false);
    return data.docs;
  }

  useEffect(() => {
    getDocs()
    .then(docs => {
      setDocs(docs);
      setError(null);
    })
    .catch(e => {
      setError(e.message);
      setIsLoading(false);
    });
  }, []);

  const value = { docs, setDocs, getDocs, isLoading, setIsLoading, error };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
