import { Component } from 'react';
import './App.scss';
import { Header } from '../Header';
import { Main } from '../Main';
import { cards, CardT } from '../cards';
import { SearchBar } from '../SearchBar';

export class App extends Component {
  state = {
    cards: cards,
  };

  updateData(cards: CardT[]) {
    this.setState({ cards: cards });
  }

  render() {
    return (
      <div className="app">
        <Header cards={[]} currentPage="MAIN">
          <SearchBar cards={this.state.cards} updateData={this.updateData.bind(this)} />
        </Header>
        <Main cards={this.state.cards} updateData={this.updateData.bind(this)} />
      </div>
    );
  }
}
