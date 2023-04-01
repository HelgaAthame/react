//import { AppContext } from '../../context';
import { useContext } from 'react';
import './main.scss';
import { BookType } from '../types/';
import { Card } from '../Card';
import { Loading } from '../Loading';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetCharsQuery } from '../../redux';
import { setCards } from '../../redux/searchSlice';
//import { sortCards/*, setIsLoading */} from '../../redux/features/search/searchSlice';

export const Main = () => {
  /*//const { docs, isLoading, error } = useContext(AppContext);

  const { data, isLoading, isError, error } = useGetCharsQuery([]);
  //console.log(data);
  if (isLoading) return (<Loading />);
  //if (isError) return (<h1>{'kuku'}</h1>)

  //const isLoading = useSelector((state: RootState) => state.isLoading);
  const dispatch = useDispatch();
  dispatch(setCards(data));*/
  const cards = useSelector((state: RootState) => state.cards);
  console.log(cards);

  return (
    <div className="main">
      {cards /*&& !isLoading*/ && cards.cards.map((doc: BookType) => (
        <Card key={doc._id} {...doc} />
      ))}
    </div>
  );
};
