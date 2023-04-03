import { MouseEventHandler, useState } from 'react';
import { BookType } from '../types';
import './card.scss';
import { Modal } from '../Modal';

export const Card = (props: BookType) => {
  const [clicked, setClicked] = useState(false);
  const handleCloseClick = () => setClicked(false);
  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    const val = target.className;
    if (val === 'modal') setClicked(false);
  };
  const handleCardClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    const val = target.className;
    if (val === 'card' || val === 'name' || val === 'additional-wrapper') setClicked(true);
  };
  return (
    <section className="card" onClick={handleCardClick} placeholder="card">
      <div className="additional-wrapper">
        <div className="name">{props.name}</div>
        {clicked && <Modal
          handleModalClick={handleModalClick}
          handleCloseClick={handleCloseClick}
          {...props}
        />}
      </div>
    </section>
  );
};
