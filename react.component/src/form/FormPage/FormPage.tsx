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

  const [confirm, setConfirm] = useState<boolean>(false);
  const [cards, setCards] = useState<ProfileCard[]>([]);

  useEffect(() => {
    reset({
      data: 'test'
    })
  }, [confirm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.classList.remove('err');
    event.target.parentElement?.classList.remove('parent-error');
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.target.classList.remove('error');
    event.target.parentElement?.classList.remove('error');
  };

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

  const handleRadioInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.parentElement?.parentElement?.classList.remove('error');
  };

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
  };

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
  };

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
  };

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
  };

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
  };

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
  };

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
  };

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
  };

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
  };

  const radioValue = () => {
    const genderEl = gender.current;
    const inputs = genderEl?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const arr = Array.from(inputs);
    return arr.find((el) => el.checked)?.value;
  };

  const onSubmit: SubmitHandler<FieldValues> = () => {

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
                  ref={firstName}
                  onChange={handleInputChange}
                />
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
                  ref={lastName}
                  onChange={handleInputChange}
                />
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
                  ref={age}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="showMyAge"
                name="showMyAge"
                className="checkbox-input"
                ref={showMyAge}
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
              />
              <label htmlFor="profilePhoto" className="input__label">
                <span className="input__file-icon-wrapper">
                  <Upload />
                </span>
                <span className="input__file-button-text" ref={upload}>
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
                  ref={zipCode}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="select-wrapper">
              Country
              <select
                placeholder="country"
                name="country"
                id="country"
                multiple={false}
                onChange={handleSelectChange}
                className="select"
                ref={country}
              >
                <option className="option" value=""></option>
                {countries.sort().map((country, index) => (
                  <option value={country} key={index} className="option">
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-wrapper">
              <label htmlFor="city" className="label">
                City
                <input
                  type="text"
                  className="input"
                  name="city"
                  id="city"
                  ref={city}
                  onChange={handleInputChange}
                />
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
                  ref={address}
                  onChange={handleInputChange}
                />
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
                  ref={email}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="switcher-wrapper">
              Receive notifications by mail
              <input
                type="checkbox"
                name="receiveMail"
                id="receiveMail"
                className="switcher-input"
                ref={receiveMail}
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
                  ref={phone}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="switcher-wrapper">
              Receive sms
              <input
                type="checkbox"
                name="receiveSMS"
                id="receiveSMS"
                className="switcher-input"
                ref={receiveSMS}
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
                ref={firstCheckbox}
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
                ref={secondCheckbox}
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
                ref={thirdCheckbox}
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
              <div className="radio-wrapper" ref={gender} placeholder="radio">
                {['undefined', 'female', 'male', 'other'].map((value, index) => (
                  <label className="radio-label" htmlFor={`gender__${index}`} key={index}>
                    <input
                      className="radio-input"
                      id={`gender__${index}`}
                      type="radio"
                      value={value}
                      name="gender"
                      onChange={handleRadioInput}
                    />
                    {['undefined', 'female', 'male', 'other'][index]}
                  </label>
                ))}
              </div>
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
