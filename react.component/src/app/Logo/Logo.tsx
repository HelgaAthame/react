import { Link } from 'react-router-dom';
import './logo.scss';
import React from 'react';

type LogoProps = {
  curPage: string;
};

export const Logo = (props: LogoProps) => (
  <div className="logo-wrapper">
    <div className="logo">
      <Link to="/" className="link">
        BEST BOOK STORE
      </Link>
      <div className="cur-page">Current page is {props.curPage}</div>
    </div>
  </div>
);
