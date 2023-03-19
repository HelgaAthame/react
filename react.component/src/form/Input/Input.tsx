import { ChangeEventHandler, forwardRef } from 'react';
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
        onChange={props.handleChange}
      />
    </label>
  </div>
));

type InputProps = {
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  id: string;
  label: string;
  type: string;
};
