import { ChangeEvent, Component } from 'react';
import './searchbar.scss';
import cards, { CardT } from './cards';

interface SearchBarProps {
  cards: CardT[]
  updateData: (cards: CardT[]) => void
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

  handleFocus () {
    const wrapper = document.querySelector('.search_wrapper') as HTMLDivElement;
    if (wrapper) wrapper.style.flexGrow = '1';
  }

  handleBlur () {
    const wrapper = document.querySelector('.search_wrapper') as HTMLDivElement;
    const input = wrapper.querySelector('.input') as HTMLDivElement;
    if (wrapper && document.activeElement !== input) wrapper.style.flexGrow = '0';
  }

  render () {
    return (
      <div className='wrapper'>
        <div className="search_wrapper"
          onMouseOver={this.handleFocus}
          onMouseOut={this.handleBlur}>🔍
          <input
            type="search"
            className="input"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur} required />
        </div>
      </div>
    )
  }
}

export default SearchBar
