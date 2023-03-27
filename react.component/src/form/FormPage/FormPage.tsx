import { Header } from '../../app/Header';
import { Fieldset } from '../Fieldset';
import { Form } from '../Form';
import { Input } from '../Input';
import { Component, createRef, RefObject } from 'react';
import { Select } from '../Select';
import { Switcher } from '../Switcher';
import { File } from '../File';
import { Checkbox } from '../Checkbox';
import './formPage.scss';
import { countries } from '../countries';
import { Confirmation } from '../Confirmation';
import { Radio } from '../Radio';

type ProfileCard = {
  gender: string | undefined;
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
  cards: ProfileCard[];

  firstName: boolean;
  lastName: boolean;
  age: boolean;
  zipCode: boolean;
  city: boolean;
  address: boolean;
  email: boolean;
  phone: boolean;

  country: boolean;
  gender: boolean;

  files: boolean;

  checkbox: boolean;
}

export class FormPage extends Component<unknown, FormStateType> {
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
  gender: RefObject<HTMLDivElement>;

  constructor(props: FormStateType) {
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
    this.gender = createRef();
    this.state = {
      confirm: false,
      cards: [],

      firstName: false,
      lastName: false,
      age: false,
      zipCode: false,
      city: false,
      address: false,
      email: false,
      phone: false,

      country: false,
      gender: false,

      files: false,

      checkbox: false,
    };
  }

  dateToAge(date: string) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bd = new Date(date);
    const birthdayThisYear = new Date(today.getFullYear(), bd.getMonth(), bd.getDate());
    let myAge = today.getFullYear() - bd.getFullYear();
    if (today < birthdayThisYear) {
      myAge = myAge - 1;
    }
    return myAge;
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
    arr.push(this.validateRadio());
    arr.push(this.validatePhoto());
    arr.push(this.validateFillings());

