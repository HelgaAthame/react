import { ChangeEvent, Component } from 'react';
import './select.scss';

type SelectProps = {
  multiple: boolean;
  label: string;
  value: string;
  ops: string[];
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
          {this.props.ops.map((option, index) => (
            <option value={option} key={index} className="option">{option}</option>
          ))}
        </select>
      </div>
    );
  }
}
