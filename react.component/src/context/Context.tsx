import { cards, CardT } from "../app/cards";
import { createContext, ReactNode, useReducer, useState } from "react";

interface CurrentType {
  newCards: CardT[];
  updateData: (inputValue: string) => void;
}

type ChildrenProps = {
  children: ReactNode;
}

export const AppContext = createContext<CurrentType>({
  newCards: cards,
  updateData: (inputValue: string) => {
    const filtered = cards.filter((card) =>
      Object.values(card).find(
        (value: string | number) =>
          value.toString().toLowerCase().search(inputValue.toLowerCase()) !== -1
      )
    );
  }
});

const reducer = (state: CardT[], action: string) => {
  const filtered = cards.filter((card) =>
      Object.values(card).find(
        (value: string | number) =>
          value.toString().toLowerCase().search(action.toLowerCase()) !== -1
      )
    );
  return filtered;
}

export const AppContextProvider = ({ children } : ChildrenProps) => {
  const [newCards, updateData] = useReducer(reducer, cards);
  //const [newCards, setNewCards] = useState<CardT[]>(cards);

  /*const updateData = (inputValue: string) => {
    const filtered = cards.filter((card) =>
      Object.values(card).find(
        (value: string | number) =>
          value.toString().toLowerCase().search(inputValue.toLowerCase()) !== -1
      )
    );
    setNewCards(filtered);
  }*/

  const value = { newCards, updateData };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
