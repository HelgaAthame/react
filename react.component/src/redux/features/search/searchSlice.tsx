import { createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit'
import { getDocs } from '../../getDox';
import { BookType } from '../../../app/types';

const cards: BookType[] = await getDocs();

interface CardsState {
  [x: string]: any;
  //isLoading: boolean,
  cards: BookType[];
  searchValue: string | null;
}

const initialState: CardsState = {
  //isLoading: true,
  cards: cards,
  searchValue: localStorage.getItem('best-book-store') ? localStorage.getItem('best-book-store') : '',
}

export const searchSlice: Slice<CardsState, SliceCaseReducers<CardsState>, "search"> = createSlice({
  name: 'search',
  initialState,
  reducers: {
    sortCards(state, action: PayloadAction<string>) {
      state.cards = cards.filter((card) =>
        Object.values(card).find(
          (value: string | number) =>
            value.toString().toLowerCase().search(action.payload.toLowerCase()) !== -1
        ));
        console.log(state.cards);
      },
    /*setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }*/
  }
});

export const { sortCards, setIsLoading } = searchSlice.actions;
export default searchSlice.reducer;
