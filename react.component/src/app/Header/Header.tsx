import './header.scss';
import { cards, CardT } from '../cards';
import { Component } from 'react';
import { Logo } from '../Logo';
import { Nav } from '../Nav';

type SearchBarProps = {
  cards: CardT[];
  children: React.ReactNode;
  currentPage: string;
};

export class Header extends Component<SearchBarProps> {
  state = { cards: cards };

  render() {
    return (
      <header className="header">
        <Logo curPage={this.props.currentPage}/>
        {this.props.children}
        <Nav />
      </header>
    );
  }
}
