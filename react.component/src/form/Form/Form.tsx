import { Component, FormEvent, ReactNode } from 'react';
import './form.scss';

type FormProps = {
  children: ReactNode;
  submitFunc: () => boolean;
};

export class Form extends Component<FormProps> {
  handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (this.props.submitFunc()) {
      const form = event.target as HTMLFormElement;
      form.reset();
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit.bind(this)}>
        {this.props.children}
        <div className="submit-wrapper">
          <input type="submit" className="submit-input" value="SUBMIT" />
        </div>
      </form>
    );
  }
}
