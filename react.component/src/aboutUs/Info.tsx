import './info.scss';

function Info() {
  return(
    <section className="info">
      <div className="photo-wrapper">
        <div className='photo'>
          <img src="../../src/assets/photo.jpg" />
        </div>
      </div>
      <div className="content-wrapper">
        <div className='content'>
          <div className='title'>My name is Olga Khmaruk</div>
          <div className="description">

      <p className="block1 block">I'm from Minsk</p>
      <p className="block2 block">I'm looking for a full time job as a React JavaScript Front-End Developer</p>
      <p className="block3 block">MY SKILLS</p>
      <p className="block2 block">React, JSX, TypeScript, JavaScript, Vite, Vitest, SASS, CSS, HTML, Tailwind, DevTools, VSCode, Firebase, GitHub, MVC, ESLint, SEO, OOP, Photoshop, Webpack, Fegma, Node.js, Agile, Scrum, Kanban, Markdown, Netlify, Performance Optimization</p>














          </div>
        </div>
      </div>
    </section>
  );
}

export default Info;
