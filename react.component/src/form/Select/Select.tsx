import { countries } from '../countries';
import { ChangeEventHandler, forwardRef } from 'react';
import './select.scss';

type SelectProps = {
  label: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  multiple: boolean;
  id: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => (
  <div className="select-wrapper">
    {props.label}
    <select
      id={props.id}
      multiple={props.multiple}
      onChange={props.handleChange}
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
  </div>
));
