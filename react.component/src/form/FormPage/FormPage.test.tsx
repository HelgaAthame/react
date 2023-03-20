import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { FormPage } from './FormPage';
import { ErrorPage } from '../../errorPage';

const routes = [
  {
    path: '/',
    element: <FormPage />,
    errorElement: <ErrorPage />,
  }
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
    expect(firstNameInput).toBeTruthy();
    fireEvent.change(firstNameInput, { target: { value: 'Olga' } });
    expect(firstNameInput.value).toBe('Olga');
    const lastNameInput = screen.getByLabelText('Last Name');
    expect(lastNameInput).toBeTruthy();
    fireEvent.change(lastNameInput, { target: { value: 'fakelastname' } });
    const birthdayInput = screen.getByLabelText('Birthday');
    expect(birthdayInput).toBeTruthy();
    fireEvent.change(birthdayInput, { target: { value: '2008-10-12' } });
    const zipCodeInput = screen.getByLabelText('Zip-code');
    expect(zipCodeInput).toBeTruthy();
    fireEvent.change(zipCodeInput, { target: { value: '1111111' } });
    const countryInput = screen.getByPlaceholderText('country');
    expect(countryInput).toBeTruthy();
    fireEvent.change(countryInput, { target: { value: 'Belarus' } });
    const cityInput = screen.getByLabelText('City');
    expect(cityInput).toBeTruthy();
    fireEvent.change(cityInput, { target: { value: 'fakeCity' } });
    const addressInput = screen.getByLabelText('Address');
    expect(addressInput).toBeTruthy();
    fireEvent.change(addressInput, { target: { value: 'fakeAddressFakeAddress' } });
    const emailInput = screen.getByLabelText('E-mail');
    expect(emailInput).toBeTruthy();
    fireEvent.change(emailInput, { target: { value: 'fakemail@gmail.com' } });
    const phoneInput = screen.getByLabelText('Phone');
    expect(phoneInput).toBeTruthy();
    fireEvent.change(phoneInput, { target: { value: '+37529111-11-11' } });
    const radio = screen.getByLabelText('male');
    expect(radio).toBeTruthy();
    radio.click();
    const radioWrapper = screen.getByPlaceholderText('radio');
    expect(radio).toBeTruthy();

    const submit = screen.getByPlaceholderText('submit');
    expect(submit).toBeTruthy();

    submit.click();
    expect(Array.from(firstNameInput.classList)).not.toContain('err');
    expect(Array.from(lastNameInput.classList)).not.toContain('err');
    expect(Array.from(birthdayInput.classList)).not.toContain('err');
    expect(Array.from(zipCodeInput.classList)).not.toContain('err');
    expect(Array.from(countryInput.classList)).not.toContain('error');
    expect(Array.from(cityInput.classList)).not.toContain('err');
    expect(Array.from(addressInput.classList)).not.toContain('err');
    expect(Array.from(emailInput.classList)).not.toContain('err');
    expect(Array.from(phoneInput.classList)).not.toContain('err');
    expect(Array.from(radioWrapper.classList)).not.toContain('error');
    console.log(radioWrapper.classList[1]);

    expect(firstNameInput.classList.length).toBe(1);

    submit.click();

    await waitFor(() => {
      const confirmation = screen.getByPlaceholderText('confirmation');
      expect(confirmation).toBeDefined();
    })
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
    expect(Array.from(firstNameInput.classList)).toContain('err');
    expect(Array.from(lastNameInput.classList)).toContain('err');
    expect(Array.from(birthdayInput.classList)).toContain('err');
    expect(Array.from(zipCodeInput.classList)).toContain('err');
    expect(Array.from(countryInput.classList)).toContain('error');
    expect(Array.from(cityInput.classList)).toContain('err');
    expect(Array.from(addressInput.classList)).toContain('err');
    expect(Array.from(emailInput.classList)).toContain('err');
    expect(Array.from(phoneInput.classList)).toContain('err');
    expect(Array.from(radioWrapper.classList)).toContain('error');
  });

  test('file imports properly', async () => {
    render(<RouterProvider router={router} />);
    const file = screen.getByLabelText('UPLOAD PROFILE PHOTO') as HTMLInputElement;
    expect(file).toBeTruthy();
    const files = [
      new File(['hello'], 'hello.png', {type: 'image/png'}),
      new File(['there'], 'there.png', {type: 'image/png'}),
    ];


    expect(file.files).toHaveLength(0);

  });

});
