import { MouseEventHandler, useState, useContext } from 'react';
import { AppContext } from '../../context';
import { BookType } from '../types';
import './card.scss';
import { Modal } from '../Modal';
import { getChar } from './getChar';

export const Card = (props: BookType) => {
  const [clicked, setClicked] = useState(false);
  const [properties, setProperties] = useState(props);

  const { setError } = useContext(AppContext);

  const handleCloseClick = () => setClicked(false);
  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (target.dataset.name === 'close') setClicked(false);
  };

  const handleCardClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    const target = e.target as HTMLDivElement;
    const searchId = target.closest('section')?.id;

    setError(null);
    if (target.dataset.name === 'open') {
      setClicked(true);
      try {
        const result = await getChar(searchId || '');
        setProperties(result);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
      }
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
            {...properties}
          />
        )}
      </div>
    </section>
  );
};
