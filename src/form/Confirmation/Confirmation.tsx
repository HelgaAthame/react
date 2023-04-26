import React from 'react';

export const Confirmation = () => {
  return (
    <section className="confirmation-section z-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-600 from-0% to-transparent to-70% w-[98%] h-[98%] flex items-center justify-center absolute" data-testid="confirmation">
      <div className="confirmation-wrapper relative truncate rounded">
        <div className="confirmation text-3xl uppercase truncate m-px border-white w-60 h-40 flex items-center justify-center rounded-sm p-4 hover:before:animate-button before:z-[-1] before:absolute before:t-0 before:l-0 before:w-full before:h-full before:duration-1000 before:bg-[conic-gradient(var(--tw-gradient-stops))] from-white from-0% to-emerald-900 to-0% bg-white whitespace-normal">data has been saved</div>
      </div>
    </section>
  );
};
