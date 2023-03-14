import { Component, ReactNode } from "react";

type CheckboxProps = {
  values: [string, boolean][]
}

type CheckboxState = {
  values: [string, boolean][]
}

export class Checkbox extends Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = {values: this.props.values};
  }

  render() {
    return(
      <div className="checkbox-wrapper">
        {this.props.values.map((value, index) => <input name={value[0]} type="checkbox" checked={this.state.values[index][1]} />)}
      </div>
    );
  }
}
