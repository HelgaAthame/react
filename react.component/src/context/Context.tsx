import { BookType } from '../app/types';
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';

interface CurrentType {
  docs: BookType[];
}

type ChildrenProps = {
  children: ReactNode;
};

export const AppContext = createContext<CurrentType>({
  docs: [],
});

export const AppContextProvider = ({ children }: ChildrenProps) => {

  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetch('https://the-one-api.dev/v2/book', {
      method: 'get',
      headers: new Headers({
          'Authorization': 'Bearer TinzBFnLUdwvfCjMa4hL',
      }),
    })
    .then(response => response.json())
    .then(data => {setDocs(data.docs); console.log(data.docs)});
  }, []);

  const value = { docs };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
