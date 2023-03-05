import { FunctionComponent, ReactComponentElement } from "react"
import { CardT } from './cards';
import './card.scss';

interface CardType extends CardT {
  ky: string
}

const Card:FunctionComponent <CardType> = (props) => {
  return (
    <section className='card' key={props.ky}>
      <div className='image'><img src={props.picture} /></div>
      <div className='name'>{props.name}</div>
      <div className='author'>{props.author}</div>
      <div className='genre'>Genre: {props.genre}</div>
      <div className='category'>Category: {props.category}</div>
      <div className='likes'>🤍 {props.likes}</div>
    </section>
  )
}

export default Card
