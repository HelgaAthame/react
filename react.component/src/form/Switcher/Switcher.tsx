import { ChangeEvent, ChangeEventHandler, Component } from "react";
import './switcher.scss';

type SwitcherProps = {
  checked: boolean;
  title: string;
  id: string;
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined
}

export class Switcher extends Component<SwitcherProps> {

  render() {
    return(
      <div className="switcher-wrapper">
        {this.props.title}
        <input type="checkbox" id={this.props.id} className="switcher-input" checked={this.props.checked} onChange={this.props.handleChange}/>
        <label htmlFor={this.props.id} className="switcher-label"></label>
      </div>
    );
  }
}
