import cards from "./cards";
import './main.scss'

export default function Main() {
  return (
    <div className="main">
      {cards.map( (card, i) =>
        <section className='card' key={i}>
          <div className='image'><img src={card.picture} /></div>
          <div className='name'>{card.name}</div>
          <div className='author'>{card.author}</div>
          <div className='genre'>Genre: {card.genre}</div>
          <div className='category'>Category: {card.category}</div>
          <div className='likes'>🤍 {card.likes}</div>
        </section>
      )}
    </div>
  )
}
