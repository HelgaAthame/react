import { Link } from 'react-router-dom';
import React from 'react';

export const Nav = () => (
  <div className="nav flex flex-wrap">
    <div className="link-wrapper hover:before:animate-button rounded mt-4 mx-2 duration-1000 flex flex-wrap overflow-hidden relative before:absolute before:bg-[conic-gradient(var(--tw-gradient-stops))] from-white from-0% to-emerald-900 to-0% before:h-full before:w-full before:z-[-1] duration-1000">
      <div className="l-div rounded-sm px-4 m-px bg-white flex items-center">
        <Link to="/about-us" className="link text-emerald-900 duration-1000 text-3xl light-font hover:cursor-pointer hover:text-emerald-600" data-testid="about-us-link">
          ABOUT US
        </Link>
      </div>
    </div>
    <div className="link-wrapper hover:before:animate-button rounded mt-4 mx-2 duration-1000 flex flex-wrap overflow-hidden relative before:absolute before:bg-[conic-gradient(var(--tw-gradient-stops))] from-white from-0% to-emerald-900 to-0% before:h-full before:w-full before:z-[-1] duration-1000">
      <div className="l-div rounded-sm px-4 m-px bg-white flex items-center">
        <Link to="/form" className="link link text-emerald-900 duration-1000 text-3xl light-font hover:cursor-pointer hover:text-emerald-600" data-testid="form-link">
          FORM
        </Link>
      </div>
    </div>
  </div>
);
