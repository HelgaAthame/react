import { Link } from 'react-router-dom';
import React from 'react';

type LogoProps = {
  curPage: string;
};

export const Logo = (props: LogoProps) => (
  <div className="logo-wrapper hover:before:animate-button rounded mt-4 mx-2 duration-1000 flex flex-wrap flex-col overflow-hidden relative before:absolute before:bg-[conic-gradient(var(--tw-gradient-stops))] from-white from-0% to-emerald-900 to-0% before:h-full before:w-full before:z-[-1] duration-1000 ">
    <div className="logo light-font m-px bg-white text-left text-3xl rounded-sm pb-3 pt-5 px-4 duration-1000 hover:text-emerald-600">
      <Link to="/" className="link text-emerald-900 duration-1000 hover:cursor-pointer hover:text-emerald-600">
        BEST BOOK STORE
      </Link>
      <div className="cur-page text-xs regular-font mt-[-1r] mb-px">Current page is {props.curPage}</div>
    </div>
  </div>
);
