import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Confirmation } from '../Confirmation';

describe('react form page', () => {
  test('Confirm message renders properly', () => {
    document.body.innerHTML = '';
    render(<Confirmation />);
    const confirmation = screen.getByPlaceholderText('confirmation');
    expect(confirmation).toBeTruthy();
  });
});
