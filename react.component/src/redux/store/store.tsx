import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    isLoading: cardsReducer,
    isError: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
