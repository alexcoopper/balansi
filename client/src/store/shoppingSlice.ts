import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingItem, ShoppingList } from '../models';
import { ShoppingService } from '../services/ShoppingService';

interface ShoppingState {
  dataMap: Record<string, ShoppingList>;
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingState = {
  dataMap: {},
  loading: false,
  error: null,
};

export const fetchShoppingList = createAsyncThunk(
  'shoppingList/fetchShoppingList',
  async (startDate: string, { rejectWithValue }) => {
    try {
      const result = await ShoppingService.fetchData(startDate);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch shopping list');
    }
  }
);

export const updateShoppingList = createAsyncThunk(
  'shoppingList/updateShoppingList',
  async (updatedShoppingList: ShoppingList, { rejectWithValue }) => {
    try {
      await ShoppingService.updateShoppingList(updatedShoppingList);
      return updatedShoppingList;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update shopping list");
    }
  }
);

export const copyShoppingList = createAsyncThunk(
  'shoppingList/copyShoppingList',
  async (copyToWeekFromDate: string, {getState, rejectWithValue }) => {
    const state = getState() as { shopping: ShoppingState };
    const { dataMap } = state.shopping;

    try {
      const shoppingListCopy = await ShoppingService.copyShoppingList(copyToWeekFromDate, dataMap);
      return shoppingListCopy;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update menu");
    }
  }
);

export const addShoppingList = createAsyncThunk(
  'shoppingList/addShoppingListFromMenu',
  async (payload: { day: string; shoppingItems: ShoppingItem[] }, {getState, rejectWithValue }) => {
    const state = getState() as { shopping: ShoppingState };
    const { dataMap } = state.shopping;
    let currentList = dataMap[payload.day];
    if (!currentList) {
      currentList = await ShoppingService.fetchData(payload.day);
    }
    try {
      const shoppingListCopy = await ShoppingService.addShoppingList(currentList, payload.shoppingItems);
      return shoppingListCopy;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update menu");
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    resetShoppingList(state) {
      state.dataMap = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShoppingList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
        state.dataMap[action.payload.day] = {...action.payload};
        state.loading = false;
      })
      .addCase(fetchShoppingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateShoppingList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShoppingList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
        state.dataMap[action.payload.day] = {...action.payload};
        state.loading = false;
      })
      .addCase(copyShoppingList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
        state.dataMap[action.payload.day] = {...action.payload};
        state.loading = false;
      })
      .addCase(addShoppingList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
        state.dataMap[action.payload.day] = {...action.payload};
        state.loading = false;
      });
  },
});

export const { resetShoppingList } = menuSlice.actions;
export default menuSlice.reducer;
