import { Info } from '../Info';
import { Header } from '../../app/Header';
import React from 'react';

export const AboutUs = () => (
    <div className="AboutUs" data-testid="about us">
      <Header currentPage="ABOUT US" />
      <Info />
    </div>
  );
