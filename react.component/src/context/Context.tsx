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

  const getDocs = async () => {
    const response = await fetch(`https://the-one-api.dev/v2/character`, {
      method: 'get',
      headers: new Headers({
          'Authorization': 'Bearer TinzBFnLUdwvfCjMa4hL',
      }),
    });
    const data = await response.json();
    setIsLoading(false);
    console.log(data.docs);
    return data.docs;
  }

  useEffect(() => {
    getDocs()
    .then(docs => setDocs(docs))
  }, []);

  const value = { docs, setDocs, getDocs, isLoading, setIsLoading };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
