//import { AppContext } from '../../context';
import { useContext, useEffect } from 'react';
import './main.scss';
import { BookType } from '../types/';
import { Card } from '../Card';
import { Loading } from '../Loading';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetCharsQuery } from '../../redux/api';
import { setCards, sortCards } from '../../redux/searchSlice';

let i=1;

export const Main = () => {
  //const { docs, isLoading, error } = useContext(AppContext);

  const { data, isLoading, isError, error, isFetching } = useGetCharsQuery(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCards(data.docs));
      const val = localStorage.getItem('bestbookstore-input-data') ? localStorage.getItem('bestbookstore-input-data') : '';
      dispatch(sortCards(val));
    } else {
      console.log('there is no data');
    }
  }, [data]);

  const cards = useSelector((state: RootState) => state.cards);

  console.log(`main renders ${i} time`);
  i++;

  return (
    <div className="main">
     {(data && cards && !isLoading) && cards.cards.map((doc: BookType) => (
       <Card key={doc._id} {...doc} />
      ))}
      {(isLoading || isFetching) && <Loading />}
      {isError && error}
    </div>
  );
};
