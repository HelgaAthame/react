import { Component } from 'react';
import { Link } from 'react-router-dom';
import './logo.scss';

export class Logo extends Component {
  render() {
    return (
      <div className="logo-wrapper">
        <div className="logo">
          <Link to="/" className="link">
            BEST BOOK STORE
          </Link>
        </div>
      </div>
    );
  }
}
