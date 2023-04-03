import { BookType } from "../types";
import { MouseEventHandler } from 'react';
import './modal.scss';

interface ModalProps extends BookType {
  handleModalClick: MouseEventHandler<HTMLDivElement>,
  handleCloseClick: MouseEventHandler<HTMLDivElement>,
}

export const Modal = (props: ModalProps) => (
          <div className="modal" data-name="close" onClick={props.handleModalClick}>
            <div className="close" onClick={props.handleCloseClick}></div>
            <div className="modal-wrapper">
              <div className="modal-content">
                <div className="name" data-name="open">Name: {props.name === '' ? 'unknown' : props.name}</div>
                <div className="birth">Birth: {props.birth === '' ? 'unknown' : props.birth}</div>
                <div className="death">Death: {props.death === '' ? 'unknown' : props.death}</div>
                <div className="gender">
                  Gender: {props.gender === '' ? 'unknown' : props.gender}
                </div>
                <div className="hair">Hair: {props.hair === '' ? 'unknown' : props.hair}</div>
                <div className="height">
                  Height: {props.height === '' ? 'unknown' : props.height}
                </div>
                <div className="race">Race: {props.race === '' ? 'unknown' : props.race}</div>
                <div className="realm">Realm: {props.realm === '' ? 'unknown' : props.realm}</div>
                <div className="spouse">
                  Spouse: {props.spouse === '' ? 'unknown' : props.spouse}
                </div>
                <div className="wiki-url">
                  URL:{' '}
                  <a href={props.wikiUrl}>{props.wikiUrl === '' ? 'unknown' : props.wikiUrl}</a>
                </div>
                <div className="id">ID: {props._id === '' ? 'unknown' : props._id}</div>
              </div>
            </div>
          </div>
);
