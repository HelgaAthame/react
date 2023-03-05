import { Component } from "react";
import Card from "./Card";
import cards, { CardT } from "./cards";
import './main.scss'

class Main extends Component<any, any> {
  render () {
    return (
      <div className="main">
        {this.props.cards.map( (card: CardT, i: number) =>
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
}

export default Main
