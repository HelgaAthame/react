import { ChangeEventHandler, forwardRef } from 'react';
import './input.scss';

export const Input = forwardRef<HTMLInputElement,InputProps>((props, ref) => (
  <div className="input-wrapper">
        <label htmlFor={props.id} className="label">
          {props.label}
          <input type={props.type} className="input" id={props.id} onChange={props.handleChange} ref={ref}/>
        </label>
      </div>
));

type InputProps = {
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  id: string;
  label: string;
  type: string;
};

/*export class Input extends Component<InputProps> {
  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.props.updateFunc(this.props.id, event.target.value);
  }

  render() {
    return (
      <div className="input-wrapper">
        <label htmlFor={this.props.id} className="label">
          {this.props.label}
          <input type={this.props.type} className="input" id={this.props.id} onChange={this.handleChange.bind(this)} />
        </label>
      </div>
    );
  }
}*/
