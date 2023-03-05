import SearchBar from "./SearchBar";
import './header.scss'
import cards, { CardT } from "./cards";
import { Component } from "react";

interface SearchBarProps {
  cards: CardT[]
}

class Header extends Component< any , any> {
  constructor (props: any) {
    super (props)
    this.state = {cards: cards}
  }

  updateData = (filtered: CardT[]) => {
    this.setState({ cards: filtered })
  }

  render() {
    return (
      <header className="header">
        <SearchBar
          cards = {this.state.cards}
          updateData = {this.props.updateData}
         />
      </header>
    )
  }
}

export default Header
