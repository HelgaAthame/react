import { Header } from '../../app/Header';
import { Fieldset } from '../Fieldset';
import { Form } from '../Form';
import { Input } from '../Input';
import { ChangeEvent, Component, createRef, ReactPropTypes, RefObject } from 'react';
import { Select } from '../Select';
import { Switcher } from '../Switcher';
import { File } from '../File';
import { Checkbox } from '../Checkbox';
import './formPage.scss';

type ProfileCard = {
  firstName: string | undefined,
  lastName: string | undefined,
  age: number | undefined,
  showMyAge: boolean,
  profilePhoto: string,
  zipCode: string | undefined,
  country: string | undefined,
  city: string | undefined,
  address: string | undefined,
  email: string | undefined,
  receiveMail: boolean,
  phone: string | undefined,
  receiveSMS: boolean,
  firstCheckbox: boolean,
  secondCheckbox: boolean,
  thirdCheckbox: boolean,
}

interface FormStateType extends ProfileCard {
  cards: ProfileCard[],
}

export class FormPage extends Component {
  firstName: RefObject<HTMLInputElement>;
  lastName: RefObject<HTMLInputElement>;
  age: RefObject<HTMLInputElement>;

  constructor(props: ReactPropTypes) {
    super(props);
    this.updateData = this.updateData.bind(this);

    this.firstName = createRef();
    this.lastName = createRef();
    this.age = createRef();
  }

  state = {
    firstName: '',
    lastName: '',
    age: 0,
    showMyAge: true,
    profilePhoto: 'https://avatars.mds.yandex.net/i?id=3a61f30a8dda7b409f22c83055b5800984f9830c-8242815-images-thumbs&n=13',
    zipCode: '',
    country: '',
    city: '',
    address: '',
    email: '',
    receiveMail: true,
    phone: '',
    receiveSMS: true,
    firstCheckbox: true,
    secondCheckbox: true,
    thirdCheckbox: true,
    cards: [{
      firstName: 'Olga',
      lastName: 'Khmaruk',
      age: 34,
      showMyAge: true,
      profilePhoto: 'https://avatars.mds.yandex.net/i?id=3a61f30a8dda7b409f22c83055b5800984f9830c-8242815-images-thumbs&n=13',
      zipCode: '220081',
      country: 'Belarus',
      city: 'Minsk',
      address: 'Leonardo Da Vinci, 2',
      email: 'athame@tut.by',
      receiveMail: true,
      phone: '+375296017188',
      receiveSMS: true,
      firstCheckbox: true,
      secondCheckbox: true,
      thirdCheckbox: true,
    }]
  };

  updateData<T>(name: string, value: T) {
    this.setState({[name]: value});
    console.log(this.state.firstName);
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>){
    //alert(event.target.id + ': ' + event.target.value);
    this.setState({[event.target.id]: event.target.value});
  }

  handleCheckboxChange(event: ChangeEvent<HTMLInputElement>){
    //alert(event.target.id + ': ' + event.target.checked);
    this.setState({[event.target.id]: event.target.checked});
  }

  handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    //TODO calculate age and set to state
  }

  handleSubmit() {
    const arr = this.state.cards;
    if (this.state.firstName
      /*&& this.state.lastName
      && this.state.age
      && this.state.zipCode
      && this.state.country
      && this.state.city
      && this.state.address
      && this.state.email
      && this.state.phone*/) {
        const newCard = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          age: this.state.age,
          showMyAge: this.state.showMyAge,
          profilePhoto: this.state.profilePhoto,
          zipCode: this.state.zipCode,
          country: this.state.country,
          city: this.state.city,
          address: this.state.address,
          email: this.state.email,
          receiveMail: this.state.receiveMail,
          phone: this.state.phone,
          receiveSMS: this.state.receiveSMS,
          firstCheckbox: this.state.firstCheckbox,
          secondCheckbox: this.state.secondCheckbox,
          thirdCheckbox: this.state.thirdCheckbox,
        };
        arr.push(newCard);
        this.setState({cards: arr});
        this.resetState();
      }
  }

  resetState() {
    this.setState({
      firstName: '',
    lastName: '',
    age: 0,
    showMyAge: true,
    profilePhoto: 'https://avatars.mds.yandex.net/i?id=3a61f30a8dda7b409f22c83055b5800984f9830c-8242815-images-thumbs&n=13',
    zipCode: '',
    country: '',
    city: '',
    address: '',
    email: '',
    receiveMail: true,
    phone: '',
    receiveSMS: true,
    firstCheckbox: true,
    secondCheckbox: true,
    thirdCheckbox: true,
    })
  }

  render() {
    return (
      <section className="form-page">
        <Header cards={[]} currentPage="FORM">
          {undefined}
        </Header>

        <Form submitFunc={this.handleSubmit.bind(this)}>
          <Fieldset title="Personal Information">
            <Input id="firstName" label="First Name" type="text" handleChange={this.handleInputChange} ref={this.firstName}/>
            <Input id="lastName" label="Last Name" type="text" handleChange={this.handleInputChange} ref={this.lastName}/>
            <Input id="age" label="Birthday" type="date" handleChange={this.handleDateChange} ref={this.age}/>
            <Checkbox id="showMyAge" title="Show my age" checked={this.state.showMyAge} handleChange={this.handleCheckboxChange.bind(this)}/>
            <File id="profilePhoto"/>
          </Fieldset>

          <Fieldset title="Address">
            <Input id="zipCode" label="Zip-code" type="text" updateFunc={this.updateData}/>
            <Select
              multiple={false}
              label="Country"
              value="Minsk"
            />
            <Input id="city" label="City" type="text" updateFunc={this.updateData}/>
            <Input id="address" label="Address" type="text" updateFunc={this.updateData}/>
          </Fieldset>

          <Fieldset title="Contacts">
            <Input id="email" label="E-mail" type="text" updateFunc={this.updateData}/>
            <Switcher key="ten" title="Receive notifications by mail" id="ten"/>
            <Input id="phone" label="Phone" type="text" updateFunc={this.updateData}/>
            <Switcher key="eleven" title="Receive sms" id="eleven"/>
          </Fieldset>

          <Fieldset title="Checkboxes">
            <Checkbox title="I like this website" id="fourteen" />
            <Checkbox title="I enjoy filling out forms" id="fifteen" />
            <Checkbox title="I like reading good books" id="sixteen" />
          </Fieldset>
        </Form>

        <div className='cards-section'>
          {this.state.cards.map((card, index) =>
            <div className="form-card-wrapper" key={index}>
              <div className='form-card'>
                <div className="profile-image-wrapper">
                  <img src={card['profilePhoto']} />
                </div>
                <div className="form-card__name">
                  Name: {card.firstName + ' ' + card.lastName}
                </div>
                <div className="form-card__age">
                  Age: {card.showMyAge ? card.age: 'hidden'}
                </div>
                <div className="form-card__address">
                  Address: {card.zipCode + ', ' + card.country + ', ' + card.city + ', ' + card.address}
                </div>
                <div className="form-card__email">
                  E-mail: {card.email}&nbsp;
                  {card.receiveMail ? 'R' : 'Don\'t r'}eceive mails
                </div>
                <div className="form-card__phone">
                  Phone: {card.phone}&nbsp;
                  {card.receiveMail ? 'R' : 'Don\'t r'}eceive sms
                </div>
                <div className="form-card__first">
                  I{card.firstCheckbox ? ' ' : ' don\'t '}like this website
                </div>
                <div className="form-card__second">
                  I{card.secondCheckbox ? ' ' : ' don\'t '}enjoy filling out forms
                </div>
                <div className="form-card__third">
                  I{card.thirdCheckbox ? ' ' : ' don\'t '}like reading good books
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
