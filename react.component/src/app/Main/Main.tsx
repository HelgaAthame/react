import { useEffect } from 'react';
import './main.scss';
import { BookType } from '../types/';
import { Card } from '../Card';
import { Loading } from '../Loading';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux-folder';
import { useGetCharsQuery } from '../../redux-folder';
import { setCards, sortCards } from '../../redux-folder';

let i = 1;

export const Main = () => {
  const { data, isLoading, isError, error, isFetching } = useGetCharsQuery(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCards(data.docs));
      const val = localStorage.getItem('bestbookstore-input-data')
        ? localStorage.getItem('bestbookstore-input-data')
        : '';
      dispatch(sortCards(val));
    } else {
      console.log('there is no data');
    }
  }, [data]);

  const curState = useSelector((state: RootState) => state.curState);

  console.log(`main renders ${i} time`);
  i++;

  return (
    <div className="main">
      {data &&
        curState &&
        !isLoading &&
        curState.cards.map((doc: BookType) => <Card key={doc._id} {...doc} />)}
      {(isLoading || isFetching) && <Loading />}
      {isError && error}
    </div>
  );
};
