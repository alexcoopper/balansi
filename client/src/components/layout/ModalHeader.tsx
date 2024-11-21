import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ModalHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {'Деталі операції'}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default ModalHeader;
