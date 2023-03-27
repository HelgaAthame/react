import { describe, expect, test } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { FormPage } from './FormPage';
import { ErrorPage } from '../../errorPage';

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
    const file = screen.getByLabelText('UPLOAD PROFILE PHOTO') as HTMLInputElement;

    const files = [
      new File(['hello'], 'hello.png', { type: 'image/png' }),
      new File(['there'], 'there.png', { type: 'image/png' }),
    ];

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: 'Olga' } });
      fireEvent.change(lastNameInput, { target: { value: 'Fakelastname' } });
      fireEvent.change(birthdayInput, { target: { value: '2008-10-12' } });
      fireEvent.change(zipCodeInput, { target: { value: '1111111' } });
      fireEvent.change(countryInput, { target: { value: 'Belarus' } });
      fireEvent.change(cityInput, { target: { value: 'FakeCity' } });
      fireEvent.change(addressInput, { target: { value: 'fakeAddressFakeAddress' } });
      fireEvent.change(emailInput, { target: { value: 'fakemail@gmail.com' } });
      fireEvent.change(phoneInput, { target: { value: '+37529111-11-11' } });
      radio.click();

      userEvent.upload(file, files);
    });

    await waitFor(() => {
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
      expect(file).toBeTruthy();
    });

    const submit = screen.getByPlaceholderText('submit');
    expect(submit).toBeTruthy();

    act(() => submit.click());

    await waitFor(() => {
      const errors = screen.getAllByPlaceholderText('error');
      expect(errors).toHaveLength(11);
    })

    const form = screen.getByPlaceholderText('form') as HTMLFormElement;
    act(() => form.reset());
    expect(form).toBeTruthy();
  });

  test('confirm with errors', () => {
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
    const radioWrapper = screen.getByPlaceholderText('radio');
    const submit = screen.getByPlaceholderText('submit');

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(birthdayInput).toBeTruthy();
    expect(zipCodeInput).toBeTruthy();
    expect(countryInput).toBeTruthy();
    expect(cityInput).toBeTruthy();
    expect(addressInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneInput).toBeTruthy();
    expect(radio).toBeTruthy();
    expect(radioWrapper).toBeTruthy();
    expect(submit).toBeTruthy();

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: '7777777777' } });
      fireEvent.change(lastNameInput, { target: { value: '11111' } });
      fireEvent.change(birthdayInput, { target: { value: 'kuku' } });
      fireEvent.change(zipCodeInput, { target: { value: '1' } });
      fireEvent.change(countryInput, { target: { value: 'fakeCountry' } });
      fireEvent.change(cityInput, { target: { value: '0' } });
      fireEvent.change(addressInput, { target: { value: 'fake' } });
      fireEvent.change(emailInput, { target: { value: 'fakemail' } });
      fireEvent.change(phoneInput, { target: { value: 'failPhone' } });
    });

    expect(firstNameInput.value).toBe('7777777777');

    act(() => submit.click());

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

    act(() => userEvent.upload(file, files));
    expect(file.files).toHaveLength(0);
  });
});
