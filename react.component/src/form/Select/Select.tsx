import { countries } from '../countries';
import { ChangeEventHandler, forwardRef } from 'react';
import './select.scss';

type SelectProps = {
  label: string;
  multiple: boolean;
  id: string;
  err: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => (
  <div className="select-wrapper">
    {props.label}
    <select
      placeholder="country"
      id={props.id}
      multiple={props.multiple}
      className="select"
      ref={ref}
    >
      <option className="option" value=""></option>
      {countries.sort().map((country, index) => (
        <option value={country} key={index} className="option">
          {country}
        </option>
      ))}
    </select>
    <span className="error">{props.err && `Error: choose country`}</span>
  </div>
));
