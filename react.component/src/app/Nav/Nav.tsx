import { Link } from 'react-router-dom';
import './nav.scss';

export const Nav = () => (
  <div className="nav">
    <div className="link-wrapper">
      <div className="l-div">
        <Link to="/about-us" className="link" data-testid="about-us-link">
          ABOUT US
        </Link>
      </div>
    </div>
    <div className="link-wrapper">
      <div className="l-div">
        <Link to="/form" className="link" data-testid="form-link">
          FORM
        </Link>
      </div>
    </div>
  </div>
);
