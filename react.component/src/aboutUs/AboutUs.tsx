import { Header } from '../app/Header';
import './aboutus.scss';
import Info from './Info.js';

export function AboutUs() {
  return (
    <div className="AboutUs">
      <Header cards={[]} currentPage="ABOU US">
        {undefined}
      </Header>
      <Info />
    </div>
  );
}
