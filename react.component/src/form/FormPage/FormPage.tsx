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
  firstName: string | undefined;
  lastName: string | undefined;
  age: number | undefined;
  showMyAge: boolean | undefined;
  upload: string | undefined;
  zipCode: string | undefined;
  country: string | undefined;
  city: string | undefined;
  address: string | undefined;
  email: string | undefined;
  receiveMail: boolean | undefined;
  phone: string | undefined;
  receiveSMS: boolean | undefined;
  firstCheckbox: boolean | undefined;
  secondCheckbox: boolean | undefined;
  thirdCheckbox: boolean | undefined;
};

interface FormStateType {
  confirm: boolean;
  url: string | undefined;
  cards: ProfileCard[];
}

export class FormPage extends Component<ReactPropTypes, FormStateType> {
  firstName: RefObject<HTMLInputElement>;
  lastName: RefObject<HTMLInputElement>;
  age: RefObject<HTMLInputElement>;
  showMyAge: RefObject<HTMLInputElement>;
  zipCode: RefObject<HTMLInputElement>;
  country: RefObject<HTMLSelectElement>;
  city: RefObject<HTMLInputElement>;
  address: RefObject<HTMLInputElement>;
  email: RefObject<HTMLInputElement>;
  receiveMail: RefObject<HTMLInputElement>;
  phone: RefObject<HTMLInputElement>;
  receiveSMS: RefObject<HTMLInputElement>;
  upload: RefObject<HTMLSpanElement>;
  firstCheckbox: RefObject<HTMLInputElement>;
  secondCheckbox: RefObject<HTMLInputElement>;
  thirdCheckbox: RefObject<HTMLInputElement>;

  constructor(props: ReactPropTypes) {
    super(props);
    this.firstName = createRef();
    this.lastName = createRef();
    this.age = createRef();
    this.showMyAge = createRef();
    this.zipCode = createRef();
    this.country = createRef();
    this.city = createRef();
    this.address = createRef();
    this.email = createRef();
    this.receiveMail = createRef();
    this.phone = createRef();
    this.receiveSMS = createRef();
    this.upload = createRef();
    this.firstCheckbox = createRef();
    this.secondCheckbox = createRef();
    this.thirdCheckbox = createRef();
    this.state = {
      confirm: false,
      url: 'https://avatars.mds.yandex.net/i?id=3a61f30a8dda7b409f22c83055b5800984f9830c-8242815-images-thumbs&n=13',
      /*birthday: new Date().toISOString().slice(0, 10),
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
      thirdCheckbox: true,*/
      cards: [],
    };
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.classList.remove('err');
    event.target.parentElement?.classList.remove('parent-error');

   /*const fieldName = event.target.id as keyof typeof this.state;
    const fieldValue = event.target.value as (typeof this.state)[typeof fieldName];
    this.setState((prev) => ({...prev, [fieldName]: fieldValue}));*/
  }

  handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    event.target.classList.remove('error');
    event.target.parentElement?.classList.remove('error');

