import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';

import { Main } from './Main';

describe('react Main', () => {
  test('Main renders properly', () => {
    const main = render(<Main />);
    expect(main).toBeTruthy();
    const card = main.getByText(/javascript/i);
    expect(card.innerHTML).toBe('The Modern JavaScript Tutorial');
  });
});
