import { useEffect } from 'react';
import './main.scss';
import { BookType } from '../types/';
import { Card } from '../Card';
import { Loading } from '../Loading';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../../redux-folder';
import { fetchChars } from '../../redux-folder';

export const Main = () => {

  const { cards, error, loading } = useSelector((state: RootState) => state.curState);

  const dispatch = useDispatch<AppDispatch>();

  if (!cards) dispatch(fetchChars(''));

  return (
    <div className="main" data-testid="main">
      {cards && !loading && cards.map((doc: BookType) => <Card key={doc._id} {...doc} />)}
      {loading && <Loading />}
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};
