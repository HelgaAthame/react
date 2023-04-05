import { AppContext } from '../../context';
import { useContext } from 'react';
import { Card } from '../Card';
import { CardT } from '../cards';
import './main.scss';

export const Main = () => {
  const { newCards } = useContext(AppContext);

  return (
    <main className="main">
      {newCards.map((card: CardT, i: number) => (
        <Card key={i.toString()} {...card} />
      ))}
    </main>
  );
};
