import { Component } from "react";
import Card from "./Card";
import { CardT } from "./cards";
import './main.scss'

class Main extends Component<any, any> {
  render () {
    return (
      <div className="main">
        {this.props.cards.map( (card: CardT, i: number) =>
          <Card
            key = {i.toString()}
            {...card}
          />
        )}
      </div>
    )
  }
}

export default Main
