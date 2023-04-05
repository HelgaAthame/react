import { ProfileCard } from '../FormPage';

type FromCardProps = {
  card: ProfileCard;
  index: number;
};

export const FormCard = ({ card, index }: FromCardProps) => (
  <div className="form-card-wrapper" key={index}>
    <div className="form-card" data-testid="card">
      <div className="profile-image-wrapper">
        <img src={card['upload']} />
      </div>
      <div className="form-card__name">Name: {card.firstName + ' ' + card.lastName}</div>
      <div className="form-card__age">Age: {card.showMyAge ? card.age : 'hidden'}</div>
      <div className="form-card__age">Gender: {card.gender}</div>
      <div className="form-card__address">
        Address: {card.zipCode + ', ' + card.country + ', ' + card.city + ', ' + card.address}
      </div>
      <div className="form-card__email">
        E-mail: {card.email}&nbsp;
        {card.receiveMail ? 'R' : "Don't r"}eceive mails
      </div>
      <div className="form-card__phone">
        Phone: {card.phone}&nbsp;
        {card.receiveSMS ? 'R' : "Don't r"}eceive sms
      </div>
      <div className="form-card__first">
        I{card.firstCheckbox ? ' ' : " don't "}like this website
      </div>
      <div className="form-card__second">
        I{card.secondCheckbox ? ' ' : " don't "}enjoy filling out forms
      </div>
      <div className="form-card__third">
        I{card.thirdCheckbox ? ' ' : " don't "}like reading good books
      </div>
    </div>
  </div>
);
