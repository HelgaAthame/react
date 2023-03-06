import SearchBar from "./SearchBar";
import './header.scss'
import cards, { CardT } from "./cards";
import { Component } from "react";
import Logo from "./Logo";
import Nav from "./Nav";

interface SearchBarProps {
  cards: CardT[]
}

class Header extends Component< any , any> {
  constructor (props: any) {
    super (props)
    this.state = {cards: cards}
  }

  /*updateData = (filtered: CardT[]) => {
    this.setState({ cards: filtered })
  }*/

  render() {
    return (
      <header className="header">
        <Logo />
          {this.props.children}
         <Nav />
      </header>
    )
  }
}

export default Header
