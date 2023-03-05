import Card from "./Card";
import cards from "./cards";
import './main.scss'

export default function Main() {
  return (
    <div className="main">
      {cards.map( (card, i) =>
        <Card
          ky = {i.toString()}
          name = {card.name}
          price = {card.price}
          category = {card.category}
          author = {card.author}
          genre = {card.genre}
          year = {card.year}
          likes = {card.likes}
          picture = {card.picture}
        />
      )}
    </div>
  )
}
