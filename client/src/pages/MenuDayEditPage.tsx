import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    TextField,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    MenuItem,
} from '@mui/material';
import styled from 'styled-components';
import BaseModalPageComponent from '../components/layout/BaseModalPageComponent';
import SaveChangesSection from '../components/transactions-details/SaveChangesSection';
import { MealType, MenuDay, MenuItem as MenuItemModal, MenuOwner, ShoppingItem } from '../models';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { convertDayOfWeekToDisplayValue } from '../libs/translations';
import { format } from 'date-fns/format';
import { updateMenu } from '../store/menuSlice';
import ErrorSnackbar from '../components/transactions-details/ErrorSnackbar';
import ProductList from '../components/ProductList';
import { addShoppingList } from '../store/shoppingSlice';
import { getMondayOfWeek } from '../libs/dateUtils';

const StyledContainer = styled(Container)`
    margin-top: 24px;
`;

const HeaderContainer = styled(Typography)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 16px;
`;

type MenuParams = Record<'day' | 'mealType', string>;

const MenuDayEditPage: React.FC = () => {
    const { day, mealType } = useParams<MenuParams>();
    const { dayMap } = useSelector((state: RootState) => state.menu);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [changesDetected, setChangesDetected] = useState<boolean>(false);
    const [updateInProgress, setUpdateInProgress] = useState(false);
    const [menuItem, setMenuItem] = useState<MenuItemModal | null>(null);
    const [menuItemCopy, setMenuItemCopy] = useState<MenuItemModal | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [hasErrors, setHasErrors] = useState(false);

    // Detect changes
    useEffect(() => {
        setChangesDetected(JSON.stringify(menuItem) !== JSON.stringify(menuItemCopy));
    }, [menuItem, menuItemCopy]);

    useEffect(() => {
        if (!day || !mealType) {
            navigate('/');
            return;
        }

        const dayMenu = dayMap[day];
        if (dayMenu) {
            setMenuItem(dayMenu[mealType === MealType.Dinner ? 'dinner' : 'lunch']);
            setMenuItemCopy({ ...dayMenu[mealType === MealType.Dinner ? 'dinner' : 'lunch'] });
        } else {
            navigate('/');
        }
    }, [day, mealType, navigate, dayMap]);

    const handleOwnerChange = (event: SelectChangeEvent<MenuOwner>) => {
        const newOwner = event.target.value as MenuOwner;
        setMenuItemCopy((prev) => (prev ? { ...prev, owner: newOwner } : null));
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDescription = event.target.value;
        setMenuItemCopy((prev) => (prev ? { ...prev, description: newDescription } : null));
    };

    const handleSaveChanges = () => {
        if (menuItemCopy) {
            setUpdateInProgress(true);
            const originalMenu = { ...menuItemCopy };

            const menuDay = dayMap[day!] as MenuDay;
            const updatedMenuDay = {
                ...menuDay,
                [mealType === MealType.Dinner ? 'dinner' : 'lunch']: menuItemCopy,
            };

            dispatch(updateMenu(updatedMenuDay))
                .unwrap()
                .then(() => {
                    dispatch(
                        addShoppingList({
                            day: getMondayOfWeek(new Date(updatedMenuDay.day)),
                            shoppingItems: [...(updatedMenuDay.dinner.products || []), ...(updatedMenuDay.lunch.products|| [])],
                        }),
                    )
                    .unwrap()
                    .then(() => {
                        setUpdateInProgress(false);
                        setMenuItemCopy({ ...menuItemCopy });
                        setChangesDetected(false);
                        setTimeout(() => {
                            navigate(-1);
                        }, 1);
                    })
                })
                .catch(() => {
                    setMenuItemCopy(originalMenu);
                    setUpdateInProgress(false);
                    setErrorMessage('Упс! Щось пішло не так з оновленням! Спробуйте пізніше!');
                });
        }
    };

    if (!day) {
        return null;
    }

    return (
        <BaseModalPageComponent>
            <StyledContainer maxWidth='sm'>
                <HeaderContainer variant='h5' gutterBottom>
                    {mealType === MealType.Dinner ? 'Вечеря' : 'Обід'} на {convertDayOfWeekToDisplayValue(day)}{' '}
                    <Typography component='span' variant='body2' sx={{ fontSize: '0.875rem', color: 'gray' }}>
                        ({format(new Date(day), 'dd.MM.yyyy')})
                    </Typography>
                </HeaderContainer>
                <Box sx={{ marginBottom: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel
                            sx={{
                                zIndex: 2,
                                backgroundColor: 'white',
                                paddingLeft: '5px',
                                paddingRight: '5px',
                                left: '-5px',
                            }}
                            id='owner-select-label'
                        >
                            Шеф-кухар
                        </InputLabel>
                        <Select
                            labelId='owner-select-label'
                            value={menuItemCopy?.owner || ''}
                            onChange={handleOwnerChange}
                            fullWidth
                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={MenuOwner.Anna}>Аня (помічник - Діма)</MenuItem>
                            <MenuItem value={MenuOwner.Liza}>Ліза (помічник - Льоша)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label='Страва'
                        fullWidth
                        multiline
                        rows={3}
                        value={menuItemCopy?.description || ''}
                        onChange={handleDescriptionChange}
                    />
                </Box>
                <Typography>Список продуктів:</Typography>
                <ProductList
                    products={menuItemCopy?.products || []}
                    onUpdate={(updatedProducts) => {
                        const modifyedProducts = updatedProducts.map((product) => ({
                            ...product, // Create a shallow copy of the product
                            meals: menuItemCopy?.description ? [menuItemCopy.description] : [], // Assign meals
                        }));
                        setMenuItemCopy((prev) => (prev ? { ...prev, products: modifyedProducts } : null));
                    }}
                    onSetError={setHasErrors}
                />

                <SaveChangesSection
                    changesDetected={changesDetected && !hasErrors}
                    updateInProgress={updateInProgress}
                    handleSaveChanges={handleSaveChanges}
                />
                <ErrorSnackbar errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />
            </StyledContainer>
        </BaseModalPageComponent>
    );
};

export default MenuDayEditPage;
