import { forwardRef } from 'react';
import './input.scss';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <div className="input-wrapper">
    <label htmlFor={props.id} className="label">
      {props.label}
      <input
        type={props.type}
        className="input"
        id={props.id}
        ref={ref}
      />
      <span className="error">{props.err && `Error: ${props.label} is invalid`}</span>
    </label>
  </div>
));

type InputProps = {
  id: string;
  label: string;
  type: string;
  err: boolean;
};
