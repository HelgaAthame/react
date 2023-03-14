import { Component } from 'react';

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
    this.state = { value: props.value };
  }

  render() {
    return (
      <div className="select-wrapper">
        {this.props.label}
        <select value={this.state.value} multiple={this.props.multiple}>
          {this.props.ops.map((option, index) => (
            <option value={option} key={index}>{option}</option>
          ))}
        </select>
      </div>
    );
  }
}
