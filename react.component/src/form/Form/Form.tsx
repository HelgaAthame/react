import { Component, FormEvent, ReactNode } from 'react';
import './form.scss';

type FormProps = {
  children: ReactNode;
  submitFunc: () => boolean;
};

export const Form = (props: FormProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (props.submitFunc()) {
      const form = event.target as HTMLFormElement;
      form.reset();
    }
  }

  return (
    <form placeholder="form" className="form" onSubmit={handleSubmit}>
      {props.children}
      <div className="submit-wrapper">
        <input type="submit" className="submit-input" value="SUBMIT" placeholder="submit" />
      </div>
    </form>
  );
}
