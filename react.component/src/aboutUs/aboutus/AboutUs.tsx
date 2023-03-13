import { Info } from '../Info';
import { Header } from '../../app/Header';
import './aboutus.scss';

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
