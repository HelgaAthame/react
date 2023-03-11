import { Component } from 'react';
import Card from './Card';
import { CardT } from './cards';
import './main.scss';

type PropT = {
  cards: CardT[];
  updateData: (cards: CardT[]) => void;
};

class Main extends Component<PropT> {

  render() {
    return (
      <div className="main">
        {this.props.cards.map((card: CardT, i: number) => (
          <Card key={i.toString()} {...card} cards={this.props.cards} updateData = {this.props.updateData} />
        ))}
      </div>
    );
  }
}

export default Main;
