import { Component } from "react";

type InputProps = {
  id: string,
  label: string,
  type: string,
}

export class Input extends Component<InputProps> {
  render() {
    return(
      <div className="input-wrapper">
        <label htmlFor={this.props.id}>
          {this.props.label}
          <input type={this.props.type} />
        </label>
      </div>
    );
  }
}
