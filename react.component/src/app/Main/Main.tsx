import { AppContext } from '../../context';
import { useContext } from 'react';
import './main.scss'; //<Card key={i.toString()} {...doc} />
import { BookType } from '../types/';
import { Card } from '../Card';

export const Main = () => {
  const { docs } = useContext(AppContext);

  return (
    <div className="main">
      {docs.map((doc: BookType) => (
        <Card key={doc._id} {...doc} />
      ))}
    </div>
  );
};
