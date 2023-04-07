import { createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { BookType } from '../app/types';
import { ProfileCard } from '../form/FormPage';
import { fetchChars, fetchCharById } from './fetchThunk';

interface CardsState {
  cards: BookType[] | null;
  profileCards: ProfileCard[];
  searchText: string;
  error: string | null;
  smallError: string | null;
  loading: boolean;
  curChar: BookType | null;
}

const initialState: CardsState = {
  cards: null,
  profileCards: [],
  searchText: '',
  error: null,
  smallError: null,
  loading: false,
  curChar: null,
};

export const searchSlice: Slice<CardsState, SliceCaseReducers<CardsState>, 'search'> = createSlice({
  name: 'search',
  initialState,
  reducers: {
    sortCards(state, action: PayloadAction<string>) {
      if (state.cards) state.cards = state.cards.filter((card) =>
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
    },
    changeSearchText(state, action: PayloadAction<string>) {
      console.log(`action payload = ${action.payload}`);
      state.searchText = action.payload;

      console.log(`state.searchText = ${state.searchText}`);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChars.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchChars.fulfilled,
      (state, { payload }) => {
      state.cards = payload;
      state.loading = false;
    });
    builder.addCase(fetchChars.rejected,
      (state, { error }) => {
      if (error.message) state.error = error.message;
      state.loading = false;
    });
    builder.addCase(fetchCharById.pending, (state) => {
      state.loading = true;
      state.smallError = null;
    });
    builder.addCase(fetchCharById.fulfilled,
      (state, { payload }) => {
      state.curChar = payload;
      state.loading = false;
    });
    builder.addCase(fetchCharById.rejected,
      (state, { error }) => {
        if (error.message) state.smallError = error.message;
        state.loading = false;
    });
  },

});

export const { sortCards, setCards, addProfileCard, changeSearchText } = searchSlice.actions;
export default searchSlice.reducer;
