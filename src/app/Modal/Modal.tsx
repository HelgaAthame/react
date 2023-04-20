import { BookType } from '../types';
import { MouseEventHandler } from 'react';
import { RootState } from '../../redux-folder';
import { Loading } from '../Loading';
import { useSelector } from 'react-redux';
import React from 'react';

interface ModalProps extends BookType {
  handleModalClick: MouseEventHandler<HTMLDivElement>;
  handleCloseClick: MouseEventHandler<HTMLDivElement>;
}

export const Modal = (props: ModalProps) => {
  const { smallError, smallLoading } = useSelector((state: RootState) => state.curState);

  return (
    <div className="modal z-20 fixed top-0 left-0 w-full h-full bg-emerald-600/80 flex justify-center items-center text-emerald-600 cursor-auto" data-name="close" data-testid="modal" onClick={props.handleModalClick}>
      <div
        className="close right-10 top-10 w-10 h-10 absolute hover:cursor-pointer
        before:absolute before:left-4 before:h-11 before:w-0.5 before:bg-white before:rounded before:duration-1000 before:rotate-45
        after:absolute after:left-4 after:h-11 after:w-0.5 after:bg-white after:rounded after:duration-1000 after:-rotate-45
        hover:before:m-[-1px] hover:before:w-1 hover:before:h-14
        hover:after:m-[-1px] hover:after:w-1 hover:after:h-14
        "
        data-testid="close"
        data-name="close"
        onClick={props.handleCloseClick}
      ></div>
      <div className="modal-wrapper rounded border border-solid bg-white pb-8 pt-4 px-[5vw] duration-1000">
        <div className="modal-content">
          {!smallError && !smallLoading && (
            <>
              <div className="name grow text-4xl light-font leading-7 py-8" data-testid="card-name">
                Name: {props.name === '' ? 'unknown' : props.name}
              </div>
              <div className="birth modal-div max-w-[90vw] text-left text-base redular-font py-1.5">
                Birth: {props.birth === '' ? 'unknown' : props.birth}
              </div>
              <div className="death modal-div max-w-[90vw] text-left text-base redular-font py-1.5">
                Death: {props.death === '' ? 'unknown' : props.death}
              </div>
              <div className="gender modal-div max-w-[90vw] text-left text-base redular-font py-1.5">
                Gender: {props.gender === '' ? 'unknown' : props.gender}
              </div>
              <div className="hair modal-div max-w-[90vw] text-left text-base redular-font py-1.5">
                Hair: {props.hair === '' ? 'unknown' : props.hair}
              </div>
              <div className="height modal-div max-w-[90vw] text-left text-base redular-font py-1.5">
                Height: {props.height === '' ? 'unknown' : props.height}
              </div>
              <div className="race modal-div max-w-[90vw] text-left text-base redular-font py-1.5">
                Race: {props.race === '' ? 'unknown' : props.race}
              </div>
              <div className="realm modal-div max-w-[90vw] text-left text-base redular-font py-1.5">
                Realm: {props.realm === '' ? 'unknown' : props.realm}
              </div>
              <div className="spouse modal-div max-w-[90vw] text-left text-base redular-font py-1.5">
                Spouse: {props.spouse === '' ? 'unknown' : props.spouse}
              </div>
              <div className="wiki-url modal-div max-w-[90vw] text-left text-base redular-font py-1.5">
                URL: <a href={props.wikiUrl}>{props.wikiUrl === '' ? 'unknown' : props.wikiUrl}</a>
              </div>
              <div className="id modal-div max-w-[90vw] text-left text-base redular-font py-1.5">ID: {props._id === '' ? 'unknown' : props._id}</div>
            </>
          )}
          {smallError && <div className="error">{smallError}</div>}
          {smallLoading && <Loading />}
        </div>
      </div>
    </div>
  );
};
