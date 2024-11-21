import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { getMondayOfWeek } from '../../libs/dateUtils';

interface NavigationMenuProps {
    navigate: (path: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ navigate }) => {
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigateTo = (path: string) => {
        navigate(path);
        handleMenuClose();
    };

    return (
        <>
            <IconButton edge="end" color="inherit" onClick={handleMenuClick} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem
                    onClick={() => handleNavigateTo('/transactions')}
                    selected={location.pathname === '/transactions'}
                >
                    Витрати
                </MenuItem>
                <MenuItem
                    onClick={() => handleNavigateTo(`/menu-week/${getMondayOfWeek(new Date())}`)}
                    selected={location.pathname.includes('/menu-week')}
                >
                    Меню на тиждень
                </MenuItem>
                <MenuItem
                    onClick={() => handleNavigateTo(`/shopping-list/${getMondayOfWeek(new Date(new Date().setDate(new Date().getDate() + 7)))}`)}
                    selected={location.pathname === '/shopping-list'}
                >
                    Список на закупки
                </MenuItem>
            </Menu>
        </>
    );
};

export default NavigationMenu;
