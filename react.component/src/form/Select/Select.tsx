import { countries } from '../countries';
import { ChangeEvent, Component } from 'react';
import './select.scss';

type SelectProps = {
  multiple: boolean;
  label: string;
  value: string;
};

type StateType = {
  value: string;
};

export class Select extends Component<SelectProps, StateType> {
  constructor(props: SelectProps) {
    super(props);
    this.state = { value: "choose" };
  }

  handleCahnge(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="select-wrapper">
        {this.props.label}
        <select value={this.state.value} multiple={this.props.multiple} onChange={this.handleCahnge.bind(this)} className="select">
          <option className="option" value="choose" disabled>Choose</option>
          {countries.sort().map((country, index) => (
            <option value={country} key={index} className="option">{country}</option>
          ))}
        </select>
      </div>
    );
  }
}
