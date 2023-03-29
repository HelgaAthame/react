import { Header } from '../../app/Header';
import { useState } from 'react';
import './formPage.scss';
import { countries } from '../countries';
import { Confirmation } from '../Confirmation';
import { ReactComponent as Upload } from '../../assets/upload.svg';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FromCard } from '../FormCard';

export type ProfileCard = {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });

  const [confirm, setConfirm] = useState<boolean>(false);
  const [cards, setCards] = useState<ProfileCard[]>([]);

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const arr: ProfileCard[] = cards;

    setConfirm(true);

    setTimeout(() => setConfirm(false), 5000);

    const newCard = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: dateToAge(data.age),
      showMyAge: data.showMyAge,
      upload: '',
      zipCode: data.zipCode,
      country: data.country,
      city: data.city,
      address: data.address,
      email: data.email,
      receiveMail: data.receiveMail,
      phone: data.phone,
      receiveSMS: data.receiveSMS,
      firstCheckbox: data.firstCheckbox,
      secondCheckbox: data.secondCheckbox,
      thirdCheckbox: data.thirdCheckbox,
      gender: data.gender,
    };

    const promise = fileToUrl.call(this);
    promise.then((result) => {
      newCard.upload = result;
      arr.push(newCard);
      setCards(arr);

      const form = document.querySelector('form');
      if (form) form.reset();
    });
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
                  id="firstName"
                  {...register('firstName', {
                    required: 'Required',
                    minLength: {
                      value: 2,
                      message: 'Too short',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Too long',
                    },
                    pattern: {
                      value: /^[A-Z][a-zA-Z]+$/,
                      message: 'Should consist of letters and start with uppercase letter',
                    },
                  })}
                />
                {errors.firstName && (
                  <span className="error" placeholder="error">
                    <>{errors.firstName.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="input-wrapper">
              <label htmlFor="lastName" className="label">
                Last Name
                <input
                  type="text"
                  className="input"
                  id="lastName"
                  {...register('lastName', {
                    required: 'Required',
                    minLength: {
                      value: 2,
                      message: 'Too short',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Too long',
                    },
                    pattern: {
                      value: /^[A-Z][a-zA-Z]+$/,
                      message: 'Should consist of letters and start with uppercase letter',
                    },
                  })}
                />
                {errors.lastName && (
                  <span className="error" placeholder="error">
                    <>{errors.lastName.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="input-wrapper">
              <label htmlFor="age" className="label">
                Birthday
                <input
                  type="date"
                  className="input"
                  id="age"
                  {...register('age', {
                    required: 'Required',
                    valueAsDate: true,
                    validate: {
                      sixPlus: (date) => dateToAge(date) >= 6 || 'Only 6+ users',
                    },
                  })}
                />
                {errors.age && (
                  <span className="error" placeholder="error">
                    <>{errors.age.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="showMyAge"
                className="checkbox-input"
                {...register('showMyAge')}
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
                placeholder="file_input"
              />
              <label htmlFor="profilePhoto" className="input__label">
                <span className="input__file-icon-wrapper">
                  <>
                    <Upload />
                  </>
                </span>
                <span className="input__file-button-text">UPLOAD PROFILE PHOTO</span>
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
                  id="zipCode"
                  {...register('zipCode', {
                    required: 'Required',
                    minLength: {
                      value: 4,
                      message: 'Too short',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Too long',
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: 'Numbers only',
                    },
                  })}
                />
                {errors.zipCode && (
                  <span className="error" placeholder="error">
                    <>{errors.zipCode.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="select-wrapper">
              Country
              <select
                placeholder="country"
                id="country"
                multiple={false}
                className="select"
                {...register('country', {
                  validate: {
                    country: (v) => countries.includes(v) || 'Required',
                  },
                })}
              >
                <option className="option" value=""></option>
                {countries.sort().map((country, index) => (
                  <option value={country} key={index} className="option">
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="error" placeholder="error">
                  <>{errors.country.message}</>
                </span>
              )}
            </div>

            <div className="input-wrapper">
              <label htmlFor="city" className="label">
                City
                <input
                  type="text"
                  className="input"
                  id="city"
                  {...register('city', {
                    required: 'Required',
                    minLength: {
                      value: 2,
                      message: 'Too short',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Too long',
                    },
                    pattern: {
                      value: /^[A-Z][a-zA-Z\s]+[a-z]$/,
                      message:
                        'Should consist of letters and spaces and start with uppercase letter',
                    },
                  })}
                />
                {errors.city && (
                  <span className="error" placeholder="error">
                    <>{errors.city.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="input-wrapper">
              <label htmlFor="address" className="label">
                Address
                <input
                  type="text"
                  className="input"
                  id="address"
                  {...register('address', {
                    required: 'Required',
                    minLength: {
                      value: 10,
                      message: 'Too short',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Too long',
                    },
                    pattern: {
                      value: /^[A-Z\d][a-zA-Z\s\d\,\']+[a-z\d]$/,
                      message: 'Invalid address',
                    },
                  })}
                />
                {errors.address && (
                  <span className="error" placeholder="error">
                    <>{errors.address.message}</>
                  </span>
                )}
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
                  id="email"
                  {...register('email', {
                    required: 'Required',
                    pattern: {
                      value:
                        /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i,
                      message: 'Invalid e-mail',
                    },
                  })}
                />
                {errors.email && (
                  <span className="error" placeholder="error">
                    <>{errors.email.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="switcher-wrapper">
              Receive notifications by mail
              <input
                type="checkbox"
                placeholder="receiveMail"
                id="receiveMail"
                className="switcher-input"
                {...register('receiveMail')}
              />
              <label htmlFor="receiveMail" className="switcher-label"></label>
            </div>

            <div className="input-wrapper">
              <label htmlFor="phone" className="label">
                Phone
                <input
                  type="text"
                  className="input"
                  id="phone"
                  {...register('phone', {
                    required: 'Required',
                    pattern: {
                      value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                      message: 'Invalid phone number',
                    },
                  })}
                />
                {errors.phone && (
                  <span className="error" placeholder="error">
                    <>{errors.phone.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="switcher-wrapper">
              Receive sms
              <input
                type="checkbox"
                placeholder="receiveSMS"
                id="receiveSMS"
                className="switcher-input"
                {...register('receiveSMS')}
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
                id="firstCheckbox"
                className="checkbox-input"
                {...register('firstCheckbox')}
              />
              <label htmlFor="firstCheckbox" className="checkbox-label">
                I like this website
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="secondCheckbox"
                className="checkbox-input"
                {...register('secondCheckbox')}
              />
              <label htmlFor="secondCheckbox" className="checkbox-label">
                I enjoy filling out forms
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="thirdCheckbox"
                className="checkbox-input"
                {...register('thirdCheckbox')}
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
              <div className="radio-wrapper" placeholder="radio" {...register}>
                {['undefined', 'female', 'male', 'other'].map((value, index) => (
                  <label className="radio-label" htmlFor={`gender__${index}`} key={index}>
                    <input
                      className="radio-input"
                      id={`gender__${index}`}
                      type="radio"
                      value={value}
                      {...register('gender', {
                        required: 'Required',
                      })}
                    />
                    {['undefined', 'female', 'male', 'other'][index]}
                  </label>
                ))}
              </div>
              {errors.gender && (
                <span className="error" placeholder="error">
                  <>{errors.gender.message}</>
                </span>
              )}
            </div>
          </fieldset>
        </div>

        <div className="submit-wrapper">
          <input type="submit" className="submit-input" value="SUBMIT" placeholder="submit" />
        </div>
      </form>

      <div className="cards-section">
        {cards.map((card, index) => (
          <FromCard card={card} index={index} />

        ))}
      </div>
    </section>
  );
};
