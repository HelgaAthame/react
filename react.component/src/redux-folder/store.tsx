import { configureStore } from '@reduxjs/toolkit';
import { myApi } from './api';
import cardsReducer from './searchSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
    curState: cardsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
