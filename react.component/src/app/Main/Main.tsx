import { Card } from '../Card';
import { CardT } from '../cards';
import './main.scss';

export const Main = (props: MainPropType) => (
  <div className="main">
    {props.cards.map((card: CardT, i: number) => (
      <Card key={i.toString()} {...card} />
    ))}
  </div>
);

type MainPropType = {
  cards: CardT[];
};
