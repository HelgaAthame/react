//import { AppContext } from '../../context';
import { useContext } from 'react';
import './main.scss';
import { BookType } from '../types/';
import { Card } from '../Card';
import { Loading } from '../Loading';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
//import { sortCards/*, setIsLoading */} from '../../redux/features/search/searchSlice';

export const Main = () => {
  //const { docs, isLoading, error } = useContext(AppContext);

  const isLoading = useSelector((state: RootState) => state.isLoading);
  const cards = useSelector((state: RootState) => state.cards);
  const dispatch = useDispatch();

  return (
    <div className="main">
      {cards /*&& !isLoading*/ && cards.cards.map((doc: BookType) => (
        <Card key={doc._id} {...doc} />
      ))}
      {/*isLoading && <Loading />*/}
    </div>
  );
};
