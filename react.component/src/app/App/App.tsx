import { useState } from 'react';
import './App.scss';
import { Header } from '../Header';
import { Main } from '../Main';
import { cards, CardT } from '../cards';
import { SearchBar } from '../SearchBar';


export const App = () => {

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

  return (<div className="app">
  <Header currentPage="MAIN">
    <SearchBar updateData={updateData} />
  </Header>
  <Main cards={newCards} />
</div>);
}
