import { cards, CardT } from "../app/cards";
import { createContext, ReactNode, ReactPropTypes, useState } from "react";

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

export const AppContextProvider = ({ children } : ChildrenProps) => {
  const [newCards, setNewCards] = useState<CardT[]>(cards);

  const updateData = (inputValue: string) => {
    const filtered = cards.filter((card) =>
      Object.values(card).find(
        (value: string | number) =>
          value.toString().toLowerCase().search(inputValue.toLowerCase()) !== -1
      )
    );
    setNewCards(filtered);
  }

  const value = { newCards, updateData };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
