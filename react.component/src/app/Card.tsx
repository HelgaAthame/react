import { FunctionComponent, ReactComponentElement } from "react"
import { CardT } from './cards';
import './card.scss';

const Card:FunctionComponent <CardT> = (props) => {
  return (
    <section className='card' >
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
