// src/store/menuSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MenuDay } from '../models';
import { MenuService } from '../services/MenuService';

interface MenuState {
  dayMap: Record<string, MenuDay>;
  weekMap: Record<string, string[]>;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  dayMap: {},
  weekMap: {},
  loading: false,
  error: null,
};

// Async thunk to fetch menu data
export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (startDate: string, { rejectWithValue }) => {
    try {
      const data = await MenuService.fetchData(startDate);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch menu');
    }
  }
);

export const updateMenu = createAsyncThunk(
  'menu/updateMenu',
  async (updatedMenu: MenuDay, { rejectWithValue }) => {
    try {
      updatedMenu.isNew = false;
      await MenuService.updateMenuDay(updatedMenu);
      return updatedMenu;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update menu");
    }
  }
);

export const copyMenu = createAsyncThunk(
  'menu/copyMenu',
  async (copyToWeekFromDate: string, {getState, rejectWithValue }) => {
    const state = getState() as { menu: MenuState };
    const { weekMap, dayMap } = state.menu;

    try {
      const menuCopy = await MenuService.copyMenu(copyToWeekFromDate, weekMap, dayMap);
      return menuCopy;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update menu");
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    resetMenu(state) {
      state.dayMap = {};
      state.weekMap = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<MenuDay[]>) => {
        const days: string[] = [];
        action.payload.forEach((menuDay) => {
          state.dayMap[menuDay.day] = menuDay;
          days.push(menuDay.day);
        });
        state.weekMap[action.payload[0].day] = days;
        state.loading = false;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateMenu.fulfilled, (state, action: PayloadAction<MenuDay>) => {
        state.dayMap[action.payload.day] = {...action.payload};
      })
      .addCase(copyMenu.fulfilled, (state, action: PayloadAction<MenuDay[]>) => {
        const newWeek = action.payload;
        const days: string[] = [];

        newWeek.forEach((menuDay) => {
          state.dayMap[menuDay.day] = menuDay;
          days.push(menuDay.day);
        });

        state.weekMap[newWeek[0].day] = days;
      })
      .addCase(copyMenu.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { resetMenu } = menuSlice.actions;
export default menuSlice.reducer;
