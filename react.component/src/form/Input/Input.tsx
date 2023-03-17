import { ChangeEventHandler, Component, forwardRef } from 'react';
import './input.scss';

export const Input = forwardRef<HTMLInputElement,InputProps>((props, ref) => (
  <div className="input-wrapper">
        <label htmlFor={props.id} className="label">
          {props.label}
          <input type={props.type} className="input" id={props.id} onChange={props.handleChange} ref={ref} value={props.value}/>
        </label>
      </div>
));

type InputProps = {
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  id: string;
  label: string;
  type: string;
  value?: string;
};

/*export class Input extends Component<InputProps> {

  render() {
    return (
      <div className="input-wrapper">
        <label htmlFor={this.props.id} className="label">
          {this.props.label}
          <input type={this.props.type} className="input" id={this.props.id} onChange={this.props.handleChange} />
        </label>
      </div>
    );
  }
}*/
