import { ReactComponent as Heart } from '../../assets/heart.svg';
import { useRef, useState } from 'react';
import { BookType } from '../types';
import './card.scss';

export const Card = (props: BookType) => {
  const heart = useRef(null);

  return (
    <section className="card">
      <div className="name">{props.name}</div>
    </section>
  );
};
