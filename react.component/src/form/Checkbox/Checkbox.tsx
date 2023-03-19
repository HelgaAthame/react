import { ChangeEventHandler, forwardRef } from 'react';
import './checkbox.scss';

type CheckboxProps = {
  id: string;
  title: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => (
  <div className="checkbox-wrapper">
    <input
      type="checkbox"
      id={props.id}
      className="checkbox-input"
      ref={ref}
    />
    <label htmlFor={props.id} className="checkbox-label">
      {props.title}
    </label>
  </div>
));
