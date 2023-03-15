import { ChangeEvent, Component } from "react";
import './switcher.scss';

type SwitcherProps = {
  title: string;
  id: string;
}

export class Switcher extends Component<SwitcherProps> {
  state = {turn: true}

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    if(event.target) this.setState({turn: !this.state.turn});
  }

  render() {
    return(
      <div className="switcher-wrapper">
        {this.props.title}
        <input type="checkbox" id={this.props.id} className="switcher-input" checked={this.state.turn} onChange={this.handleChange.bind(this)}/>
        <label htmlFor={this.props.id} className="switcher-label"></label>
      </div>
    );
  }
}
