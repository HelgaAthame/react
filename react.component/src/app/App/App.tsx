import './App.scss';
import { Header } from '../Header';
import { Main } from '../Main';
import { SearchBar } from '../SearchBar';
//import { AppContextProvider } from '../../context';

export const App = () => {
  return (
    //<AppContextProvider>
    <div className="app">
      <Header currentPage="MAIN">
        <SearchBar />
      </Header>
      <Main />
    </div>
    //</AppContextProvider>
  );
};
