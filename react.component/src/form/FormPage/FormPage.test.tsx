import { beforeEach, describe, expect, test } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { FormPage } from './FormPage';
import { ErrorPage } from '../../errorPage';

import { Provider } from 'react-redux';
import { store } from '../../redux-folder';

const routes = [
  {
    path: '/',
    element: <FormPage />,
    errorElement: <ErrorPage />,
  },
];
const router = createMemoryRouter(routes);

beforeEach(() => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
});

describe('react form page', () => {
  test('confirm doing well', async () => {
    const firstNameInput = screen.getByLabelText('First Name') as HTMLInputElement;
    const lastNameInput = screen.getByLabelText('Last Name');
    const birthdayInput = screen.getByLabelText('Birthday');
    const zipCodeInput = screen.getByLabelText('Zip-code');
    const countryInput = screen.getByTestId('country');
    const cityInput = screen.getByLabelText('City');
    const addressInput = screen.getByLabelText('Address');
    const emailInput = screen.getByLabelText('E-mail');
    const phoneInput = screen.getByLabelText('Phone');
    const radio = screen.getByLabelText('male');
    const showMyAge = screen.getByLabelText('Show my age');

      fireEvent.change(firstNameInput, { target: { value: 'Olga' } });
      fireEvent.change(lastNameInput, { target: { value: 'Fakelastname' } });
      fireEvent.change(birthdayInput, { target: { value: '2008-10-12' } });
      fireEvent.change(zipCodeInput, { target: { value: '1111111' } });
      fireEvent.change(countryInput, { target: { value: 'Belarus' } });
      fireEvent.change(cityInput, { target: { value: 'FakeCity' } });
      fireEvent.change(addressInput, { target: { value: 'Fake address' } });
      fireEvent.change(emailInput, { target: { value: 'fakemail@gmail.com' } });
      fireEvent.change(phoneInput, { target: { value: '+37529111-11-11' } });
      radio.click();
      showMyAge.click();

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
    expect(showMyAge).toBeTruthy();

    const submit = screen.getByTestId('submit');
    expect(submit).toBeTruthy();

    const file = screen.getByTestId('file_input') as HTMLInputElement;
    expect(file).toBeTruthy();
    const fileValid = new File(['hello'], 'image-hello.png', { type: 'image/png' });
    const fileInvalid = new File(['hello'], 'hello.kuku', { type: 'image/png' });
    await waitFor(() => expect(file.files).toHaveLength(0));
    await act(async () => await userEvent.upload(file, fileInvalid));
    await waitFor(() => expect(file.files).toHaveLength(1));
    submit.click();

    await act(async () => await userEvent.upload(file, fileValid));
    await waitFor(() => expect(file.files).toHaveLength(1));
    submit.click();

    await waitFor(() => {
      const confirm = screen.getByTestId('confirmation');
      expect(confirm).toBeTruthy();
    });

    const form = await screen.findByTestId('form') as HTMLFormElement;
    form.reset();
    expect(form).toBeTruthy();

  });

  test('confirm with errors', async () => {
    const firstNameInput = screen.getByLabelText('First Name') as HTMLInputElement;
    const lastNameInput = screen.getByLabelText('Last Name');
    const birthdayInput = screen.getByLabelText('Birthday');
    const zipCodeInput = screen.getByLabelText('Zip-code');
    const countryInput = screen.getByTestId('country');
    const cityInput = screen.getByLabelText('City');
    const addressInput = screen.getByLabelText('Address');
    const emailInput = screen.getByLabelText('E-mail');
    const phoneInput = screen.getByLabelText('Phone');
    const radio = screen.getByLabelText('male');
    const radioWrapper = screen.getByTestId('radio');
    const submit = screen.getByTestId('submit');

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

    await waitFor(() => {
      const errors = screen.getAllByTestId('error');
      expect(errors).toHaveLength(11);
      errors.forEach((error) => expect(error.innerText).not.toBe(''));
    });
  });

  test('checkboxes works', async () => {
    const showMyAge = screen.getByLabelText('Show my age') as HTMLInputElement;
    expect(showMyAge).toBeTruthy();
    act(() => showMyAge.click());
    await waitFor(() => expect(showMyAge.checked).toBe(true));

    const receiveMail = screen.getByTestId('receiveMail') as HTMLInputElement;
    expect(receiveMail).toBeTruthy();
    act(() => receiveMail.click());
    await waitFor(() => expect(receiveMail.checked).toBe(true));

    const receiveSMS = screen.getByTestId('receiveSMS') as HTMLInputElement;
    expect(receiveSMS).toBeTruthy();
    act(() => receiveSMS.click());
    await waitFor(() => expect(receiveSMS.checked).toBe(true));

    const firstCheckbox = screen.getByLabelText('I like this website') as HTMLInputElement;
    expect(firstCheckbox).toBeTruthy();
    act(() => firstCheckbox.click());
    await waitFor(() => expect(firstCheckbox.checked).toBe(true));

    const secondCheckbox = screen.getByLabelText('I enjoy filling out forms') as HTMLInputElement;
    expect(secondCheckbox).toBeTruthy();
    act(() => secondCheckbox.click());
    await waitFor(() => expect(secondCheckbox.checked).toBe(true));

    const thirdCheckbox = screen.getByLabelText('I like reading good books') as HTMLInputElement;
    expect(thirdCheckbox).toBeTruthy();
    act(() => thirdCheckbox.click());
    await waitFor(() => expect(thirdCheckbox.checked).toBe(true));
  });
});
