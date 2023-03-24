import { Header } from '../../app/Header';
import {
  ChangeEvent,
  Component,
  createRef,
  FormEvent,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import './formPage.scss';
import { countries } from '../countries';
import { Confirmation } from '../Confirmation';
import { ReactComponent as Upload } from '../../assets/upload.svg';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

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

export const FormPage = () => {
  const { register, handleSubmit, reset } = useForm();

  /*const firstName: MutableRefObject<HTMLInputElement | null> = useRef(null);
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
  const gender: MutableRefObject<HTMLDivElement | null> = useRef(null);*/

  const [confirm, setConfirm] = useState<boolean>(false);
  const [cards, setCards] = useState<ProfileCard[]>([]);

  const [firstNameErr, setFirstNameErr] = useState<boolean>(false);
  const [lastNameErr, setLastNameErr] = useState<boolean>(false);
  const [ageErr, setAgeErr] = useState<boolean>(false);
  const [zipCodeErr, setZipCodeErr] = useState<boolean>(false);
  const [cityErr, setCityErr] = useState<boolean>(false);
  const [addressErr, setAddressErr] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [phoneErr, setPhoneErr] = useState<boolean>(false);
  const [countryErr, setCountryErr] = useState<boolean>(false);
  const [genderErr, setGenderErr] = useState<boolean>(false);

  useEffect(() => {
    reset({
      data: 'test'
    })
  }, [confirm]);

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
  };

  const validateForm = () => {
    const arr: boolean[] = [];

    const firstName = document.querySelector('#firstName') as HTMLInputElement;
    const lastName = document.querySelector('#lastName') as HTMLInputElement;
    const city = document.querySelector('#city') as HTMLInputElement;

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
  };

  const validateName = (el: HTMLInputElement) => {
    const value = el.value;
    const isError =
      !value ||
      value.length > 50 ||
      value.length < 2 ||
      value.match(/[\d\s!\*\\@#$%\^\|\~\?\&\(\)\-\+\=\,\.]/) ||
      value[0].toUpperCase() !== value[0]
        ? true
        : false;
    switch (el.id) {
      case 'firstName':
        setFirstNameErr(isError);
        break;
      case 'lastName':
        setLastNameErr(isError);
        break;
      case 'firstName':
        setCityErr(isError);
        break;
    }
    return isError ? false : true;
  }

  const validateCountry = () => {
    const country = document.querySelector('#country') as HTMLSelectElement;
    const val = country.value;
    const isError = val ? !countries.includes(val) : true;
    setCountryErr(isError);
    return isError ? false : true;
  }

  const validateAge = () => {
    const age = document.querySelector('#age') as HTMLInputElement;
    const date = age.value;
    const isError = date ? dateToAge(date) <= 0 : true;
    setAgeErr(isError);
    return isError ? false : true;
  }

  const validateZipCode = () => {
    const zipCode = document.querySelector('#zipCode') as HTMLInputElement;
    const code = zipCode.value;
    const isError = !code?.match(/\d{4,10}/);
    setZipCodeErr(isError);
    return isError ? false : true;
  }

  const validateAddress = () => {
    const address = document.querySelector('#address') as HTMLInputElement;
    const add = address.value;
    const isError = add
      ? !(
          add.length < 100 &&
          add.length > 10 &&
          !add.match(/[\!\*\\@#\$%\^\|\~\?\&\(\)\+\=]/)
        )
      : true;
    setAddressErr(isError);
    return isError ? false : true;
  }

  const validateEmail = () => {
    const mail = document.querySelector('#email') as HTMLInputElement;
    const email = mail.value;
    const isError = email
      ? !email.match(
          /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i
        )
      : true;
    setEmailErr(isError);
    return isError ? false : true;
  }

  const validatePhone = () => {
    const telePhone = document.querySelector('#phone') as HTMLInputElement;
    const phone = telePhone.value;
    const isError = phone ? !phone.match(/^\+*\d*\(*[\d-]+\)*([\d-]){5,10}\d$/i) : true;
    setPhoneErr(isError);
    return isError ? false : true;
  }

  const validateRadio = () => {
    const gender = document.querySelector('.radio-wrapper')as HTMLDivElement;
    const inputs = gender?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const arr = Array.from(inputs);
    const checked = arr.some((input) => input.checked === true);
    setGenderErr(!checked);
    return checked ? true : false;
  }

  const radioValue = () => {
    const genderEl = document.querySelector('.radio-wrapper')as HTMLDivElement;
    const inputs = genderEl?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const arr = Array.from(inputs);
    return arr.find((el) => el.checked)?.value;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    console.log(data);

    const arr: ProfileCard[] = cards;

    const age = document.querySelector('#age') as HTMLInputElement;

    if (validateForm() && age.value) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 5000);


      const firstName = document.querySelector('#firstName') as HTMLInputElement;
      const lastName = document.querySelector('#lastName') as HTMLInputElement;
      const city = document.querySelector('#city') as HTMLInputElement;
      const country = document.querySelector('#country') as HTMLSelectElement;
      const zipCode = document.querySelector('#zipCode') as HTMLInputElement;
      const address = document.querySelector('#address') as HTMLInputElement;
      const email = document.querySelector('#email') as HTMLInputElement;
      const phone = document.querySelector('#phone') as HTMLInputElement;

      const showMyAge = document.querySelector('#showMyAge') as HTMLInputElement;
      const receiveMail = document.querySelector('#receiveMail') as HTMLInputElement;
      const receiveSMS = document.querySelector('#receiveSMS') as HTMLInputElement;
      const firstCheckbox = document.querySelector('#firstCheckbox') as HTMLInputElement;
      const secondCheckbox = document.querySelector('#secondCheckbox') as HTMLInputElement;
      const thirdCheckbox = document.querySelector('#thirdCheckbox') as HTMLInputElement;

      const newCard = {
        firstName: firstName.value,
        lastName: lastName.value,
        age: dateToAge(age.value),
        showMyAge: showMyAge.checked,
        upload: '',
        zipCode: zipCode.value,
        country: country.value,
        city: city.value,
        address: address.value,
        email: email.value,
        receiveMail: receiveMail.checked,
        phone: phone.value,
        receiveSMS: receiveSMS.checked,
        firstCheckbox: firstCheckbox.checked,
        secondCheckbox: secondCheckbox.checked,
        thirdCheckbox: thirdCheckbox.checked,
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
  };

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
    const upload = document.querySelector('.input__file-button-text') as HTMLDivElement;
    const input = upload.parentElement?.parentElement?.firstChild as HTMLInputElement;
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
  };

  const submitFunc = (event: FormEvent) => {
    event.preventDefault();
    if (/*handleSubmit()*/ true) {
      const form = event.target as HTMLFormElement;
      form.reset();
    }
  };

  return (
    <section className="form-page" placeholder="formpage">
      {confirm && <Confirmation />}
      <Header currentPage="FORM" />

      <form placeholder="form" className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="fieldset-wrapper">
          <fieldset className="fieldset">
            <h3>Personal Information</h3>

            <div className="input-wrapper">
              <label htmlFor="firstName" className="label">
                First Name
                <input
                  type="text"
                  className="input"
                  name="firstName"
                  id="firstName"
                  {...register}
                />
                <span className="error">{firstNameErr && `Error: First name is invalid`}</span>
              </label>
            </div>

            <div className="input-wrapper">
              <label htmlFor="lastName" className="label">
                Last Name
                <input
                  type="text"
                  className="input"
                  name="lastName"
                  id="lastName"
                  {...register}
                />
                <span className="error">{lastNameErr && `Error: Last name is invalid`}</span>
              </label>
            </div>

            <div className="input-wrapper">
              <label htmlFor="age" className="label">
                Birthday
                <input
                  type="date"
                  className="input"
                  name="age"
                  id="age"
                  {...register}
                />
                <span className="error">{ageErr && `Error: Birthday is invalid`}</span>
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="showMyAge"
                name="showMyAge"
                className="checkbox-input"
                {...register}
              />
              <label htmlFor="showMyAge" className="checkbox-label">
                Show my age
              </label>
            </div>

            <div className="input__wrapper">
              <input
                type="file"
                name="file"
                accept="image/*"
                id="profilePhoto"
                className="input__file"
                {...register}
              />
              <label htmlFor="profilePhoto" className="input__label">
                <span className="input__file-icon-wrapper">
                  <Upload />
                </span>
                <span className="input__file-button-text">
                  UPLOAD PROFILE PHOTO
                </span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="fieldset-wrapper">
          <fieldset className="fieldset">
            <h3>Address</h3>

            <div className="input-wrapper">
              <label htmlFor="zipCode" className="label">
                Zip-code
                <input
                  type="text"
                  className="input"
                  name="zipCode"
                  id="zipCode"
                  {...register}
                />
                <span className="error">{zipCodeErr && `Error: Zip-code is invalid`}</span>
              </label>
            </div>

            <div className="select-wrapper">
              Country
              <select
                placeholder="country"
                name="country"
                id="country"
                multiple={false}
                className="select"
                {...register}
              >
                <option className="option" value=""></option>
                {countries.sort().map((country, index) => (
                  <option value={country} key={index} className="option">
                    {country}
                  </option>
                ))}
              </select>
                <span className="error">{countryErr && `Error: You are to choose a country`}</span>
            </div>

            <div className="input-wrapper">
              <label htmlFor="city" className="label">
                City
                <input
                  type="text"
                  className="input"
                  name="city"
                  id="city"
                  {...register}
                />
                <span className="error">{cityErr && `Error: City is invalid`}</span>
              </label>
            </div>

            <div className="input-wrapper">
              <label htmlFor="address" className="label">
                Address
                <input
                  type="text"
                  className="input"
                  name="address"
                  id="address"
                  {...register}
                />
                <span className="error">{addressErr && `Error: Address is invalid`}</span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="fieldset-wrapper">
          <fieldset className="fieldset">
            <h3>Contacts</h3>

            <div className="input-wrapper">
              <label htmlFor="email" className="label">
                E-mail
                <input
                  type="text"
                  className="input"
                  name="email"
                  id="email"
                  {...register}
                />
                <span className="error">{emailErr && `Error: E-mail is invalid`}</span>
              </label>
            </div>

            <div className="switcher-wrapper">
              Receive notifications by mail
              <input
                type="checkbox"
                name="receiveMail"
                id="receiveMail"
                className="switcher-input"
                {...register}
              />
              <label htmlFor="receiveMail" className="switcher-label"></label>
            </div>

            <div className="input-wrapper">
              <label htmlFor="phone" className="label">
                Phone
                <input
                  type="text"
                  className="input"
                  name="phone"
                  id="phone"
                  {...register}
                />
                <span className="error">{phoneErr && `Error: Phone is invalid`}</span>
              </label>
            </div>

            <div className="switcher-wrapper">
              Receive sms
              <input
                type="checkbox"
                name="receiveSMS"
                id="receiveSMS"
                className="switcher-input"
                {...register}
              />
              <label htmlFor="receiveSMS" className="switcher-label"></label>
            </div>
          </fieldset>
        </div>

        <div className="fieldset-wrapper">
          <fieldset className="fieldset">
            <h3>Checkboxes</h3>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="firstCheckbox"
                id="firstCheckbox"
                className="checkbox-input"
                {...register}
              />
              <label htmlFor="firstCheckbox" className="checkbox-label">
                I like this website
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="secondCheckbox"
                id="secondCheckbox"
                className="checkbox-input"
                {...register}
              />
              <label htmlFor="secondCheckbox" className="checkbox-label">
                I enjoy filling out forms
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                name="thirdCheckbox"
                id="thirdCheckbox"
                className="checkbox-input"
                {...register}
              />
              <label htmlFor="thirdCheckbox" className="checkbox-label">
                I like reading good books
              </label>
            </div>
          </fieldset>
        </div>

        <div className="fieldset-wrapper">
          <fieldset className="fieldset">
            <h3>Radios</h3>

            <div className="radio-super-wrapper">
              Gender
              <div className="radio-wrapper" placeholder="radio" {...register} >
                {['undefined', 'female', 'male', 'other'].map((value, index) => (
                  <label className="radio-label" htmlFor={`gender__${index}`} key={index}>
                    <input
                      {...register}
                      className="radio-input"
                      id={`gender__${index}`}
                      type="radio"
                      value={value}
                      name="gender"
                    />
                    {['undefined', 'female', 'male', 'other'][index]}
                  </label>
                ))}
              </div>
              <span className="error">{genderErr && `Error: choose your gender`}</span>
            </div>
          </fieldset>
        </div>

        <div className="submit-wrapper">
          <input type="submit" className="submit-input" value="SUBMIT" placeholder="submit" />
        </div>
      </form>

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
};
