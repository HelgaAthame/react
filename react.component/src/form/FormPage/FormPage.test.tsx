import { describe, expect, test } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { FormPage } from './FormPage';
import { ErrorPage } from '../../errorPage';
import { Confirmation } from '../Confirmation';

const routes = [
  {
    path: '/',
    element: <FormPage />,
    errorElement: <ErrorPage />,
  },
];
const router = createMemoryRouter(routes);

describe('react form page', () => {
  test('form page renders properly', () => {
    render(<RouterProvider router={router} />);
    const formPage = screen.getAllByPlaceholderText('formpage');
    expect(formPage).toBeDefined();
  });

  test('confirm doing well', async () => {
    render(<RouterProvider router={router} />);

    const firstNameInput = screen.getByLabelText('First Name') as HTMLInputElement;
    const lastNameInput = screen.getByLabelText('Last Name');
    const birthdayInput = screen.getByLabelText('Birthday');
    const zipCodeInput = screen.getByLabelText('Zip-code');
    const countryInput = screen.getByPlaceholderText('country');
    const cityInput = screen.getByLabelText('City');
    const addressInput = screen.getByLabelText('Address');
    const emailInput = screen.getByLabelText('E-mail');
    const phoneInput = screen.getByLabelText('Phone');
    const radio = screen.getByLabelText('male');

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: 'Olga' } });
      fireEvent.change(lastNameInput, { target: { value: 'fakelastname' } });
      fireEvent.change(birthdayInput, { target: { value: '2008-10-12' } });
      fireEvent.change(zipCodeInput, { target: { value: '1111111' } });
      fireEvent.change(countryInput, { target: { value: 'Belarus' } });
      fireEvent.change(cityInput, { target: { value: 'fakeCity' } });
      fireEvent.change(addressInput, { target: { value: 'fakeAddressFakeAddress' } });
      fireEvent.change(emailInput, { target: { value: 'fakemail@gmail.com' } });
      fireEvent.change(phoneInput, { target: { value: '+37529111-11-11' } });
      radio.click();
    });

    expect(firstNameInput).toBeTruthy();
    expect(firstNameInput.value).toBe('Olga');
    expect(lastNameInput).toBeTruthy();
    expect(birthdayInput).toBeTruthy();
    expect(zipCodeInput).toBeTruthy();
    expect(countryInput).toBeTruthy();
    expect(cityInput).toBeTruthy();
    expect(addressInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneInput).toBeTruthy();
    expect(radio).toBeTruthy();

    const submit = screen.getByPlaceholderText('submit');
    expect(submit).toBeTruthy();

    submit.click();

    const errors = screen.getAllByPlaceholderText('error');
    expect(errors).toHaveLength(10);
    errors.forEach((error) => expect(error.innerHTML).toBe(''));

    const form = screen.getByPlaceholderText('form') as HTMLFormElement;
    form.reset();
    expect(form).toBeTruthy();
  });

  test('confirm with errors', () => {
    render(<RouterProvider router={router} />);
    const firstNameInput = screen.getByLabelText('First Name') as HTMLInputElement;
    expect(firstNameInput).toBeTruthy();
    fireEvent.change(firstNameInput, { target: { value: '7777777777' } });
    expect(firstNameInput.value).toBe('7777777777');
    const lastNameInput = screen.getByLabelText('Last Name');
    expect(lastNameInput).toBeTruthy();
    fireEvent.change(lastNameInput, { target: { value: '11111' } });
    const birthdayInput = screen.getByLabelText('Birthday');
    expect(birthdayInput).toBeTruthy();
    fireEvent.change(birthdayInput, { target: { value: 'kuku' } });
    const zipCodeInput = screen.getByLabelText('Zip-code');
    expect(zipCodeInput).toBeTruthy();
    fireEvent.change(zipCodeInput, { target: { value: '1' } });
    const countryInput = screen.getByPlaceholderText('country');
    expect(countryInput).toBeTruthy();
    fireEvent.change(countryInput, { target: { value: 'fakeCountry' } });
    const cityInput = screen.getByLabelText('City');
    expect(cityInput).toBeTruthy();
    fireEvent.change(cityInput, { target: { value: '0' } });
    const addressInput = screen.getByLabelText('Address');
    expect(addressInput).toBeTruthy();
    fireEvent.change(addressInput, { target: { value: 'fake' } });
    const emailInput = screen.getByLabelText('E-mail');
    expect(emailInput).toBeTruthy();
    fireEvent.change(emailInput, { target: { value: 'fakemail' } });
    const phoneInput = screen.getByLabelText('Phone');
    expect(phoneInput).toBeTruthy();
    fireEvent.change(phoneInput, { target: { value: 'failPhone' } });
    const radio = screen.getByLabelText('male');
    expect(radio).toBeTruthy();
    const radioWrapper = screen.getByPlaceholderText('radio');
    expect(radioWrapper).toBeTruthy();

    const submit = screen.getByPlaceholderText('submit');
    expect(submit).toBeTruthy();

    submit.click();

    const errors = screen.getAllByPlaceholderText('error');
    errors.forEach((error) => expect(error.innerText).not.toBe(''));
  });

  test('file imports properly', () => {
    render(<RouterProvider router={router} />);
    const file = screen.getByLabelText('UPLOAD PROFILE PHOTO') as HTMLInputElement;
    expect(file).toBeTruthy();
    const files = [
      new File(['hello'], 'hello.png', { type: 'image/png' }),
      new File(['there'], 'there.png', { type: 'image/png' }),
    ];

    userEvent.upload(file, files);
    expect(file.files).toHaveLength(0);
  });

  test('Confirm message renders properly', () => {
    render(<Confirmation />);
    const confirmation = screen.getByPlaceholderText('confirmation');
    expect(confirmation).toBeTruthy();
  });
});
