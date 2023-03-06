import { Component } from "react"
import { Link } from "react-router-dom";
import './logo.scss';

class Logo extends Component< any , any> {
  render() {
    return (
      <div className="logo">
        <Link to='/' className="link">BEST BOOK STORE</Link>
      </div>
    )
  }
}

export default Logo
