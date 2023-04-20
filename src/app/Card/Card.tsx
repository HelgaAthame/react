import React from 'react';
import { AppDispatch, store, fetchCharById } from '../../redux-folder';
import { Modal } from '../Modal';
import { BookType } from '../types';
import { MouseEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';

export const Card = (props: BookType) => {
  const [clicked, setClicked] = useState(false);

  const { curChar } = store.getState().curState;
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseClick = () => setClicked(false);
  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (target.dataset.name === 'close') setClicked(false);
  };

  const handleCardClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    const target = e.target as HTMLDivElement;
    const searchId = target.dataset.name === 'open' ? target.closest('section')?.id : null;
    if (target.dataset.name === 'open') {
      if (searchId) dispatch(fetchCharById(searchId));
      setClicked(true);
    }
  };

  return (
    <section
      className="card mt-4 mx-2 flex rounded grow overflow-hidden relative duration-1000
      before:absolute before:bg-[conic-gradient(var(--tw-gradient-stops))] from-white from-0% to-emerald-900 to-0%
      before:h-full before:w-full before:z-[-1] duration-1000
      hover:before:animate-button"
      data-name="open"
      id={props._id}
      onClick={handleCardClick}
      data-testid="card"
    >
      <div className="additional-wrapper
      flex items-center bg-white grow flex-col
      rounded-sm border-0 m-px p-6 w-40 duration-500
      hover:border-emerald-600 hover:text-emerald-600 hover:cursor-pointer" data-testid="additional-wrapper" data-name="open">
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
