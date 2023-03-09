import cards, { CardT } from './cards';
import './card.scss';
import heart from './heart';
import { Component } from 'react';

interface NewCardT  extends CardT {
  cards: CardT[];
  updateData: (cards: CardT[]) => void;
};

class Card extends Component<NewCardT> {

  handleClick(event: React.MouseEvent) {
    const target = event.target as HTMLDivElement;
    const changedCards: CardT[] = JSON.parse(JSON.stringify(this.props.cards));
    const targetCard = changedCards.find((card: { name: string | undefined; }) => card.name === target.closest('section')?.querySelector('.name')?.innerHTML);
    if (targetCard) targetCard.likes++;
    this.props.updateData(changedCards);
    /*const changedCard = JSON.parse(JSON.stringify({
      name: this.props.name,
      price: this.props.price,
      country: this.props.country,
      author: this.props.author,
      genre: this.props.genre,
      year: this.props.year,
      likes: this.props.likes,
      picture: this.props.picture,
    }));*/


    /*const targetCard = cards.find(card => card.name === target.closest('section')?.querySelector('.name')?.innerHTML);
    alert(targetCard?.name);
    if (targetCard) targetCard.likes ++ ;
    this.render();*/
  }

  render() {
    return (
      <section className="card">
        <div className="image">
          <img src={this.props.picture} />
        </div>
        <div className="name">{this.props.name}</div>
        <div className="author">{this.props.author}</div>
        <div className="card-footer">
          <div className="left">
            <div className="genre">{this.props.genre}</div>
            <div className="country">{this.props.country}</div>
          </div>
          <div className="likes" onClick={this.handleClick.bind(this)}>
            {heart()}&nbsp;{this.props.likes}
          </div>
        </div>
      </section>
    );
  }
};

export default Card;
function handleClick() {
  throw new Error('Function not implemented.');
}
