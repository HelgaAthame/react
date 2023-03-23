import { Component, ReactNode } from 'react';
import './fieldset.scss';

type FieldsetProps = {
  children: ReactNode;
  title: string;
};

export const Fieldset = (props: FieldsetProps) => (
  <div className="fieldset-wrapper">
    <fieldset className="fieldset">
      <h3>{props.title}</h3>
      {props.children}
    </fieldset>
  </div>
);
