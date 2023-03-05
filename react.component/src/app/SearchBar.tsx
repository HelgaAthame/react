import { ChangeEvent, Component } from 'react';
import './searchbar.scss';
import cards, { CardT } from './cards';

interface SearchBarProps {
  cards: CardT[]
  updateData: any
}

class SearchBar extends Component<SearchBarProps> {

  constructor (props: SearchBarProps) {
    super (props)
    this.state = {cards: this.props.cards}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event: ChangeEvent<HTMLInputElement>) {
    const filtered = this.props.cards
      .filter(card => Object.values(card)
        .find( (value: string | number) => value.toString().toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1)
      );
    this.setState({cards: filtered});
    this.props.updateData(filtered);
  }

  render () {
    console.log(this.state);
    return (
      <div className="wrapper">🔍
        <input
          type="search"
          className="input"
          onChange={this.handleChange} required />
      </div>
    )
  }
}

export default SearchBar
