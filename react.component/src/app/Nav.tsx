import { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <Link to="/about-us" className="link">
          ABOUT US
        </Link>
      </div>
    );
  }
}

export default Nav;
