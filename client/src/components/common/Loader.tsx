// src/components/Loader.tsx

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight overlay effect
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <CircularProgress size={60} thickness={5} />
      <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loader;
