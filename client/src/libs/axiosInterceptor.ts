import axios from 'axios';
import { shouldUseMockData } from './shouldUseMockData';
import { ApiMocks } from './shouldUseMockData';
import store from '../store';
import { logout } from '../store/authSlice';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

// Define the keys for mockHandlers
type MockHandlerKey =
    | 'GET /auth/status'
    | 'POST /auth/login'
    | 'GET /api/menu'
    | 'POST /api/menu/addweek'
    | 'GET /api/sheetdata'
    | 'GET /api/shopping-list'
    | 'POST /api/shopping-list';

// Mock handlers for different endpoints and methods
const mockHandlers: Record<MockHandlerKey, () => { data?: any; status: number }> = {
    'GET /auth/status': () => ({
        data: { loggedIn: true },
        status: 200,
    }),
    'POST /auth/login': () => ({
        status: 200,
    }),
    'GET /api/menu': () => ({
        data: ApiMocks.menuDataMock,
        status: 200,
    }),
    'POST /api/menu/addweek': () => ({
        status: 200,
    }),
    'GET /api/sheetdata': () => ({
        data: ApiMocks.transactionsMock,
        status: 200,
    }),
    'GET /api/shopping-list': () => ({
        data: ApiMocks.shoppingListDataMock,
        status: 200,
    }),
    'POST /api/shopping-list': () => ({
        status: 200,
    }),
};

// Helper function to resolve mock responses
const getMockHandler = (method: string, url: string): (() => { data?: any; status: number }) | undefined => {
    const key = `${method.toUpperCase()} ${url.replace(API_BASE_URL, '')}` as MockHandlerKey; // Assert the type
    return mockHandlers[key];
};

// Request interceptor for mocking
axios.interceptors.request.use((config) => {
    if (shouldUseMockData() && config.url && config.method) {
        const mockHandler = getMockHandler(config.method, config.url);
        if (mockHandler) {
            // Simulate a mock response directly
            return Promise.reject({
                isMock: true, // Custom flag to identify mock errors
                mockResponse: mockHandler(),
                config,
            });
        }
    }
    return config; // Proceed with the request for non-mocked endpoints
});

// Response interceptor for handling mock responses or errors
axios.interceptors.response.use(
    (response) => response, // Pass through actual responses
    (error) => {
      // Handle mocked responses
      if (error.isMock) {
        return Promise.resolve({
          data: error.mockResponse.data,
          status: error.mockResponse.status,
          statusText: 'OK',
          headers: {},
          config: error.config,
        });
      }
  
      // Handle authentication errors
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        store.dispatch(logout());
      }
  
      // Log the error centrally
      console.error('API Error:', error.response?.data || error.message);
  
      // Add a custom error message to be used downstream
      return Promise.reject(
        new Error(
          error.response?.data?.message ||
            error.message ||
            'An unexpected error occurred'
        )
      );
    }
  );

export default axios;
