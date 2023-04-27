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

  const fieldsetWrapperClasses = 'fieldset-wrapper grow overflow-hidden relative m-2 rounded flex items-stretch';
  const fieldsetClasses = 'fieldset w-full text-2xl m-px rounded-sm bg-white border-0 p-2 text-emerald-900 duration-1000 hover:text-emerald-600 group';
  const fieldsetH3Classes = 'uppercase m-0 py-2 text-left';
  const inputWrapperClasses = 'input-wrapper text-base regular-font flex';
  const labelClasses = 'label flex flex-wrap text-left grow duration-1000 my-1';
  const inputClasses = 'input group-hover:text-emerald-600 overflow-visible grow text-base outline-none border-none duration-100 ml-1 text-emerald-900 bg-white w-6/12 focus:text-emerald-600 focus:border-b focus:border-b-solid focus:borderb--emerald-600';
  const errorClasses = 'error text-red-900 text-base transform-none';
  const checkboxLabelClasses ="checkbox-label grow text-base text-left inline-flex items-center select-none before:duration-1000 before:content-['✔'] before:text-base before:leading-4 before:text-center before:align-middle before:inline-block before:w-4 before:h-4 before:shrink-0 before:grow-0 before:border before:border-solid before:border-emerald-900 before:rounded before:mr-1 before:bg-no-repeat before:bg-center before:bg-50% before:bg-emerald-600 before:text-emerald-600 peer-checked:before:bg-white";

  return (
    <section className="form-page">
      {confirm && <Confirmation />}
      <Header currentPage="FORM" />

      <form data-testid="form" className="form mx-4 flex flex-wrap" ref={form} onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldsetWrapperClasses}>
          <fieldset className={fieldsetClasses}>
            <h3 className={fieldsetH3Classes}>Personal Information</h3>

            <div className={inputWrapperClasses}>
              <label htmlFor="firstName" className={labelClasses}>
                First Name
                <input
                  type="text"
                  className={inputClasses}
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
                  <span className={errorClasses} data-testid="error">
                    <>{errors.firstName.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className={inputWrapperClasses}>
              <label htmlFor="lastName" className={labelClasses}>
                Last Name
                <input
                  type="text"
                  className={inputClasses}
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
                  <span className={errorClasses} data-testid="error">
                    <>{errors.lastName.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className={inputWrapperClasses}>
              <label htmlFor="age" className={labelClasses}>
                Birthday
                <input
                  type="date"
                  className={inputClasses}
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
                  <span className={errorClasses} data-testid="error">
                    <>{errors.age.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="checkbox-wrapper my-1 py-1 flex">
              <input
                type="checkbox"
                id="showMyAge"
                data-testid="showMyAge"
                className="checkbox-input absolute z-[-1] opacity-0 peer"
                {...register('showMyAge', {
                  required: 'Required',
                })}
              />
              <label htmlFor="showMyAge" className={checkboxLabelClasses}>
                Show my age
              </label>
              {errors.showMyAge && (
                <span className={errorClasses} data-testid="error">
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
                className="input__file absolute opacity-0 invisible"
                data-testid="file_input"
              />
              <label htmlFor="profilePhoto" className="input__label text-base flex items-center justify-start hover:cursor-pointer">
                <span className="input__file-icon-wrapper flex items-center justify-center">
                  <>
                    <Upload />
                  </>
                </span>
                <span className="input__file-button-text leading-4 p-2 medium-font" ref={buttonText}>
                  UPLOAD PROFILE PHOTO
                </span>
                {errors.file && (
                  <span className={errorClasses}>
                    <>{errors.file.message}</>
                  </span>
                )}
                {fileError && (
                  <span className={errorClasses} data-testid="file-error">
                    Error: upload an image
                  </span>
                )}
              </label>
            </div>
          </fieldset>
        </div>

        <div className={fieldsetWrapperClasses}>
          <fieldset className={fieldsetClasses}>
            <h3 className={fieldsetH3Classes}>Address</h3>

            <div className={inputWrapperClasses}>
              <label htmlFor="zipCode" className={labelClasses}>
                Zip-code
                <input
                  type="text"
                  className={inputClasses}
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
                  <span className={errorClasses} data-testid="error">
                    <>{errors.zipCode.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="select-wrapper text-base text-left flex items-center flex-wrap">
              Country
              <select
                data-testid="country"
                id="country"
                multiple={false}
                className="select h-6 grow text-emerald-600 text-base regular-font m-2 outline-none border-none cursor-pointer bg-white w-6/12 hover:text-emerald-600"
                {...register('country', {
                  validate: {
                    country: (v) => countries.includes(v) || 'Required',
                  },
                })}
              >
                <option className="option regular-font text-base cursor-pointer" value=""></option>
                {countries.sort().map((country, index) => (
                  <option value={country} key={index} className="option">
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className={errorClasses} data-testid="error">
                  <>{errors.country.message}</>
                </span>
              )}
            </div>

            <div className={inputWrapperClasses}>
              <label htmlFor="city" className={labelClasses}>
                City
                <input
                  type="text"
                  className={inputClasses}
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
                  <span className={errorClasses} data-testid="error">
                    <>{errors.city.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className={inputWrapperClasses}>
              <label htmlFor="address" className={labelClasses}>
                Address
                <input
                  type="text"
                  className={inputClasses}
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
                  <span className={errorClasses} data-testid="error">
                    <>{errors.address.message}</>
                  </span>
                )}
              </label>
            </div>
          </fieldset>
        </div>

        <div className={fieldsetWrapperClasses}>
          <fieldset className={fieldsetClasses}>
            <h3 className={fieldsetH3Classes}>Contacts</h3>

            <div className={inputWrapperClasses}>
              <label htmlFor="email" className={labelClasses}>
                E-mail
                <input
                  type="text"
                  className={inputClasses}
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
                  <span className={errorClasses} data-testid="error">
                    <>{errors.email.message}</>
                  </span>
                )}
              </label>
            </div>

            <div className="switcher-wrapper flex flex-nowrap items-center text-base text-left">
              Receive notifications by mail
              <input
                type="checkbox"
                data-testid="receiveMail"
                id="receiveMail"
                className="switcher-input h-0 w-0 m-0 invisible"
                {...register('receiveMail')}
              />
              <label htmlFor="receiveMail" className="switcher-label "></label>
            </div>

            <div className={inputWrapperClasses}>
              <label htmlFor="phone" className={labelClasses}>
                Phone
                <input
                  type="text"
                  className={inputClasses}
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
                  <span className={errorClasses} data-testid="error">
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

        <div className={fieldsetWrapperClasses}>
          <fieldset className={fieldsetClasses}>
            <h3 className={fieldsetH3Classes}>Checkboxes</h3>

            <div className="checkbox-wrapper my-1 py-1 flex">
              <input
                type="checkbox"
                id="firstCheckbox"
                className="checkbox-input absolute z-[-1] opacity-0 peer"
                {...register('firstCheckbox')}
              />
              <label htmlFor="firstCheckbox" className={checkboxLabelClasses}>
                I like this website
              </label>
            </div>

            <div className="checkbox-wrapper my-1 py-1 flex">
              <input
                type="checkbox"
                id="secondCheckbox"
                className="checkbox-input absolute z-[-1] opacity-0 peer"
                {...register('secondCheckbox')}
              />
              <label htmlFor="secondCheckbox" className={checkboxLabelClasses}>
                I enjoy filling out forms
              </label>
            </div>

            <div className="checkbox-wrapper my-1 py-1 flex">
              <input
                type="checkbox"
                id="thirdCheckbox"
                className="checkbox-input absolute z-[-1] opacity-0 peer"
                {...register('thirdCheckbox')}
              />
              <label htmlFor="thirdCheckbox" className={checkboxLabelClasses}>
                I like reading good books
              </label>
            </div>
          </fieldset>
        </div>

        <div className={fieldsetWrapperClasses}>
          <fieldset className={fieldsetClasses}>
            <h3 className={fieldsetH3Classes}>Radios</h3>

            <div className="radio-super-wrapper text-left uppercase transform-none">
              Gender
              <div className="radio-wrapper flex flex-col text-base" data-testid="radio" {...register}>
                {['undefined', 'female', 'male', 'other'].map((value, index) => (
                  <label className="radio-label p-1 text-left" htmlFor={`gender__${index}`} key={index}>
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
                <span className={errorClasses} data-testid="error">
                  <>{errors.gender.message}</>
                </span>
              )}
            </div>
          </fieldset>
        </div>

        <div className="submit-wrapper flex items-stretch m-1 outline-none overflow-hidden relative rounded h-min">
          <input type="submit" className="submit-input text-emerald-900 border-none bg-white m-px rounded-sm pt-5 px-4 pb-3 duration-1000 text-4xl light-font hover:text-emerald-600" value="SUBMIT" data-testid="submit" />
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
