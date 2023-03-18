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
import { countries } from '../countries';
import { Confirmation } from '../Confirmation';

type ProfileCard = {
  [x: string]: boolean | string | undefined | any;
  birthday: string;
  firstName: string | undefined;
  lastName: string | undefined;
  age: string | undefined;
  showMyAge: boolean;
  profilePhoto: string;
  zipCode: string | undefined;
  country: string | undefined;
  city: string | undefined;
  address: string | undefined;
  email: string | undefined;
  receiveMail: boolean;
  phone: string | undefined;
  receiveSMS: boolean;
  firstCheckbox: boolean;
  secondCheckbox: boolean;
  thirdCheckbox: boolean;
};

interface FormStateType extends ProfileCard {
  confirm: boolean;
  cards: ProfileCard[];
}

export class FormPage extends Component<Readonly<any>, FormStateType> {
  firstName: RefObject<HTMLInputElement>;
  lastName: RefObject<HTMLInputElement>;
  age: RefObject<HTMLInputElement>;
  zipCode: RefObject<HTMLInputElement>;
  country: RefObject<HTMLSelectElement>;
  city: RefObject<HTMLInputElement>;
  address: RefObject<HTMLInputElement>;
  email: RefObject<HTMLInputElement>;
  phone: RefObject<HTMLInputElement>;
  upload: RefObject<HTMLSpanElement>;

  constructor(props: Readonly<any>) {
    super(props);
    this.firstName = createRef();
    this.lastName = createRef();
    this.age = createRef();
    this.zipCode = createRef();
    this.country = createRef();
    this.city = createRef();
    this.address = createRef();
    this.email = createRef();
    this.phone = createRef();
    this.upload = createRef();
    this.state = {
      confirm: false,
      birthday: new Date().toISOString().slice(0, 10),
      firstName: '',
      lastName: '',
      age: '0',
      showMyAge: true,
      profilePhoto:
        'https://avatars.mds.yandex.net/i?id=3a61f30a8dda7b409f22c83055b5800984f9830c-8242815-images-thumbs&n=13',
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
      cards: [],
    };
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.classList.remove('err');
    event.target.parentElement?.classList.remove('parent-error');
    //alert(event.target.id + ': ' + event.target.value);
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    event.target.classList.remove('error');
    event.target.parentElement?.classList.remove('error');
    //alert(event.target.id + ': ' + event.target.value);
    this.setState({ country: event.target.value });
  }

  handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    //alert(event.target.id + ': ' + event.target.checked);
    this.setState({ [event.target.id]: event.target.checked });
  }

  handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.classList.remove('err');
    event.target.parentElement?.classList.remove('parent-error');
    this.setState({ birthday: event.target.value });
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bd = new Date(event.target.value);
    const birthdayThisYear = new Date(today.getFullYear(), bd.getMonth(), bd.getDate());
    let myage = today.getFullYear() - bd.getFullYear();
    if (today < birthdayThisYear) {
      myage = myage - 1;
    }
    this.setState({ age: myage.toString() });
  }

  validateForm() {
    const arr: boolean[] = [];

    arr.push(this.validateName(this.state.firstName, this.firstName));
    arr.push(this.validateName(this.state.lastName, this.lastName));
    arr.push(this.validateAge());
    arr.push(this.validateZipCode());
    arr.push(this.validateCountry());
    arr.push(this.validateName(this.state.city, this.city));
    arr.push(this.validateAddress());
    arr.push(this.validateEmail());
    arr.push(this.validatePhone());
    return !arr.includes(false);
  }

  validateName(value: string | undefined, el: RefObject<HTMLInputElement>) {
    if (
      !value ||
      value.length > 50 ||
      value.length < 2 ||
      value.match(/[\d\s!\*\\@#$%\^\|\~\?\&\(\)\-\+\=\,\.]/)
    ) {
      if (el.current && el.current.parentElement) {
        el.current.classList.add('err');
        el.current.parentElement.classList.add('parent-error');
      }
      return false;
    } else return true;
  }

  validateCountry() {
    const val = this.country.current?.value;
    if (val) {
      if (countries.includes(val)) return true;
    }
    if (this.country.current && this.country.current.parentElement) {
      this.country.current.classList.add('error');
      this.country.current.parentElement.classList.add('error');
    }
    return false;
  }

  validateAge() {
    if (Number(this.state.age) > 0) {
      return true;
    } else {
      if (this.age.current && this.age.current.parentElement) {
        this.age.current.classList.add('err');
        this.age.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
  }

  validateZipCode() {
    if (this.state.zipCode?.match(/\d{4,10}/)) {
      return true;
    } else {
      if (this.zipCode.current && this.zipCode.current.parentElement) {
        this.zipCode.current.classList.add('err');
        this.zipCode.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
  }

  validateAddress() {
    if (
      !this.state.address ||
      this.state.address.length > 100 ||
      this.state.address.length < 10 ||
      this.state.address.match(/[\!\*\\@#\$%\^\|\~\?\&\(\)\+\=]/)
    ) {
      if (this.address.current && this.address.current.parentElement) {
        this.address.current.classList.add('err');
        this.address.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
    return true;
  }

  validateEmail() {
    if (
      this.state.email?.match(
        /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i
      )
    ) {
      return true;
    } else {
      if (this.email.current && this.email.current.parentElement) {
        this.email.current.classList.add('err');
        this.email.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
  }

  validatePhone() {
    if (this.state.phone?.match(/^\+*\d*\(*[\d-]+\)*([\d-]){5,10}\d$/i)) {
      return true;
    } else {
      if (this.phone.current && this.phone.current.parentElement) {
        this.phone.current.classList.add('err');
        this.phone.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
  }

  handleSubmit() {
    const arr: ProfileCard[] = this.state.cards;

    if (this.validateForm()) {
      this.setState({confirm: true});
      setTimeout(() => this.setState({confirm: false}), 5000);
      const newCard = {
        birthday: new Date().toISOString().slice(0, 10),
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
      this.setState({ cards: arr });
      this.resetState();
    }
  }

  fileUpload(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    let file;
    if (input.files && Array.from(input.files).at(-1)) {
      file = Array.from(input.files).at(-1) as Blob;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        const fileUrl = reader.result;
        if (typeof fileUrl === 'string') this.setState({ profilePhoto: fileUrl });
        if (this.upload && this.upload.current) this.upload.current.innerHTML = 'FILE UPLOADED';
      };
    }
  }

  resetState() {
    console.log('reseting state');
    this.setState({
      firstName: '',
      lastName: '',
      age: '0',
      showMyAge: true,
      profilePhoto:
        'https://avatars.mds.yandex.net/i?id=3a61f30a8dda7b409f22c83055b5800984f9830c-8242815-images-thumbs&n=13',
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
    });
  }

  render() {
    return (
      <section className="form-page">
        {this.state.confirm && <Confirmation />}
        <Header cards={[]} currentPage="FORM">
          {undefined}
        </Header>

        <Form submitFunc={this.handleSubmit.bind(this)}>
          <Fieldset title="Personal Information">
            <Input
              id="firstName"
              value={this.state.firstName}
              label="First Name"
              type="text"
              handleChange={this.handleInputChange.bind(this)}
              ref={this.firstName}
            />
            <Input
              id="lastName"
              value={this.state.lastName}
              label="Last Name"
              type="text"
              handleChange={this.handleInputChange.bind(this)}
              ref={this.lastName}
            />
            <Input
              id="age"
              label="Birthday"
              type="date"
              value={this.state.birthday}
              handleChange={this.handleDateChange.bind(this)}
              ref={this.age}
            />
            <Checkbox
              id="showMyAge"
              title="Show my age"
              checked={this.state.showMyAge}
              handleChange={this.handleCheckboxChange.bind(this)}
            />
            <File id="profilePhoto" handleChange={this.fileUpload.bind(this)} ref={this.upload} />
          </Fieldset>

          <Fieldset title="Address">
            <Input
              id="zipCode"
              value={this.state.zipCode}
              label="Zip-code"
              type="text"
              handleChange={this.handleInputChange.bind(this)}
              ref={this.zipCode}
            />
            <Select
              id="country"
              multiple={false}
              label="Country"
              handleChange={this.handleSelectChange.bind(this)}
              ref={this.country}
            />
            <Input
              id="city"
              label="City"
              value={this.state.city}
              type="text"
              handleChange={this.handleInputChange.bind(this)}
              ref={this.city}
            />
            <Input
              id="address"
              label="Address"
              value={this.state.address}
              type="text"
              handleChange={this.handleInputChange.bind(this)}
              ref={this.address}
            />
          </Fieldset>

          <Fieldset title="Contacts">
            <Input
              id="email"
              value={this.state.email}
              label="E-mail"
              type="text"
              handleChange={this.handleInputChange.bind(this)}
              ref={this.email}
            />
            <Switcher
              title="Receive notifications by mail"
              id="receiveMail"
              checked={this.state.receiveMail}
              handleChange={this.handleCheckboxChange.bind(this)}
            />
            <Input
              id="phone"
              value={this.state.phone}
              label="Phone"
              type="text"
              handleChange={this.handleInputChange.bind(this)}
              ref={this.phone}
            />
            <Switcher
              title="Receive sms"
              id="receiveSMS"
              checked={this.state.receiveSMS}
              handleChange={this.handleCheckboxChange.bind(this)}
            />
          </Fieldset>

          <Fieldset title="Checkboxes">
            <Checkbox
              title="I like this website"
              id="firstCheckbox"
              checked={this.state.firstCheckbox}
              handleChange={this.handleCheckboxChange.bind(this)}
            />
            <Checkbox
              title="I enjoy filling out forms"
              id="secondCheckbox"
              checked={this.state.secondCheckbox}
              handleChange={this.handleCheckboxChange.bind(this)}
            />
            <Checkbox
              title="I like reading good books"
              id="thirdCheckbox"
              checked={this.state.thirdCheckbox}
              handleChange={this.handleCheckboxChange.bind(this)}
            />
          </Fieldset>
        </Form>

        <div className="cards-section">
          {this.state.cards.map((card, index) => (
            <div className="form-card-wrapper" key={index}>
              <div className="form-card">
                <div className="profile-image-wrapper">
                  <img src={card['profilePhoto']} />
                </div>
                <div className="form-card__name">Name: {card.firstName + ' ' + card.lastName}</div>
                <div className="form-card__age">Age: {card.showMyAge ? card.age : 'hidden'}</div>
                <div className="form-card__address">
                  Address:{' '}
                  {card.zipCode + ', ' + card.country + ', ' + card.city + ', ' + card.address}
                </div>
                <div className="form-card__email">
                  E-mail: {card.email}&nbsp;
                  {card.receiveMail ? 'R' : "Don't r"}eceive mails
                </div>
                <div className="form-card__phone">
                  Phone: {card.phone}&nbsp;
                  {card.receiveMail ? 'R' : "Don't r"}eceive sms
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
          ))}
        </div>
      </section>
    );
  }
}
