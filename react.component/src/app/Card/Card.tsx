import { CardT } from '../cards';
import './card.scss';
import { ReactComponent as Heart } from '../../assets/heart.svg';
import { useRef, useState } from 'react';

export const Card = (props: CardT) => {
  const heart = useRef(null);
  const [likes, setLikes] = useState(props.likes);

  const handleClick = () => {
    setLikes(likes + 1);
  };

  return (
    <section className="card">
      <div className="image">
        <img src={props.picture} />
      </div>
      <div className="name">{props.name}</div>
      <div className="author">{props.author}</div>
      <div className="card-footer">
        <div className="left">
          <div className="genre">{props.genre}</div>
          <div className="country">{props.country}</div>
        </div>
        <div ref={heart} placeholder="likes" className="likes" onClick={handleClick}>
          <Heart />
          &nbsp;
          {likes}
        </div>
      </div>
    </section>
  );
};
