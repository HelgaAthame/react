import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';

import { Main } from './Main';
import { cards } from '../cards';

describe('react Main', () => {
  test('Main renders properly', () => {
    const main = render(<Main cards={cards} />);
    expect(main).toBeTruthy();
    const card = main.getByText(/javascript/i);
    expect(card.innerHTML).toBe('The Modern JavaScript Tutorial');
  });
});
