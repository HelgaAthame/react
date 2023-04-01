//import { AppContext } from '../../context';
import { useContext, useEffect } from 'react';
import './main.scss';
import { BookType } from '../types/';
import { Card } from '../Card';
import { Loading } from '../Loading';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetCharsQuery } from '../../redux/api';
import { setCards } from '../../redux/searchSlice';

export const Main = () => {
  //const { docs, isLoading, error } = useContext(AppContext);

  const { data, isLoading, isError, error, isFetching } = useGetCharsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCards(data.docs));
    } else {
      console.log('there is no data');
    }
  }, [data]);

  const cards = useSelector((state: RootState) => state.cards);

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
