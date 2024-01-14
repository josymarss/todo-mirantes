import { configureStore, Tuple } from '@reduxjs/toolkit';
import todoSlice from 'app/reducers/todoslice';

export const store = configureStore({
  reducer:{ todo : todoSlice },
});

export type RootType = ReturnType< typeof store.getState>
export type AppDispach = typeof store.dispatch;