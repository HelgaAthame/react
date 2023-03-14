import { Component, ReactNode } from "react";

type FieldsetProps = {
  children: ReactNode,
}

export class Fieldset extends Component<FieldsetProps> {
  render() {
    return (
      <fieldset className="fieldset">
        {this.props.children}
      </fieldset>
    );
  }
}
