import { Logo } from '../Logo';
import { Nav } from '../Nav';
import React from 'react';

export const Header = (props: SearchBarProps) => (
  <header className="header my-2 mx-4 flex flex-wrap justify-between">
    <Logo curPage={props.currentPage} />
    {props.children}
    <Nav />
  </header>
);

type SearchBarProps = {
  children?: React.ReactNode;
  currentPage: string;
};
