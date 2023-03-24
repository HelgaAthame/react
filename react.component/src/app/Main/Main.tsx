import { AppContext } from '../../context';
import { useContext } from 'react';
import { Card } from '../Card';
import { CardT } from '../cards';
import './main.scss';

export const Main = () => {
  const { newCards } = useContext(AppContext);

  return (
    <div className="main">
      {newCards.map((card: CardT, i: number) => (
        <Card key={i.toString()} {...card} />
      ))}
    </div>
  );
};
