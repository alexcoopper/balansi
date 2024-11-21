import axios from './axiosInterceptor'; 
import { MenuDay, ShoppingList, Transaction } from '../models';

// Base URL for the API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || ''; // Defaults to same-origin for production

axios.defaults.withCredentials = true; // Include cookies with requests

// Login function
const login = async (username: string, password: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
};

const checkAuth = async (): Promise<boolean> => {
    const response = await axios.get(`${API_BASE_URL}/auth/status`);
    return response.data.loggedIn;
};

// Fetch sheet data with pagination
const fetchSheetData = async (startRow: number, rowsCount: number): Promise<any[]> => {
    const response = await axios.get(`${API_BASE_URL}/api/sheetdata`, {
      params: { startRow, rowsCount },
    });
    return response.data;
};

const updateTransactionAsync = async (transaction: Transaction): Promise<any[]> => {
    const response = await axios.post(`${API_BASE_URL}/api/transaction/update`, transaction);
    return response.data;
};

const fetchMenuAsync = async (startDay: string): Promise<any[]> => {
    const response = await axios.get(`${API_BASE_URL}/api/menu`, {
      params: { startDay },
    });
    return response.data;
};

const updateDayMenuAsync = async (menuDay: MenuDay): Promise<any[]> => {
    const response = await axios.post(`${API_BASE_URL}/api/menu`, menuDay);
    return response.data;
};

const addWeekMenuAsync = async (menuWeek: MenuDay[]): Promise<void> => {
    await axios.post(`${API_BASE_URL}/api/menu/addweek`, menuWeek);
};

const fetchShoppingListAsync = async (startDay: string): Promise<ShoppingList> => {
    const response = await axios.get(`${API_BASE_URL}/api/shopping-list`, {
      params: { startDay },
    });
    return response.data;
};

const updateShoppingListAsync = async (shoppingList: ShoppingList): Promise<void> => {
    await axios.post(`${API_BASE_URL}/api/shopping-list`, shoppingList);
};

export const API = {
  login,
  checkAuth,
  fetchSheetData,
  updateTransactionAsync,
  fetchMenuAsync,
  updateDayMenuAsync,
  addWeekMenuAsync,
  fetchShoppingListAsync,
  updateShoppingListAsync,
};
