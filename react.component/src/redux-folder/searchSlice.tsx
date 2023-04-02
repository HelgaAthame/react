import { createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { BookType } from '../app/types';
import { ProfileCard } from '../form/FormPage';

interface CardsState {
  cards: BookType[];
  profileCards: ProfileCard[];
}

const initialState: CardsState = {
  cards: [],
  profileCards: [],
};

export const searchSlice: Slice<CardsState, SliceCaseReducers<CardsState>, 'search'> = createSlice({
  name: 'search',
  initialState,
  reducers: {
    sortCards(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((card) =>
        Object.values(card).find(
          (value: string | number) =>
            value.toString().toLowerCase().search(action.payload.toLowerCase()) !== -1
        )
      );
    },
    setCards(state, action: PayloadAction<BookType[]>) {
      state.cards = action.payload;
    },
    addProfileCard(state, action: PayloadAction<ProfileCard>) {
      state.profileCards.push(action.payload);
    }
  },
});

export const { sortCards, setCards, addProfileCard } = searchSlice.actions;
export default searchSlice.reducer;
