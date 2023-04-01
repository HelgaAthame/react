import { createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit'
import { BookType } from '../app/types';

interface CardsState {
  [x: string]: any;
  cards: BookType[];
}

const initialState: CardsState = {
  //isLoading: true,
  cards: [],
}

export const searchSlice: Slice<CardsState, SliceCaseReducers<CardsState>, "search"> = createSlice({
  name: 'search',
  initialState,
  reducers: {
    sortCards(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((card) =>
        Object.values(card).find(
          (value: string | number) =>
            value.toString().toLowerCase().search(action.payload.toLowerCase()) !== -1
        ));
        console.log(state.cards);
      },
    setCards(state, action: PayloadAction<BookType[]>) {
      state.cards = action.payload;
    }
  }
});

export const { sortCards, setCards } = searchSlice.actions;
export default searchSlice.reducer;
