import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    IconButton,
    Switch,
    FormControlLabel,
    styled as styledMU,
    Box,
    Button,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BasePageComponent from '../components/layout/BasePageComponent';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import { getMondayOfWeek } from '../libs/dateUtils';
import { copyShoppingList, fetchShoppingList, updateShoppingList } from '../store/shoppingSlice';
import { Translations } from '../libs/translations';
import ShoppingListView from '../components/shopping-list/ShoppingListView';
import ShoppingListEdit from '../components/shopping-list/ShoppingListEdit';
import { MenuDay, ShoppingList } from '../models';
import { fetchMenu } from '../store/menuSlice';
import styled from 'styled-components';

// Styled components
const StyledGrid = styledMU(Container)`
    position: fixed;
    z-index: 2;
    background-color: white;
    top: 56px;
    left: 0;
    height: 60px;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const ButtonsContainer = styled.div`
    display: flex;
    margin-top: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
`;

const ShoppingListPage: React.FC = () => {
    const { day } = useParams<{ day: string }>();
    const { dataMap } = useSelector((state: RootState) => state.shopping);
    const { weekMap, dayMap } = useSelector((state: RootState) => state.menu);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectedMonday = day || getMondayOfWeek(new Date());
    const [isEditMode, setIsEditMode] = useState(false);
    const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
    const [menuList, setMenuList] = useState<MenuDay[] | null>(null);
    const [shouldShowPrevButton, setShouldShowPrevButton] = useState(true);

    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!dataMap[selectedMonday]) {
            dispatch(fetchShoppingList(selectedMonday));
        } else {
            setShoppingList(dataMap[selectedMonday] || []);
        }

        if (!weekMap[selectedMonday]) {
            dispatch(fetchMenu(selectedMonday));
        } else {
            const currentWeekDays = weekMap[selectedMonday] || [];
            setMenuList(currentWeekDays.map((x) => dayMap[x]));
        }

        setShouldShowPrevButton(selectedMonday !== '2024-11-18');
    }, [dispatch, dataMap, selectedMonday, weekMap, dayMap]);

    const toggleEditMode = () => setIsEditMode((prev) => !prev);

    const navigateToWeek = (toNext: boolean) => {
        const newMonday = new Date(selectedMonday);
        newMonday.setDate(newMonday.getDate() + (toNext ? 7 : -7));
        const formattedDate = newMonday.toLocaleDateString('en-CA');
        navigate(`/shopping-list/${formattedDate}`);
    };

    const handlePreviousWeek = () => navigateToWeek(false);
    const handleNextWeek = () => navigateToWeek(true);

    const handleCheckboxesUpdate = (updatedShoppingList: ShoppingList) => {
        setShoppingList(updatedShoppingList);

        if (debounceTimer) clearTimeout(debounceTimer);
        setDebounceTimer(
            setTimeout(() => {
                dispatch(updateShoppingList(updatedShoppingList));
            }, 3000),
        );
    };

    const handleCopyPreviousMenu = () => {
        dispatch(copyShoppingList(selectedMonday));
    };

    if (shoppingList === null) {
        return null;
    }

    return (
        <BasePageComponent>
            <StyledGrid>
                {shouldShowPrevButton && (
                    <IconButton onClick={handlePreviousWeek}>
                        <ArrowBackIosIcon />
                    </IconButton>
                )}
                {!shouldShowPrevButton && <div style={{ width: '40px' }}></div>}
                <Typography variant='h6' sx={{ margin: '0 16px' }}>
                    {Translations.formatDateRange(selectedMonday)}
                </Typography>
                <IconButton onClick={handleNextWeek}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </StyledGrid>

            <ButtonsContainer>
                <Button
                    variant='contained'
                    disabled={isEditMode}
                    color='primary'
                    onClick={handleCopyPreviousMenu}
                    sx={{ padding: '5px 10px', fontSize: '0.75rem' }}
                >
                    Скопіювати попередній
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'right'}}>
                    <FormControlLabel
                        control={<Switch checked={isEditMode} onChange={toggleEditMode} color='primary' />}
                        label='Змінити'
                    />
                </Box>
            </ButtonsContainer>

            {isEditMode ? (
                <ShoppingListEdit
                    shoppingList={shoppingList}
                    onUpdate={() => {
                        setIsEditMode(false);
                    }}
                />
            ) : (
                <ShoppingListView
                    shoppingList={shoppingList}
                    menuList={menuList || []}
                    onUpdate={handleCheckboxesUpdate}
                />
            )}
        </BasePageComponent>
    );
};

export default ShoppingListPage;
