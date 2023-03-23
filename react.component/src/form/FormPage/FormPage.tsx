import { Header } from '../../app/Header';
import { Fieldset } from '../Fieldset';
import { Form } from '../Form';
import { Input } from '../Input';
import { ChangeEvent, Component, createRef, MutableRefObject, RefObject, useRef, useState } from 'react';
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

export const FormPage = () => {
  const firstName: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const lastName: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const age: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const showMyAge: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const zipCode: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const country: MutableRefObject<HTMLSelectElement | null> = useRef(null);
  const city: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const address: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const email: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const receiveMail: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const phone: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const receiveSMS: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const upload: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const firstCheckbox: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const secondCheckbox: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const thirdCheckbox: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const gender: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [ confirm, setConfirm ] = useState<boolean>(false);
  const [ cards, setCards ] = useState<ProfileCard[]>([]);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.classList.remove('err');
    event.target.parentElement?.classList.remove('parent-error');
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.target.classList.remove('error');
    event.target.parentElement?.classList.remove('error');
  }

  const dateToAge = (date: string) => {
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

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.classList.remove('err');
    event.target.parentElement?.classList.remove('parent-error');
  }

  const handleRadioInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.parentElement?.parentElement?.classList.remove('error');
  }

  const validateForm = () => {
    const arr: boolean[] = [];

    arr.push(validateName(firstName));
    arr.push(validateName(lastName));
    arr.push(validateAge());
    arr.push(validateZipCode());
    arr.push(validateCountry());
    arr.push(validateName(city));
    arr.push(validateAddress());
    arr.push(validateEmail());
    arr.push(validatePhone());
    arr.push(validateRadio());

    return !arr.includes(false);
  }

  const validateName = (el: RefObject<HTMLInputElement>) => {
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

  const validateCountry = () => {
    const val = country.current?.value;
    if (val) {
      if (countries.includes(val)) return true;
    }
    if (country.current && country.current.parentElement) {
      country.current.classList.add('error');
      country.current.parentElement.classList.add('error');
    }
    return false;
  }

  const validateAge = () => {
    const date = age.current?.value;
    if (date && dateToAge(date) > 0) {
      return true;
    } else {
      if (age.current && age.current.parentElement) {
        age.current.classList.add('err');
        age.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
  }

  const validateZipCode = () => {
    const zip = zipCode.current?.value;
    if (zip?.match(/\d{4,10}/)) {
      return true;
    } else {
      if (zipCode.current && zipCode.current.parentElement) {
        zipCode.current.classList.add('err');
        zipCode.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
  }

  const validateAddress = () => {
    const add = address.current?.value;
    if (
      !add ||
      add.length > 100 ||
      add.length < 10 ||
      add.match(/[\!\*\\@#\$%\^\|\~\?\&\(\)\+\=]/)
    ) {
      if (address.current && address.current.parentElement) {
        address.current.classList.add('err');
        address.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
    return true;
  }

  const validateEmail = () => {
    const mail = email.current?.value;
    if (
      mail?.match(
        /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i
      )
    ) {
      return true;
    } else {
      if (email.current && email.current.parentElement) {
        email.current.classList.add('err');
        email.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
  }

  const validatePhone = () => {
    const phoneNumber = phone.current?.value;
    if (phoneNumber?.match(/^\+*\d*\(*[\d-]+\)*([\d-]){5,10}\d$/i)) {
      return true;
    } else {
      if (phone.current && phone.current.parentElement) {
        phone.current.classList.add('err');
        phone.current.parentElement.classList.add('parent-error');
      }
      return false;
    }
  }

  const validateRadio = () => {
    const genderEl = gender.current;
    const inputs = genderEl?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const arr = Array.from(inputs);
    const checked = arr.some((input) => input.checked === true);

    if (checked) {
      return true;
    } else {
      gender.current?.classList.add('error');
      return false;
    }
  }

  const radioValue = () => {
    const genderEl = gender.current;
    const inputs = genderEl?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const arr = Array.from(inputs);
    return arr.find((el) => el.checked)?.value;
  }

  const handleSubmit = () => {
    const arr: ProfileCard[] = cards;

    if (validateForm() && age.current?.value) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 5000);

      const newCard = {
        firstName: firstName.current?.value,
        lastName: lastName.current?.value,
        age: dateToAge(age.current.value),
        showMyAge: showMyAge.current?.checked,
        upload: '',
        zipCode: zipCode.current?.value,
        country: country.current?.value,
        city: city.current?.value,
        address: address.current?.value,
        email: email.current?.value,
        receiveMail: receiveMail.current?.checked,
        phone: phone.current?.value,
        receiveSMS: receiveSMS.current?.checked,
        firstCheckbox: firstCheckbox.current?.checked,
        secondCheckbox: secondCheckbox.current?.checked,
        thirdCheckbox: thirdCheckbox.current?.checked,
        gender: radioValue(),
      };

      const promise = fileToUrl.call(this);
      promise.then((result) => {
        newCard.upload = result;
        arr.push(newCard);
        setCards(arr);
        return true;
      });
      return true;
    }
    return false;
  }

  const fileToUrl = async () => {
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

    const input = upload.current?.parentElement?.parentElement?.firstChild as HTMLInputElement;
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

  return (
    <section className="form-page" placeholder="formpage">
      {confirm && <Confirmation />}
      <Header currentPage="FORM" />

      <Form submitFunc={handleSubmit}>
        <Fieldset title="Personal Information">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            ref={firstName}
            handleChange={handleInputChange}
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            ref={lastName}
            handleChange={handleInputChange}
          />
          <Input
            id="age"
            label="Birthday"
            type="date"
            ref={age}
            handleChange={handleInputChange}
          />
          <Checkbox id="showMyAge" title="Show my age" ref={showMyAge} />
          <File id="profilePhoto" ref={upload} />
        </Fieldset>

        <Fieldset title="Address">
          <Input
            id="zipCode"
            label="Zip-code"
            type="text"
            ref={zipCode}
            handleChange={handleInputChange}
          />
          <Select
            id="country"
            multiple={false}
            label="Country"
            ref={country}
            handleChange={handleSelectChange}
          />
          <Input
            id="city"
            label="City"
            type="text"
            ref={city}
            handleChange={handleInputChange}
          />
          <Input
            id="address"
            label="Address"
            type="text"
            ref={address}
            handleChange={handleInputChange}
          />
        </Fieldset>

        <Fieldset title="Contacts">
          <Input
            id="email"
            label="E-mail"
            type="text"
            ref={email}
            handleChange={handleInputChange}
          />
          <Switcher
            title="Receive notifications by mail"
            id="receiveMail"
            ref={receiveMail}
          />
          <Input
            id="phone"
            label="Phone"
            type="text"
            ref={phone}
            handleChange={handleInputChange}
          />
          <Switcher title="Receive sms" id="receiveSMS" ref={receiveSMS} />
        </Fieldset>

        <Fieldset title="Checkboxes">
          <Checkbox title="I like this website" id="firstCheckbox" ref={firstCheckbox} />
          <Checkbox
            title="I enjoy filling out forms"
            id="secondCheckbox"
            ref={secondCheckbox}
          />
          <Checkbox
            title="I like reading good books"
            id="thirdCheckbox"
            ref={thirdCheckbox}
          />
        </Fieldset>

        <Fieldset title="Radios">
          <Radio
            title="gender"
            name="gender"
            ref={gender}
            values={['undefined', 'female', 'male', 'other']}
            handleChange={handleRadioInput}
          />
        </Fieldset>
      </Form>

      <div className="cards-section">
        {cards.map((card, index) => (
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
