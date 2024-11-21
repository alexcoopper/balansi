import React, { useEffect, useRef, useState } from 'react';
import { Container, Typography, IconButton, styled } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BasePageComponent from '../components/layout/BasePageComponent';
import { useSelector } from 'react-redux';
import store, { RootState, useAppDispatch } from '../store';
import { copyMenu, fetchMenu } from '../store/menuSlice';
import LoadingMessage from '../components/transactions-list/LoadingMessage';
import MenuCard from '../components/MenuCard';
import { getMondayOfWeek } from '../libs/dateUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { MealType, ShoppingItem } from '../models';
import { Translations } from '../libs/translations';
import EmptyDataNotice from '../components/EmptyDataNotice';
import { addShoppingList } from '../store/shoppingSlice';

const StyledGrid = styled(Grid)`
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

const MenuWeekPage: React.FC = () => {
    const { day } = useParams<{ day: string }>();
    const dispatch = useAppDispatch();
    const { weekMap, dayMap, loading } = useSelector((state: RootState) => state.menu);

    const selectedMonday = day || getMondayOfWeek(new Date());
    const [shouldShowPrevButton, setShouldShowPrevButton] = useState(true);

    const currentDay = new Date().toLocaleDateString('en-CA');
    const activeCardRef = useRef<HTMLDivElement | null>(null);

    const currentWeekDays = weekMap[selectedMonday] || [];
    const records = currentWeekDays.map((day) => dayMap[day]);
    const isNew = records.every((day) => day.isNew);

    useEffect(() => {
        if (!weekMap[selectedMonday]) {
            dispatch(fetchMenu(selectedMonday));
        }
    }, [dispatch, selectedMonday, weekMap]);

    useEffect(() => {
        if (activeCardRef.current) {
            activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setShouldShowPrevButton(selectedMonday !== '2024-11-18');
    }, [records, selectedMonday]);

    const navigate = useNavigate();

    const handleEditClick = (day: string, mealType: MealType) => {
        navigate(`/menu-week/${day}/${mealType}`);
    };

    const navigateToWeek = (toNext: boolean) => {
        const newMonday = new Date(selectedMonday);
        if (toNext) {
            newMonday.setDate(newMonday.getDate() + 7);
        } else {
            newMonday.setDate(newMonday.getDate() - 7);
        }

        const formattedDate = newMonday.toLocaleDateString('en-CA');
        navigate(`/menu-week/${formattedDate}`);
    };

    const handlePreviousWeek = () => {
        navigateToWeek(false);
    };

    const handleNextWeek = () => {
        navigateToWeek(true);
    };

    const handleCopyPreviousMenu = async () => {
        try {
            // Dispatch the copyMenu action and wait for it to complete
            await dispatch(copyMenu(selectedMonday)).unwrap();
    
            // Access the updated state
            const state = store.getState(); // Ensure you import the store or use a hook to access it
            const updatedWeekMap = state.menu.weekMap;
            const updatedDayMap = state.menu.dayMap;
    
            const newMenu = updatedWeekMap[selectedMonday] || [];
            const copiedProducts: ShoppingItem[] = [];
    
            newMenu.forEach((day) => {
                const dayMenu = updatedDayMap[day];
                if (dayMenu) {
                    copiedProducts.push(...(dayMenu.lunch.products||[]), ...(dayMenu.dinner.products||[]));
                }
            });
    
            if (copiedProducts.length > 0) {
                dispatch(
                    addShoppingList({
                        day: selectedMonday,
                        shoppingItems: [...copiedProducts],
                    })
                );
            }
        } catch (error) {
            console.error("Error copying menu:", error);
        }
    };

    return (
        <BasePageComponent>
            <Container maxWidth='lg' sx={{ marginTop: 2, padding: 'unset' }}>
                <StyledGrid container sx={{ marginBottom: 2 }}>
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
                {loading && (
                    <div style={{ paddingTop: '100px' }}>
                        <LoadingMessage />
                    </div>
                )}

                <Grid container columns={1} sx={{ paddingTop: '50px' }}>
                    {isNew && !loading && (
                        <EmptyDataNotice
                            mainMessage='Наразі це меню пусте, додайте зміни.'
                            copyMessage='Ви можете скопіювати попереднє меню'
                            onCopyPreviousMenu={handleCopyPreviousMenu}
                        />
                    )}
                    {records.map((dayMenu) => (
                        <Grid size={12} key={dayMenu.day}>
                            <MenuCard
                                dayMenu={dayMenu}
                                isActive={dayMenu.day === currentDay}
                                ref={dayMenu.day === currentDay ? activeCardRef : null}
                                onClick={(mealType: MealType) => handleEditClick(dayMenu.day, mealType)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </BasePageComponent>
    );
};

export default MenuWeekPage;
