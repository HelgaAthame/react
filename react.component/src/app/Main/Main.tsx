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

  console.log(store.getState().curState);
  const dispatch = useDispatch<AppDispatch>();

  /*useEffect(() => {
    dispatch(fetchChars(''));
  }, []);*/

  if (!cards) dispatch(fetchChars(''));

  console.log(`from main`);
  console.log(store.getState().curState);

  return (
    <div className="main">
      {cards && !loading && cards.map((doc: BookType) => <Card key={doc._id} {...doc} />)}
      {loading && <Loading />}
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};
