// src/store/transactionsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../models';
import { TransactionsService } from '../services/TransactionsService';

interface TransactionsState {
  records: Transaction[];
  loading: boolean;
  hasMore: boolean;
  lastRow: number;
}

const initialState: TransactionsState = {
  records: [],
  loading: false,
  hasMore: true,
  lastRow: 1,
};

// Async thunk to fetch data
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { transactions: TransactionsState };
    const { lastRow } = state.transactions;
    try {
      const newRecords = await TransactionsService.fetchData(lastRow);
      return newRecords;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch transactions');
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { transactions: TransactionsState };
      return !state.transactions.loading && state.transactions.hasMore;
    },
  }
);

// Async thunk to update transaction
export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (updatedTransaction: Transaction, { rejectWithValue }) => {
    try {
      await TransactionsService.updateTransaction(updatedTransaction);
      return updatedTransaction;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update transaction");
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetTransactions(state) {
      state.records = [];
      state.hasMore = true;
      state.lastRow = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        const existingIdentifiers = new Set(
          state.records.map((record) => `${record.date}-${record.sum}-${record.owner}`)
        );

        const uniqueNewRecords = action.payload.filter(
          (record) => !existingIdentifiers.has(`${record.date}-${record.sum}-${record.owner}`)
        );

        state.records = [...state.records, ...uniqueNewRecords];
        state.loading = false;
        state.lastRow += uniqueNewRecords.length;

        if (uniqueNewRecords.length < 10) {
          state.hasMore = false;
        }
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        const index = state.records.findIndex(
          (record) => `${record.date}-${record.sum}-${record.owner}` ===
            `${action.payload.date}-${action.payload.sum}-${action.payload.owner}`
        );

        if (index !== -1) {
          state.records[index] = action.payload;
        }
      });
  },
});

export const { resetTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
