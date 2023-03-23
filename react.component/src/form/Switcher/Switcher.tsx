import { forwardRef } from 'react';
import './switcher.scss';

type SwitcherProps = {
  title: string;
  id: string;
};

export const Switcher = forwardRef<HTMLInputElement, SwitcherProps>((props, ref) => (
  <div className="switcher-wrapper">
    {props.title}
    <input type="checkbox" id={props.id} className="switcher-input" ref={ref} />
    <label htmlFor={props.id} className="switcher-label"></label>
  </div>
));
