import { AppContext, ContextT } from '../../context';
import { useContext } from 'react';
import './main.scss';
import { BookType } from '../types/';
import { Card } from '../Card';
import { Loading } from '../Loading';

export const Main = () => {
  const { docs, isLoading, error } = useContext(AppContext);

  return (
    <div className="main">
      {docs && !isLoading && docs.map((doc: BookType) => <Card key={doc._id} {...doc} />)}
      {isLoading && <Loading />}
      {error && <div className="error">{error}</div>}
    </div>
  );
};
