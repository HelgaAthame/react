import { ChangeEvent, Component, createRef, RefObject } from 'react';
import './searchbar.scss';
import cards, { CardT } from './cards';
import search from './search';

interface SearchBarProps {
  cards: CardT[];
  updateData: (cards: CardT[]) => void;
}

class SearchBar extends Component<SearchBarProps> {
  wrapper: RefObject<HTMLDivElement>;
  input: RefObject<HTMLInputElement> | undefined;

  constructor(props: SearchBarProps) {
    super(props);
    this.state = { cards: this.props.cards };
    this.handleChange = this.handleChange.bind(this);
    this.wrapper = createRef<HTMLDivElement>();
    this.input = createRef<HTMLInputElement>();
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const filtered = cards.filter((card) =>
      Object.values(card).find(
        (value: string | number) =>
          value.toString().toLowerCase().search(event.target.value.toLowerCase()) !== -1
      )
    );
    this.setState({ cards: filtered });
    this.props.updateData(filtered);
  }

  handleFocus() {
    if (this.wrapper.current !== null) this.wrapper.current.style.flexGrow = '1';
  }

  handleBlur() {
    if (this.wrapper.current && this.input && document.activeElement !== this.input.current)
      this.wrapper.current.style.flexGrow = '0';
  }

  render() {
    return (
      <div className="wrapper">
        <div
          ref={this.wrapper}
          className="search_wrapper"
          onMouseOver={this.handleFocus.bind(this)}
          onMouseOut={this.handleBlur.bind(this)}
        >
          <div className="lupa">{search()}</div>
          <input
            ref={this.input}
            type="search"
            className="input"
            onChange={this.handleChange.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            required
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
