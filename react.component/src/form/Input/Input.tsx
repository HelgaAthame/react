import { Component } from 'react';
import './input.scss';

type InputProps = {
  id: string;
  label: string;
  type: string;
};

export class Input extends Component<InputProps> {
  render() {
    return (
      <div className="input-wrapper">
        <label htmlFor={this.props.id} className="label">
          {this.props.label}
          <input type={this.props.type} className="input" id={this.props.id} />
        </label>
      </div>
    );
  }
}
