import { Component } from 'react';
import { Link } from 'react-router-dom';
import './logo.scss';

type LogoProps = {
  curPage: string;
};

export class Logo extends Component<LogoProps> {
  render() {
    return (
      <div className="logo-wrapper">
        <div className="logo">
          <Link to="/" className="link">
            BEST BOOK STORE
          </Link>
          <div className="cur-page">Current page is {this.props.curPage}</div>
        </div>
      </div>
    );
  }
}
