import { Header } from '../../app/Header';
import { Fieldset } from '../Fieldset';
import { Form } from '../Form';
import { Input } from '../Input';
import { ChangeEvent, Component, createRef, RefObject } from 'react';
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
    };
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.classList.remove('err');
    event.target.parentElement?.classList.remove('parent-error');
  }

  handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    event.target.classList.remove('error');
    event.target.parentElement?.classList.remove('error');
  }

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
  }

  handleRadioInput(event: ChangeEvent<HTMLInputElement>) {
    event.target.parentElement?.parentElement?.classList.remove('error');
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

  validateRadio() {
    const gender = this.gender.current;
    const inputs = gender?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const arr = Array.from(inputs);
    const checked = arr.some((input) => input.checked === true);

    if (checked) {
      return true;
    } else {
      this.gender.current?.classList.add('error');
      return false;
    }
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
      this.setState({ confirm: true });
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
            <Checkbox id="showMyAge" title="Show my age" ref={this.showMyAge} />
            <File id="profilePhoto" ref={this.upload} />
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
              ref={this.receiveMail}
            />
            <Input
              id="phone"
              label="Phone"
              type="text"
              ref={this.phone}
              handleChange={this.handleInputChange.bind(this)}
            />
            <Switcher title="Receive sms" id="receiveSMS" ref={this.receiveSMS} />
          </Fieldset>

          <Fieldset title="Checkboxes">
            <Checkbox title="I like this website" id="firstCheckbox" ref={this.firstCheckbox} />
            <Checkbox
              title="I enjoy filling out forms"
              id="secondCheckbox"
              ref={this.secondCheckbox}
            />
            <Checkbox
              title="I like reading good books"
              id="thirdCheckbox"
              ref={this.thirdCheckbox}
            />
          </Fieldset>

          <Fieldset title="Radios">
            <Radio
              title="gender"
              name="gender"
              ref={this.gender}
              values={['undefined', 'female', 'male', 'other']}
              handleChange={this.handleRadioInput.bind(this)}
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
