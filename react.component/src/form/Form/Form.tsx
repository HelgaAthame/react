import { Component, ReactNode } from "react";

type FormProps = {
  children: ReactNode,
}

export class Form extends Component<FormProps> {
  render() {
    return (
      <form className="form">
        {this.props.children}
      </form>
    );
  }
}
