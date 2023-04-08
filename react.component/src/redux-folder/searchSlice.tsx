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
  smallLoading: boolean;
  curChar: BookType | null;
}

const initialState: CardsState = {
  cards: null,
  profileCards: [],
  searchText: '',
  error: null,
  smallError: null,
  loading: false,
  smallLoading: false,
  curChar: null,
};

export const searchSlice: Slice<CardsState, SliceCaseReducers<CardsState>, 'search'> = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<BookType[]>) {
      state.cards = action.payload;
    },
    addProfileCard(state, action: PayloadAction<ProfileCard>) {
      state.profileCards.push(action.payload);
    },
    changeSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChars.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchChars.fulfilled, (state, { payload }) => {
      state.cards = payload;
      state.loading = false;
      console.log(`state.cards from slice`);
      console.log(state.cards);
    });
    builder.addCase(fetchChars.rejected, (state, { error }) => {
      if (error.message) state.error = error.message;
      state.loading = false;
    });
    builder.addCase(fetchCharById.pending, (state) => {
      state.smallLoading = true;
      state.smallError = null;
    });
    builder.addCase(fetchCharById.fulfilled, (state, { payload }) => {
      state.curChar = payload;
      state.smallLoading = false;
    });
    builder.addCase(fetchCharById.rejected, (state, { error }) => {
      if (error.message) state.smallError = error.message;
      state.smallLoading = false;
    });
  },
});

export const { sortCards, setCards, addProfileCard, changeSearchText } = searchSlice.actions;
export default searchSlice.reducer;
