import { Header } from '../../app/Header';
import { useRef, useState } from 'react';
import './formPage.scss';
import { countries } from '../countries';
import { Confirmation } from '../Confirmation';
import { ReactComponent as Upload } from '../../assets/upload.svg';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { addProfileCard } from '../../redux-folder';
import { RootState } from '../../redux-folder';
import React from 'react';

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
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const curState = useSelector((state: RootState) => state.curState);
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState<boolean>(false);

  const [fileError, setFileError] = useState<boolean>(false);

  const form = useRef<HTMLFormElement | null>(null);
  const photoInputWrapper = useRef<HTMLInputElement | null>(null);
  const buttonText = useRef<HTMLSpanElement | null>(null);

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
    if (!validatePhoto()) return;

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
      dispatch(addProfileCard(newCard));

      if (form.current) form.current.reset();
    });
  };

  const validatePhoto = () => {
    const photoInput = photoInputWrapper.current?.firstChild as HTMLInputElement;
    const files = photoInput.files as FileList;
    const pattern = /image-*/;
    const file = Array.from(files).at(-1) as File;
    const isError = !(files.length > 0 && file.type.match(pattern));
    setFileError(isError);
    return isError ? false : true;
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
    const upload = buttonText.current;
    const input = upload?.parentElement?.parentElement?.firstChild as HTMLInputElement;
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
    <section className="form-page">
      <Confirmation />
      {confirm && <Confirmation />}
      <Header currentPage="FORM" />

      <form data-testid="form" className="form" ref={form} onSubmit={handleSubmit(onSubmit)}>
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
                  data-testid="firstName"
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
                  <span className="error" data-testid="error">
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
                  data-testid="lastName"
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
                  <span className="error" data-testid="error">
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
                  data-testid="age"
                  {...register('age', {
                    required: 'Required',
                    valueAsDate: true,
                    validate: {
                      sixPlus: (date) => dateToAge(date) >= 6 || 'Only 6+ users',
                      immortal: (date) => dateToAge(date) <= 150 || 'Are you immortal?',
                    },
                  })}
                />
                {errors.age && (
                  <span className="error" data-testid="error">
                    <>{errors.age.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="showMyAge"
                data-testid="showMyAge"
                className="checkbox-input"
                {...register('showMyAge', {
                  required: 'Required',
                })}
              />
              <label htmlFor="showMyAge" className="checkbox-label">
                Show my age
              </label>
              {errors.showMyAge && (
                <span className="error" data-testid="error">
                  <>{errors.showMyAge.message}</>
                </span>
              )}
            </div>

            <div className="input__wrapper" ref={photoInputWrapper}>
              <input
                type="file"
                {...register('file', {
                  required: 'Required',
                })}
                accept="image/*"
                id="profilePhoto"
                className="input__file"
                data-testid="file_input"
              />
              <label htmlFor="profilePhoto" className="input__label">
                <span className="input__file-icon-wrapper">
                  <>
                    <Upload />
                  </>
                </span>
                <span className="input__file-button-text" ref={buttonText}>
                  UPLOAD PROFILE PHOTO
                </span>
                {errors.file && (
                  <span className="error">
                    <>{errors.file.message}</>
                  </span>
                )}
                {fileError && (
                  <span className="error" data-testid="file-error">
                    Error: upload an image
                  </span>
                )}
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
                  data-testid="zipCode"
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
                  <span className="error" data-testid="error">
                    <>{errors.zipCode.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="select-wrapper">
              Country
              <select
                data-testid="country"
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
                <span className="error" data-testid="error">
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
                  data-testid="city"
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
                  <span className="error" data-testid="error">
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
                  data-testid="address"
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
                  <span className="error" data-testid="error">
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
                  data-testid="email"
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
                  <span className="error" data-testid="error">
                    <>{errors.email.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="switcher-wrapper">
              Receive notifications by mail
              <input
                type="checkbox"
                data-testid="receiveMail"
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
                  data-testid="phone"
                  {...register('phone', {
                    required: 'Required',
                    pattern: {
                      value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                      message: 'Invalid phone number',
                    },
                  })}
                />
                {errors.phone && (
                  <span className="error" data-testid="error">
                    <>{errors.phone.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="switcher-wrapper">
              Receive sms
              <input
                type="checkbox"
                data-testid="receiveSMS"
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
              <div className="radio-wrapper" data-testid="radio" {...register}>
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
                <span className="error" data-testid="error">
                  <>{errors.gender.message}</>
                </span>
              )}
            </div>
          </fieldset>
        </div>

        <div className="submit-wrapper">
          <input type="submit" className="submit-input" value="SUBMIT" data-testid="submit" />
        </div>
      </form>

      <div className="cards-section">
        {curState.profileCards.map((card, index) => (
          <div className="form-card-wrapper" key={index}>
            <div className="form-card" data-testid="card">
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
