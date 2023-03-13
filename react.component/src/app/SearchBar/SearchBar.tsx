import { ChangeEvent, Component, createRef, RefObject } from 'react';
import './searchbar.scss';
import { ReactComponent as Lupa } from '../../assets/lupa.svg';

interface SearchBarProps {
  updateData: (arg0: string) => void;
}

export class SearchBar extends Component<SearchBarProps> {
  wrapper: RefObject<HTMLDivElement>;
  input: RefObject<HTMLInputElement> | undefined;

  constructor(props: SearchBarProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.wrapper = createRef<HTMLDivElement>();
    this.input = createRef<HTMLInputElement>();
  }

  componentWillUnmount() {
    const neededValue = this.input?.current?.value;
    if (neededValue) {
      localStorage.setItem('bestbookstore-input-data', neededValue.toString());
    } else {
      localStorage.setItem('bestbookstore-input-data', '');
    }
  }

  componentDidMount(): void {
    const myvalue = localStorage.getItem('bestbookstore-input-data');
    if (myvalue && this.input && this.input.current) {
      this.input.current.value = myvalue;
      this.props.updateData(myvalue);
    }
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.props.updateData(event.target.value);
  }

  handleFocus() {
    if (this.wrapper.current !== null) this.wrapper.current.style.flexGrow = '1';
    if (this.input && this.input.current) this.input.current.style.color = '#109966';
  }

  handleBlur() {
    if (this.wrapper.current && this.input && document.activeElement !== this.input.current)
      this.wrapper.current.style.flexGrow = '0';
    if (this.input && this.input.current) this.input.current.style.color = '#105544';
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
          <div className="lupa">
            <Lupa />
          </div>
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
