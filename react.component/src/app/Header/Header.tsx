import './header.scss';
import { cards, CardT } from '../cards';
import { Component } from 'react';
import { Logo } from '../Logo';
import { Nav } from '../Nav';

type SearchBarProps = {
  cards: CardT[];
  children: React.ReactNode;
};

export class Header extends Component<SearchBarProps> {
  state = { cards: cards };

  render() {
    return (
      <header className="header">
        <Logo />
        {this.props.children}
        <Nav />
      </header>
    );
  }
}
