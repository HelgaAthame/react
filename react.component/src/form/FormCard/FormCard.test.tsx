import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormCard } from './FormCard';

describe('FormCard test', () => {
  test('FormCard renders properly', () => {
    const fakeCard1 = {
      firstName: 'fakeFirstName',
      lastName: 'fakeLastName',
      age: 50,
      showMyAge: true,
      gender: 'other',
      upload: 'image-fakeimage',
      zipCode: '111111',
      country: 'FakeCountry',
      city: 'fakeCity',
      address: 'fakeAddress',
      email: 'fake@email.fake',
      phone: '111111111111',
      receiveMail: true,
      receiveSMS: true,
      firstCheckbox: true,
      secondCheckbox: true,
      thirdCheckbox: true,
    };
    const fakeCard2 = {
      firstName: 'fakeFirstName',
      lastName: 'fakeLastName',
      age: 50,
      showMyAge: false,
      gender: 'other',
      upload: 'image-fakeimage',
      zipCode: '111111',
      country: 'FakeCountry',
      city: 'fakeCity',
      address: 'fakeAddress',
      email: 'fake@email.fake',
      phone: '111111111111',
      receiveMail: false,
      receiveSMS: false,
      firstCheckbox: false,
      secondCheckbox: false,
      thirdCheckbox: false,
    };
    render(<FormCard card={fakeCard1} index={100} />);
    render(<FormCard card={fakeCard2} index={101} />);
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    cards.forEach((card) => expect(card).toBeTruthy());
  });
});
