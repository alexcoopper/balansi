import React from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';

const SaveChangesButton = styled(Button)`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
    font-weight: bold;
    background-color: #1976d2;
    color: white;
    padding: 16px;
    &:hover {
        background-color: #1565c0;
    }
`;

const ProgressContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f0f0f0;
    text-align: center;
    padding: 16px;
`;

const SaveChangesSection = ({
    changesDetected,
    updateInProgress,
    handleSaveChanges,
}: {
    changesDetected: boolean;
    updateInProgress: boolean;
    handleSaveChanges: () => void;
}) => (
    <>
        {changesDetected && !updateInProgress && (
            <SaveChangesButton variant="contained" onClick={handleSaveChanges}>
                Зберегти зміни
            </SaveChangesButton>
        )}
        {updateInProgress && (
            <ProgressContainer>
                <CircularProgress size={24} />
                <Typography variant="body2">Зберігаю...</Typography>
            </ProgressContainer>
        )}
    </>
);

export default SaveChangesSection;
