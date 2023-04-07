import './App.scss';
import { Header } from '../Header';
import { Main } from '../Main';
import { SearchBar } from '../SearchBar';

export const App = () => {
  return (
    <div className="app">
      <Header currentPage="MAIN">
        <SearchBar />
      </Header>
      <Main />
    </div>
  );
};
