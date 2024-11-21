import React, { forwardRef } from 'react';
import { Card, CardContent, Typography, Box, CardHeader, Divider } from '@mui/material';
import styled from 'styled-components';
import { convertDayOfWeekToDisplayValue, Translations } from '../libs/translations';
import { MealType, MenuDay } from '../models';

const StyledCard = styled(Card)<{ active?: boolean }>`
    background-color: ${(props) => (props.active ? '#e3f2fd' : '#f5f5f5')};
    transition: 0.3s;
    border: ${(props) => (props.active ? '2px solid #2196f3' : 'none')};
    transform: ${(props) => (props.active ? 'scale(1.05)' : 'none')};
    box-shadow: ${(props) => (props.active ? '0 4px 12px rgba(33, 150, 243, 0.5)' : 'none')};
    margin-bottom: 16px;
`;

const MealBox = styled(Box)`
    margin-top: 12px;
    padding: 8px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const MealTypeContainer = styled.div`
    position: absolute;
    top: -6px;
    left: 8px;
    font-size: 10px;
    color: gray;
`;

interface MenuCardProps {
    dayMenu: MenuDay;
    isActive: boolean;
    ref?: React.Ref<HTMLDivElement>;
    onClick: (mealType: MealType) => void;
}

const MenuCard = forwardRef<HTMLDivElement, MenuCardProps>(({ dayMenu, isActive, onClick }, ref) => (
    <StyledCard active={isActive} ref={isActive ? ref : null}>
        {/* Card Header */}
        <CardHeader
            title={convertDayOfWeekToDisplayValue(dayMenu.day)}
            titleTypographyProps={{
                variant: 'h5',
                style: { textAlign: 'center', color: '#1976d2', fontWeight: 'bold' },
            }}
        />
        <Divider />
        <CardContent>
            {/* Meals */}
            {[dayMenu.lunch, dayMenu.dinner].map((item, index) => (
                <MealBox key={index} onClick={() => onClick(item.type)}>
                    <MealTypeContainer>
                        {Translations.convert(item.type)}
                    </MealTypeContainer>
                    <Typography
                        variant="body1"
                        sx={{ marginTop: 0.5, fontSize: '16px', fontWeight: 'bold' }}
                    >
                        {item.description}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontSize:'12px', marginTop: 0.5, color: 'text.secondary' }}
                    >
                        {item.owner ? Translations.convertToMealOwnerRow(item.owner) : ''}
                    </Typography>
                </MealBox>
            ))}
        </CardContent>
    </StyledCard>
));

export default MenuCard;