    return !arr.includes(false);
  }

  validateName(el: RefObject<HTMLInputElement>) {
    const value = el.current?.value;
    const st = this.state;
    const fieldName = el.current?.id as keyof typeof st;
    const isError =
      !value ||
      value.length > 50 ||
      value.length < 2 ||
      value.match(/[\d\s!\*\\@#$%\^\|\~\?\&\(\)\-\+\=\,\.]/) ||
      value[0].toUpperCase() !== value[0]
        ? true
        : false;
    this.setState((prev) => ({ ...prev, [fieldName]: isError }));
    return isError ? false : true;
  }

  validateCountry() {
    const val = this.country.current?.value;
    const isError = val ? !countries.includes(val) : true;
    this.setState({ country: isError });
    return isError ? false : true;
  }

  validateAge() {
    const date = this.age.current?.value;
    const isError = date ? this.dateToAge(date) <= 0 : true;
    this.setState({ age: isError });
    return isError ? false : true;
  }

  validateZipCode() {
    const zipCode = this.zipCode.current?.value;
    const isError = !zipCode?.match(/\d{4,10}/);
    this.setState({ zipCode: isError });
    return isError ? false : true;
  }

  validateAddress() {
    const address = this.address.current?.value;
    const isError = address
      ? !(
          address.length < 100 &&
          address.length > 10 &&
          !address.match(/[\!\*\\@#\$%\^\|\~\?\&\(\)\+\=]/)
        )
      : true;
    this.setState({ address: isError });
    return isError ? false : true;
  }

  validateEmail() {
    const email = this.email.current?.value;
    const isError = email
      ? !email.match(
          /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i
        )
      : true;
    this.setState({ email: isError });
    return isError ? false : true;
  }

  validatePhone() {
    const phone = this.phone.current?.value;
    const isError = phone ? !phone.match(/^\+*\d*\(*[\d-]+\)*([\d-]){5,10}\d$/i) : true;
    this.setState({ phone: isError });
    return isError ? false : true;
  }

  validateRadio() {
    const gender = this.gender.current;
    const inputs = gender?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const arr = Array.from(inputs);
    const checked = arr.some((input) => input.checked === true);
    this.setState({ gender: !checked });
    return checked ? true : false;
  }

  validatePhoto() {
    const photoInput = document.querySelector('.input__file') as HTMLInputElement;
    const files = photoInput.files as FileList;
    const pattern = /image-*/;
    const file = Array.from(files).at(-1) as File;
    const isError = !(files.length > 0 && file.type.match(pattern));
    this.setState({ files: isError });
    return isError ? false : true;
  }

  validateFillings() {
    const like = this.firstCheckbox.current as HTMLInputElement;
    const isError = !like.checked;
    this.setState({ checkbox: isError });
    return isError ? false : true;
  }

  radioValue() {
    const gender = this.gender.current;
    const inputs = gender?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const arr = Array.from(inputs);
    return arr.find((el) => el.checked)?.value;
  }

  handleSubmit() {
    const arr: ProfileCard[] = this.state.cards;
    if (this.validateForm() && this.age.current?.value) {
      this.setState({
        confirm: true,
      });
      setTimeout(() => this.setState({ confirm: false }), 5000);

      const newCard = {
        firstName: this.firstName.current?.value,
        lastName: this.lastName.current?.value,
        age: this.dateToAge(this.age.current.value),
        showMyAge: this.showMyAge.current?.checked,
        upload: '',
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
        gender: this.radioValue(),
      };

      const promise = this.fileToUrl.call(this);
      promise.then((result) => {
        newCard.upload = result;
        arr.push(newCard);
        this.setState({ cards: arr });
        return true;
      });
      return true;
    }
    return false;
  }

  async fileToUrl() {
    async function readFileAsDataURL(file: File): Promise<string> {
      const result = await new Promise<string>((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          if (typeof fileReader.result === 'string') {
            resolve(fileReader.result);
          }
        };
        fileReader.readAsDataURL(file);
      });

      return result;
    }

    const input = this.upload.current?.parentElement?.parentElement?.firstChild as HTMLInputElement;
    const files = input.files;
    let fileURL =
      'https://avatars.mds.yandex.net/i?id=3a61f30a8dda7b409f22c83055b5800984f9830c-8242815-images-thumbs&n=13';

    if (files && files.length > 0) {
      const pattern = /image-*/;
      const file = Array.from(files).at(-1) as File;

      if (file.type.match(pattern)) {
        fileURL = await readFileAsDataURL(file);
      }
    }

    return fileURL;
  }

  render() {
    return (
      <section className="form-page" placeholder="formpage">
        {this.state.confirm && <Confirmation />}
        <Header currentPage="FORM" />

        <Form submitFunc={this.handleSubmit.bind(this)}>
          <Fieldset title="Personal Information">
            <Input
              id="firstName"
              label="First Name"
              type="text"
              ref={this.firstName}
              err={this.state.firstName}
            />
            <Input
              id="lastName"
              label="Last Name"
              type="text"
              ref={this.lastName}
              err={this.state.lastName}
            />
            <Input id="age" label="Birthday" type="date" ref={this.age} err={this.state.age} />
            <Checkbox id="showMyAge" title="Show my age" ref={this.showMyAge} err={false} />
            <File id="profilePhoto" ref={this.upload} err={this.state.files} />
          </Fieldset>

          <Fieldset title="Address">
            <Input
              id="zipCode"
              label="Zip-code"
              type="text"
              ref={this.zipCode}
              err={this.state.zipCode}
            />
            <Select
              id="country"
              multiple={false}
              label="Country"
              ref={this.country}
              err={this.state.country}
            />
            <Input id="city" label="City" type="text" ref={this.city} err={this.state.city} />
            <Input
              id="address"
              label="Address"
              type="text"
              ref={this.address}
              err={this.state.address}
            />
          </Fieldset>

          <Fieldset title="Contacts">
            <Input id="email" label="E-mail" type="text" ref={this.email} err={this.state.email} />
            <Switcher
              title="Receive notifications by mail"
              id="receiveMail"
              ref={this.receiveMail}
            />
            <Input id="phone" label="Phone" type="text" ref={this.phone} err={this.state.phone} />
            <Switcher title="Receive sms" id="receiveSMS" ref={this.receiveSMS} />
          </Fieldset>

          <Fieldset title="Checkboxes">
            <Checkbox
              title="I like this website"
              id="firstCheckbox"
              ref={this.firstCheckbox}
              err={this.state.checkbox}
            />
            <Checkbox
              title="I enjoy filling out forms"
              id="secondCheckbox"
              ref={this.secondCheckbox}
              err={false}
            />
            <Checkbox
              title="I like reading good books"
              id="thirdCheckbox"
              ref={this.thirdCheckbox}
              err={false}
            />
          </Fieldset>

          <Fieldset title="Radios">
            <Radio
              title="gender"
              name="gender"
              ref={this.gender}
              err={this.state.gender}
              values={['undefined', 'female', 'male', 'other']}
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
                <div className="form-card__age">Gender: {card.gender}</div>
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
          ))}
        </div>
      </section>
    );
  }
}
