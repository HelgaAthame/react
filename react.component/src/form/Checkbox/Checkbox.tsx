import { ChangeEvent, Component } from "react";
import './checkbox.scss';

type CheckboxProps = {
  id: string
  title: string
}

export class Checkbox extends Component<CheckboxProps> {
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
}
