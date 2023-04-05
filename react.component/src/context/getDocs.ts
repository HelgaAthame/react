import { BookType } from "../app/types";

export const getDocs = async (): Promise<BookType[]> => {
  const response = await fetch(`https://the-one-api.dev/v2/character`, {
    method: 'get',
    headers: new Headers({
      Authorization: 'Bearer TinzBFnLUdwvfCjMa4hL',
    }),
  });
  if (!response.ok) throw new Error('Could not fetch the data from the resourse');
  const data = await response.json();
  return data.docs;
};
