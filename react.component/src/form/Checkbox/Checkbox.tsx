import { ChangeEvent, ChangeEventHandler, Component, forwardRef } from "react";
import './checkbox.scss';

type CheckboxProps = {
  id: string
  title: string
  checked: boolean
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined
}

export const Checkbox = forwardRef<HTMLInputElement,CheckboxProps>((props, ref) => (
  <div className="checkbox-wrapper">
        <input type="checkbox" id={props.id} checked={props.checked} onChange={props.handleChange} className="checkbox-input" ref={ref}/>
        <label htmlFor={props.id} className="checkbox-label">
          {props.title}
        </label>
      </div>
));

/*export class Checkbox extends Component<CheckboxProps> {
  state = {checked: true};

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    if(event.target) this.setState({checked: !this.state.checked});
  }

  render() {
    return(
      <div className="checkbox-wrapper">
        <input type="checkbox" id={this.props.id} checked={this.state.checked} onChange={this.handleChange.bind(this)} className="checkbox-input"/>
        <label htmlFor={this.props.id} className="checkbox-label">
          {this.props.title}
        </label>
      </div>
    );
  }
}*/
