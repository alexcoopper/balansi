// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './transactionsSlice';
import authReducer from './authSlice';
import menuReducer from './menuSlice';
import shoppingReducer from './shoppingSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    auth: authReducer,
    menu: menuReducer,
    shopping: shoppingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
