import './App.scss';
import { Header } from '../Header';
import { Main } from '../Main';
import { SearchBar } from '../SearchBar';
import React from 'react';

export const App = () => (
  <div className="app">
    <Header currentPage="MAIN">
      <SearchBar />
    </Header>
    <Main />
  </div>
);
