import { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="link-wrapper">
          <div className="l-div">
            <Link to="/about-us" className="link">
              ABOUT US
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
