import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ErrorSnackbar = ({
    errorMessage,
    onClose,
}: {
    errorMessage: string | null;
    onClose: () => void;
}) => (
    <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert onClose={onClose} severity="error">
            {errorMessage}
        </Alert>
    </Snackbar>
);

export default ErrorSnackbar;
