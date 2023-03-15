import { Component, ReactNode } from 'react';
import './fieldset.scss';

type FieldsetProps = {
  children: ReactNode;
  title: string;
};

export class Fieldset extends Component<FieldsetProps> {
  render() {
    return (
      <div className="fieldset-wrapper">
        <fieldset className="fieldset">
          <h3>{this.props.title}</h3>
          {this.props.children}
        </fieldset>
      </div>
    );
  }
}
