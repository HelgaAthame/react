import { Link } from 'react-router-dom';
import './nav.scss';

export const Nav = () => (
  <nav className="nav">
    <div className="link-wrapper">
      <div className="l-div">
        <Link to="/about-us" className="link">
          ABOUT US
        </Link>
      </div>
    </div>
    <div className="link-wrapper">
      <div className="l-div">
        <Link to="/form" className="link">
          FORM
        </Link>
      </div>
    </div>
  </nav>
);
