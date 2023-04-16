import './header.scss';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import React from 'react';

export const Header = (props: SearchBarProps) => (
  <header className="header">
    <Logo curPage={props.currentPage} />
    {props.children}
    <Nav />
  </header>
);

type SearchBarProps = {
  children?: React.ReactNode;
  currentPage: string;
};
