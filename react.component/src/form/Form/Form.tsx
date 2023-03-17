import { Component, FormEvent, ReactNode } from 'react';
import './form.scss';

type FormProps = {
  children: ReactNode;
  submitFunc: () => void,
};

export class Form extends Component<FormProps> {
  handleSubmit(event: FormEvent) {
    event.preventDefault();
    this.props.submitFunc();
  }

  render() {
    return <form className="form" onSubmit={this.handleSubmit.bind(this)}>
      {this.props.children}
      <div className="submit-wrapper">
        <input type="submit" className="submit-input" value="SUBMIT"/>
      </div>
    </form>;
  }
}
