import React from 'react';

export const Loading = () => (
  <section className="super-wrapper w-full flex justify-center items-center">
    <div className="loading-wrapper before:animate-loading before:bg-[conic-gradient(var(--tw-gradient-stops))] from-emerald-900 from-80% to-white to-90% before:duration-1000 before:z-[0] before:h-full before:w-full before:absolute self-center justify-self-center mt-4 mx-2 flex rounded-[50%] w-[20vw] h-[20vw] overflow-hidden relative duration-1000">
      <div className="loading text-base rounded-[50%] pt-4 px-4 pb-2 m-px bg-white flex grow justify-center items-center z-30">Loading...</div>
    </div>
  </section>
);
