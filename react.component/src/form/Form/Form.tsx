import { Component, ReactNode } from 'react';
import './form.scss';

type FormProps = {
  children: ReactNode;
};

export class Form extends Component<FormProps> {
  render() {
    return <form className="form">{this.props.children}</form>;
  }
}
