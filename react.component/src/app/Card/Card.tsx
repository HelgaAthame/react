import { CardT } from '../cards';
import './card.scss';
import { ReactComponent as Heart } from '../../assets/heart.svg';
import { Component, createRef, RefObject } from 'react';

interface NewCardT extends CardT {
  cards: CardT[];
}

export class Card extends Component<NewCardT> {
  heart: RefObject<HTMLDivElement>;
  state = {
    likes: this.props.likes,
  };

  constructor(props: NewCardT) {
    super(props);
    this.heart = createRef<HTMLDivElement>();
  }

  handleClick() {
    this.setState({ likes: this.state.likes + 1 });
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
          <div
            ref={this.heart}
            placeholder="likes"
            className="likes"
            onClick={this.handleClick.bind(this)}
          >
            <Heart />
            &nbsp;
            {this.state.likes}
          </div>
        </div>
      </section>
    );
  }
}
