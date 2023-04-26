import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Confirmation } from './Confirmation';
import React from 'react';

describe('react form page', () => {
  test('Confirm message renders properly', () => {
    render(<Confirmation />);
    const confirmation = screen.getByTestId('confirmation');
    expect(confirmation).toBeTruthy();
  });
});
