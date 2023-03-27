import { forwardRef } from 'react';
import './radio.scss';

type RadioProps = {
  title: string;
  name: string;
  values: string[];
  err: boolean;
};

export const Radio = forwardRef<HTMLDivElement, RadioProps>((props, ref) => (
  <div className="radio-super-wrapper">
    {props.title}
    <div className="radio-wrapper" ref={ref} placeholder="radio">
      {props.values.map((value, index) => (
        <label className="radio-label" htmlFor={`${props.name}__${index}`} key={index}>
          <input
            className="radio-input"
            id={`${props.name}__${index}`}
            type="radio"
            value={value}
            name={props.name}
          />
          {props.values[index]}
        </label>
      ))}
    </div>
    <span className="error" placeholder="error">
      {props.err && `Error: choose your ${props.title}`}
    </span>
  </div>
));
