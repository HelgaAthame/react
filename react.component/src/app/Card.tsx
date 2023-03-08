import { FunctionComponent, Component } from "react"
import { CardT } from './cards';
import './card.scss';
import heart from "./heart";

const Card:FunctionComponent <CardT> = (props) => {
  return (
    <section className='card' >
      <div className='image'><img src={props.picture} /></div>
      <div className='name'>{props.name}</div>
      <div className='author'>{props.author}</div>
      <div className='card-footer'>
        <div className='left'>
          <div className='genre'>{props.genre}</div>
          <div className='country'>{props.country}</div>
        </div>
        <div className='likes'>{heart()}&nbsp;{props.likes}</div>
      </div>
    </section>
  )
}

export default Card
