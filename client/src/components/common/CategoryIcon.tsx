// src/components/CategoryIcon.tsx

import React from 'react';
import { Avatar, Box } from '@mui/material';
import {
    HealthIcon,
    DefaultIcon,
    CarIcon,
    CasheIcon,
    GroupIcon,
    HomeIcon,
    CommunicationIcon,
    CafeIcon,
    ClothingIcon,
    MoneyTransferIcon,
    ServicesIcon,
    FoodIcon,
    TvIcon,
    HouseholdIcon,
    SchoolIcon,
    RozetkaIcon,
    LockIcon,
} from '../../icons/categoryIcons';

interface CategoryIconProps {
    category: string;
    isBlocked?: boolean;
}

const categorySettings: Record<string, { icon: JSX.Element; color: string }> = {
    авто: { icon: <CarIcon />, color: '#4a90e2' },
    готівка: { icon: <CasheIcon />, color: '#7ed321' },
    гуртки: { icon: <GroupIcon />, color: '#bd10e0' },
    житло: { icon: <HomeIcon />, color: '#f5a623' },
    "зв'язок": { icon: <CommunicationIcon />, color: '#50e3c2' },
    "здоров'я": { icon: <HealthIcon />, color: '#d0021b' },
    'кафе ресторани': { icon: <CafeIcon />, color: '#f8a20b' },
    одяг: { icon: <ClothingIcon />, color: '#8b572a' },
    переводи: { icon: <MoneyTransferIcon />, color: '#b8e986' },
    послуги: { icon: <ServicesIcon />, color: '#9013fe' },
    продукти: { icon: <FoodIcon />, color: '#f8e71c' },
    розетка: { icon: <RozetkaIcon />, color: '#417505' },
    телебачення: { icon: <TvIcon />, color: '#7d4e24' },
    'товари для дому': { icon: <HouseholdIcon />, color: '#ff6f61' },
    школа: { icon: <SchoolIcon />, color: '#3e8e41' },
    default: { icon: <DefaultIcon />, color: 'grey' },
};

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, isBlocked }) => {
    const { icon, color } = categorySettings[category] || categorySettings.default;

    return (
        <Box position='relative' display='inline-block'>
            <Avatar sx={{ bgcolor: color, width: 40, height: 40 }}>{icon}</Avatar>
            {isBlocked && (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-3px',
                        right: '-3px',
                        width: '18px',
                        height: '18px',
                        background: 'linear-gradient(43deg, #2b31f1, #a6a2ff)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <LockIcon width={12} height={12} fill='white' />
                </Box>
            )}
        </Box>
    );
};

export default CategoryIcon;
