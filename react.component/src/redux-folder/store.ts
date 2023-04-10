import { configureStore } from '@reduxjs/toolkit';
import { myApi } from './api';
import cardsReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
    cards: cardsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
