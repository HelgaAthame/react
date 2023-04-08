import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookType } from '../app/types';

export const fetchChars = createAsyncThunk<BookType[], string>(
  'chars',
  async (searchStr: string): Promise<BookType[]> => {
    const response = await fetch(
      `https://the-one-api.dev/v2/character?name=/^.*${searchStr}.*$/i`,
      {
        method: 'get',
        headers: new Headers({
          Authorization: 'Bearer TinzBFnLUdwvfCjMa4hL',
        }),
      }
    );
    if (!response.ok) throw new Error('Could not fetch the data from the resourse');
    const data = await response.json();
    return data.docs;
  }
);

export const fetchCharById = createAsyncThunk(
  'byId',
  async (searchId: string): Promise<BookType> => {
    const response = await fetch(`https://the-one-api.dev/v2/character/${searchId}`, {
      method: 'get',
      headers: new Headers({
        Authorization: 'Bearer TinzBFnLUdwvfCjMa4hL',
      }),
    });
    if (!response.ok) throw new Error('Could not fetch the data from the resourse');
    const data = await response.json();
    return data.docs[0];
  }
);
