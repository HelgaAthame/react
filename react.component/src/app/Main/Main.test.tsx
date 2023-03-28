import { describe, expect, test } from 'vitest';
import { render, waitFor } from '@testing-library/react';

import { Main } from './Main';

describe('react Main', () => {
  test('Main renders properly', async () => {
    const main = render(<Main />);
    expect(main).toBeTruthy();
    const loading = main.getByText(/loading/i);
    await waitFor(() => expect(loading).toBeTruthy());
  });
});
