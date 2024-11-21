import React from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import './styles.css';

import LoginPage from './pages/LoginPage';
import TransactionsListPage from './pages/TransactionsListPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import TransactionDetailsPage from './pages/TransactionDetailsPage';
import MenuWeekPage from './pages/MenuWeekPage';
import ShoppingListPage from './pages/ShoppingListPage';
import MenuDayEditPage from './pages/MenuDayEditPage';

const Layout: React.FC = () => {
  return (
    <>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
        <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/transactions" element={<ProtectedRoute><TransactionsListPage /></ProtectedRoute>} />
        <Route path="/transaction-details/:id" element={<ProtectedRoute><TransactionDetailsPage /></ProtectedRoute>} />
        <Route path="/menu-week/:day" element={<ProtectedRoute><MenuWeekPage /></ProtectedRoute>} />
        <Route path="/menu-week/:day/:mealType" element={<ProtectedRoute><MenuDayEditPage /></ProtectedRoute>}/>
        <Route path="/shopping-list/:day" element={<ProtectedRoute><ShoppingListPage /></ProtectedRoute>} />

        <Route path="/" element={<Navigate to="/transactions" replace />} />
        </Route>
    </Routes>
  );
};

export default AppRoutes;
