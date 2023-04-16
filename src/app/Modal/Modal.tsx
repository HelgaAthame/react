import { BookType } from '../types';
import { MouseEventHandler } from 'react';
import './modal.scss';
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
    <div className="modal" data-name="close" data-testid="modal" onClick={props.handleModalClick}>
      <div
        className="close"
        data-testid="close"
        data-name="close"
        onClick={props.handleCloseClick}
      ></div>
      <div className="modal-wrapper">
        <div className="modal-content">
          {!smallError && !smallLoading && (
            <>
              <div className="name" data-name="open" data-testid="card-name">
                Name: {props.name === '' ? 'unknown' : props.name}
              </div>
              <div className="birth modal-div">
                Birth: {props.birth === '' ? 'unknown' : props.birth}
              </div>
              <div className="death modal-div">
                Death: {props.death === '' ? 'unknown' : props.death}
              </div>
              <div className="gender modal-div">
                Gender: {props.gender === '' ? 'unknown' : props.gender}
              </div>
              <div className="hair modal-div">
                Hair: {props.hair === '' ? 'unknown' : props.hair}
              </div>
              <div className="height modal-div">
                Height: {props.height === '' ? 'unknown' : props.height}
              </div>
              <div className="race modal-div">
                Race: {props.race === '' ? 'unknown' : props.race}
              </div>
              <div className="realm modal-div">
                Realm: {props.realm === '' ? 'unknown' : props.realm}
              </div>
              <div className="spouse modal-div">
                Spouse: {props.spouse === '' ? 'unknown' : props.spouse}
              </div>
              <div className="wiki-url modal-div">
                URL: <a href={props.wikiUrl}>{props.wikiUrl === '' ? 'unknown' : props.wikiUrl}</a>
              </div>
              <div className="id modal-div">ID: {props._id === '' ? 'unknown' : props._id}</div>
            </>
          )}
          {smallError && <div className="error">{smallError}</div>}
          {smallLoading && <Loading />}
        </div>
      </div>
    </div>
  );
};
