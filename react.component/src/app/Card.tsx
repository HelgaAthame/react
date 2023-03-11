import { CardT } from './cards';
import './card.scss';
import { ReactComponent as Heart } from '../assets/heart.svg';
import { Component, createRef, RefObject } from 'react';

interface NewCardT extends CardT {
  cards: CardT[];
  updateData: (cards: CardT[]) => void;
};

class Card extends Component<NewCardT> {
  heart: RefObject<HTMLDivElement>;

  constructor(props: NewCardT) {
    super(props);
    this.heart = createRef<HTMLDivElement>();
  }

  handleClick(event: React.MouseEvent) {
    const heartDiv = this.heart.current;
    const heartEl = (heartDiv ? heartDiv.firstElementChild : undefined) as SVGElement;
    console.log(heartEl);
    if (heartEl) {
      heartEl.setAttribute('fill', 'darkred');
    }
    setTimeout(() => {
      heartEl.setAttribute('fill', '#105544');
    }, 500);

    const target = event.target as HTMLDivElement;
    const changedCards: CardT[] = JSON.parse(JSON.stringify(this.props.cards));
    const targetCard = changedCards.find((card: { name: string | undefined; }) => card.name === target.closest('section')?.querySelector('.name')?.innerHTML);
    if (targetCard) targetCard.likes++;
    this.props.updateData(changedCards);
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
          <div ref={this.heart} className="likes" onClick={this.handleClick.bind(this)}>
            <Heart />
            &nbsp;
            {this.props.likes}
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
