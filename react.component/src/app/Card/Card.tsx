import { ReactComponent as Heart } from '../../assets/heart.svg';
import { MouseEventHandler, useRef, useState } from 'react';
import { BookType } from '../types';
import './card.scss';

export const Card = (props: BookType) => {
  const [ clicked, setClicked ] = useState(false);
  const handleCloseClick = () => setClicked(false);
  const handleModalClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    const val = target.className;
    if (val === 'modal') setClicked(false);
  }
  const handleCardClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    const val = target.className;
    if (val === 'card'
    || val === 'name'
    || val === 'additional-wrapper'
    ) setClicked(true);
  }
  return (
    <section className="card" onClick={handleCardClick}>
      <div className="additional-wrapper">
        <div className="name">{props.name}</div>
        {clicked && <div className="modal" onClick={handleModalClick}>
        <div className="close" onClick={handleCloseClick}></div>
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="name">Name: {props.name === '' ? 'unknown' : props.name}</div>
            <div className="birth">Birth: {props.birth === '' ? 'unknown' : props.birth}</div>
            <div className="death">Death: {props.death === '' ? 'unknown' : props.death}</div>
            <div className="gender">Gender: {props.gender === '' ? 'unknown' : props.gender}</div>
            <div className="hair">Hair: {props.hair === '' ? 'unknown' : props.hair}</div>
            <div className="height">Height: {props.height === '' ? 'unknown' : props.height}</div>
            <div className="race">Race: {props.race === '' ? 'unknown' : props.race}</div>
            <div className="realm">Realm: {props.realm === '' ? 'unknown' : props.realm}</div>
            <div className="spouse">Spouse: {props.spouse === '' ? 'unknown' : props.spouse}</div>
            <div className="wiki-url">URL: {props.wikiUrl === '' ? 'unknown' : props.wikiUrl}</div>
            <div className="id">ID: {props._id === '' ? 'unknown' : props._id}</div>
          </div>
        </div>
      </div>}</div>
    </section>
  );
};
