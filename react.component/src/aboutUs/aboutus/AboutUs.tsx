import { Info } from '../Info';
import { Header } from '../../app/Header';

export const AboutUs = () => {
  return (
    <div className="AboutUs" data-testid="about us">
      <Header currentPage="ABOUT US" />
      <Info />
    </div>
  );
};
