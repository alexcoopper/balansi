// src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './AppRoutes';
import './styles.css';
import AuthProvider from './components/common/AuthProvider';
import { createBrowserHistory } from 'history';

const container = document.getElementById('root');
const root = createRoot(container!);

// Create a custom history object and cast it to `any` to satisfy type expectations
export const customHistory = createBrowserHistory() as any;

root.render(
    <Provider store={store}>
        <HistoryRouter history={customHistory}>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </HistoryRouter>
    </Provider>
);
