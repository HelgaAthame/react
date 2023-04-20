import { useEffect } from 'react';
import { BookType } from '../types/';
import { Card } from '../Card';
import { Loading } from '../Loading';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux-folder';
import { fetchChars } from '../../redux-folder';
import React from 'react';

export const Main = () => {
  const { cards, error, loading, searchText } = useSelector((state: RootState) => state.curState);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchChars(searchText)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="main mx-4 mb-4
    flex flex-row flex-wrap h-full justify-between" data-testid="main">
      {cards && !loading && cards.map((doc: BookType) => <Card key={doc._id} {...doc} />)}
      {loading && <Loading />}
      {error && <div className="error m-4">Error: {error}</div>}
    </div>
  );
};