   /* this.setState({ country: event.target.value });*/
  }

  /*handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target);
    //console.log(this.state[event.target.id]);
    /*const fieldName = event.target.id as keyof typeof this.state;
    const fieldValue = event.target.checked as (typeof this.state)[typeof fieldName];
    this.setState((prev) => ({...prev, [fieldName]: fieldValue}));
  }*/

  dateToAge(date: string) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bd = new Date(date);
    const birthdayThisYear = new Date(today.getFullYear(), bd.getMonth(), bd.getDate());
    let myage = today.getFullYear() - bd.getFullYear();
    if (today < birthdayThisYear) {
      myage = myage - 1;
    }
    return myage;
  }

  handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.classList.remove('err');
    event.target.parentElement?.classList.remove('parent-error');
    /*this.setState({ birthday: event.target.value });
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bd = new Date(event.target.value);
    const birthdayThisYear = new Date(today.getFullYear(), bd.getMonth(), bd.getDate());
    let myage = today.getFullYear() - bd.getFullYear();
    if (today < birthdayThisYear) {
      myage = myage - 1;
    }
    this.setState({ age: myage.toString() });*/
  }

  validateForm() {
    const arr: boolean[] = [];

    arr.push(this.validateName(this.firstName));
    arr.push(this.validateName(this.lastName));
    arr.push(this.validateAge());
    arr.push(this.validateZipCode());
    arr.push(this.validateCountry());
    arr.push(this.validateName(this.city));
    arr.push(this.validateAddress());
    arr.push(this.validateEmail());
    arr.push(this.validatePhone());

    return !arr.includes(false);
  }

  validateName(el: RefObject<HTMLInputElement>) {
    const value = el.current?.value;
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
    const date = this.age.current?.value;
    if (date && this.dateToAge(date) > 0) {
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
    const zipCode = this.zipCode.current?.value;
    if (zipCode?.match(/\d{4,10}/)) {
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
    const address = this.address.current?.value;
    if (
      !address ||
      address.length > 100 ||
      address.length < 10 ||
      address.match(/[\!\*\\@#\$%\^\|\~\?\&\(\)\+\=]/)
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
    const email = this.email.current?.value;
    if (
      email?.match(
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
    const phone = this.phone.current?.value;
    if (phone?.match(/^\+*\d*\(*[\d-]+\)*([\d-]){5,10}\d$/i)) {
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

    if (this.validateForm()
      && this.age.current?.value
    ) {
      this.setState({confirm: true});
      setTimeout(() => this.setState({confirm: false}), 5000);
      const newCard = {
        firstName: this.firstName.current?.value,
        lastName: this.lastName.current?.value,
        age: this.dateToAge(this.age.current.value),
        showMyAge: this.showMyAge.current?.checked,
        upload: this.state.url,
        zipCode: this.zipCode.current?.value,
        country: this.country.current?.value,
        city: this.city.current?.value,
        address: this.address.current?.value,
        email: this.email.current?.value,
        receiveMail: this.receiveMail.current?.checked,
        phone: this.phone.current?.value,
        receiveSMS: this.receiveSMS.current?.checked,
        firstCheckbox: this.firstCheckbox.current?.checked,
        secondCheckbox: this.secondCheckbox.current?.checked,
        thirdCheckbox: this.thirdCheckbox.current?.checked,
      };
      arr.push(newCard);
      this.setState({ cards: arr });
      this.resetState();
      return true;
    }
    return false;
  }

  fileToUrl() {
    const input = this.upload.current?.parentElement?.parentElement?.firstChild as HTMLInputElement;
    let file, fileUrl: string | ArrayBuffer | null;
    if (input && input.files && Array.from(input.files).at(-1)) {
      file = Array.from(input.files).at(-1) as Blob;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        fileUrl = reader.result;
        if (this.upload && this.upload.current) this.upload.current.innerHTML = 'FILE UPLOADED';
        if (typeof fileUrl === 'string') this.setState({url: fileUrl});
      };
    }
  }

   resetState() {
    /*this.setState({
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
    });*/
  }

  render() {//console.log(`receive mail: ${this.state.receiveMail}`);console.log(`receive sms: ${this.state.receiveSMS}`);
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
              label="First Name"
              type="text"
              ref={this.firstName}
              handleChange={this.handleInputChange.bind(this)}
            />
            <Input
              id="lastName"
              label="Last Name"
              type="text"
              ref={this.lastName}
              handleChange={this.handleInputChange.bind(this)}
            />
            <Input
              id="age"
              label="Birthday"
              type="date"
              ref={this.age}
              handleChange={this.handleInputChange.bind(this)}
            />
            <Checkbox
              id="showMyAge"
              title="Show my age"
              ref={this.showMyAge}
            />
            <File id="profilePhoto" ref={this.upload} handleChange={this.fileToUrl.bind(this)}/>
          </Fieldset>

          <Fieldset title="Address">
            <Input
              id="zipCode"
              label="Zip-code"
              type="text"
              ref={this.zipCode}
              handleChange={this.handleInputChange.bind(this)}
            />
            <Select
              id="country"
              multiple={false}
              label="Country"
              ref={this.country}
              handleChange={this.handleSelectChange.bind(this)}
            />
            <Input
              id="city"
              label="City"
              type="text"
              ref={this.city}
              handleChange={this.handleInputChange.bind(this)}
            />
            <Input
              id="address"
              label="Address"
              type="text"
              ref={this.address}
              handleChange={this.handleInputChange.bind(this)}
            />
          </Fieldset>

          <Fieldset title="Contacts">
            <Input
              id="email"
              label="E-mail"
              type="text"
              ref={this.email}
              handleChange={this.handleInputChange.bind(this)}
            />
            <Switcher
              title="Receive notifications by mail"
              id="receiveMail"
            />
            <Input
              id="phone"
              label="Phone"
              type="text"
              ref={this.phone}
              handleChange={this.handleInputChange.bind(this)}
            />
            <Switcher
              title="Receive sms"
              id="receiveSMS"
            />
          </Fieldset>

          <Fieldset title="Checkboxes">
            <Checkbox
              title="I like this website"
              id="firstCheckbox"
            />
            <Checkbox
              title="I enjoy filling out forms"
              id="secondCheckbox"
            />
            <Checkbox
              title="I like reading good books"
              id="thirdCheckbox"
            />
          </Fieldset>
        </Form>

        <div className="cards-section">
          {this.state.cards.map((card, index) => (
            <div className="form-card-wrapper" key={index}>
              <div className="form-card">
                <div className="profile-image-wrapper">
                  <img src={card['upload']} />
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
