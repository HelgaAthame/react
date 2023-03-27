import { Component } from 'react';
import './App.scss';
import { Header } from '../Header';
import { Main } from '../Main';
import { cards } from '../cards';
import { SearchBar } from '../SearchBar';

export class App extends Component {
  state = {
    cards: cards,
  };

  updateData(inputValue: string) {
    const filtered = cards.filter((card) =>
      Object.values(card).find(
        (value: string | number) =>
          value.toString().toLowerCase().search(inputValue.toLowerCase()) !== -1
      )
    );
    this.setState({ cards: filtered });
  }

  render() {
    return (
      <div className="app">
        <Header cards={[]} currentPage="MAIN">
          <SearchBar updateData={this.updateData.bind(this)} />
        </Header>
        <Main cards={this.state.cards} />
      </div>
    );
  }
}
