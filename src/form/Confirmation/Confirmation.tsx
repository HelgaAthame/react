import React from 'react';
import './confirmation.scss';

export const Confirmation = () => {
  return (
    <section className="confirmation-section" data-testid="confirmation">
      <div className="confirmation-wrapper">
        <div className="confirmation">data has been saved</div>
      </div>
    </section>
  );
};
