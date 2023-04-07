import { AppDispatch, store, fetchCharById } from '../../redux-folder';
import { Modal } from '../Modal';
import { BookType } from '../types';
import './card.scss';
import { MouseEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';

export const Card = (props: BookType) => {
  const [clicked, setClicked] = useState(false);
  //const [properties, setProperties] = useState(props);

  const { searchText, curChar } = store.getState().curState;
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseClick = () => setClicked(false);
  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (target.dataset.name === 'close') setClicked(false);
  };

  const handleCardClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    const target = e.target as HTMLDivElement;
    const searchId = target.closest('section')?.id;
    if (searchId) dispatch(fetchCharById(searchId));
      //const result = await getChar(searchId || '');
      //setProperties(result);
    if (target.dataset.name === 'open') {
      console.log('clicck set true!!!')
      setClicked(true);
    }
  };

  return (
    <section
      className="card"
      data-name="open"
      id={props._id}
      onClick={handleCardClick}
      data-testid="card"
    >
      <div className="additional-wrapper" data-testid="additional-wrapper" data-name="open">
        <div className="name" data-testid="name" data-name="open">
          {props.name}
        </div>
        {clicked && (
          <Modal
            handleModalClick={handleModalClick}
            handleCloseClick={handleCloseClick}
            _id={curChar?._id || ''}
            name={curChar?.name || ''}
            birth={curChar?.birth || ''}
            death={curChar?.death || ''}
            gender={curChar?.gender || ''}
            hair={curChar?.hair || ''}
            height={curChar?.height || ''}
            race={curChar?.race || ''}
            realm={curChar?.realm || ''}
            spouse={curChar?.spouse || ''}
            wikiUrl={curChar?.wikiUrl || ''}
          />
        )}
      </div>
    </section>
  );
};
