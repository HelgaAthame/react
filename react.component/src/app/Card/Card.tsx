import { MouseEventHandler, useState } from 'react';
import { BookType } from '../types';
import './card.scss';
import { Modal } from '../Modal';

export const Card = (props: BookType) => {
  const [clicked, setClicked] = useState(false);
  const handleCloseClick = () => setClicked(false);
  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (target.dataset.name === 'close') setClicked(false);
  };
  const handleCardClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (target.dataset.name === 'open') setClicked(true);
  };
  return (
    <section className="card" data-name="open" onClick={handleCardClick} placeholder="card">
      <div className="additional-wrapper" data-name="open">
        <div className="name" data-name="open">{props.name}</div>
        {clicked && <Modal
          handleModalClick={handleModalClick}
          handleCloseClick={handleCloseClick}
          {...props}
        />}
      </div>
    </section>
  );
};
