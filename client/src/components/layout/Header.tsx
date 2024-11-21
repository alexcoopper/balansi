import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';
import { fetchTransactions, resetTransactions } from '../../store/transactionsSlice';
import { LogoIcon } from '../../icons/commonIcons';
import NavigationMenu from '../common/NavigationMenu';
import { fetchMenu, resetMenu } from '../../store/menuSlice';
import { getMondayOfWeek } from '../../libs/dateUtils';
import { resetShoppingList } from '../../store/shoppingSlice';

const ButtonsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: end;
    margin-left: -8px;
`;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const loading = useSelector((state: RootState) => state.transactions.loading);

    // Define page titles based on the current route
    const getPageTitle = () => {
        if (location.pathname.includes('/menu-week')) {
            return 'Меню на тиждень';
        }
        if (location.pathname.includes('/shopping-list')) {
            return 'Список на закупки';
        }
        if (location.pathname.includes('/transactions')) {
            return 'Витрати';
        }

        return '';
    };

    const handleRefreshClick = () => {
        if (location.pathname.includes('/menu-week')) {
            const current = getMondayOfWeek(new Date());
            dispatch(resetMenu());
            dispatch(fetchMenu(current));
            navigate('/menu-week/' + current);
            return;
        }

        if (location.pathname.includes('/shopping-list')) {
            let nextWeekDate = new Date()
            nextWeekDate.setDate(new Date().getDate() + 7);
            const mondayOfNextWeek = getMondayOfWeek(nextWeekDate);
            dispatch(resetShoppingList());
            navigate('/shopping-list/' + mondayOfNextWeek);
            return;
        }

        if (location.pathname.includes('/transactions')) {
            dispatch(resetTransactions());
            dispatch(fetchTransactions());
            return;
        }
    };

    return (
        <AppBar position='fixed'>
            <Toolbar>
                {/* Left Logo */}
                <HeaderContainer>
                    <LogoIcon />
                    <Typography variant='h6' sx={{ marginLeft: '-6px' }}>
                        {'alansi'}
                    </Typography>
                </HeaderContainer>
                <Typography variant='h6' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {getPageTitle()}
                </Typography>

                <ButtonsContainer>
                    <IconButton edge='end' color='inherit' onClick={handleRefreshClick} aria-label='refresh'>
                        {loading ? <CircularProgress size={24} color='inherit' /> : <RefreshIcon />}
                    </IconButton>
                    <NavigationMenu navigate={navigate} />
                </ButtonsContainer>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
