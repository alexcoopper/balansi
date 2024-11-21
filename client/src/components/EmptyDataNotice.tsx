import { Box, Button, Typography } from '@mui/material';

const EmptyDataNotice: React.FC<{ mainMessage: string; copyMessage: string; onCopyPreviousMenu: () => void }> = ({
    mainMessage,
    copyMessage,
    onCopyPreviousMenu,
}) => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                marginTop: 4,
                padding: 3,
                border: '1px dashed gray',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                {mainMessage}
            </Typography>
            <Typography variant='body1' sx={{ marginBottom: 2, color: '#555' }}>
                {copyMessage}
            </Typography>
            <Button
                variant='contained'
                color='primary'
                onClick={onCopyPreviousMenu}
                sx={{ padding: '8px 16px', fontWeight: 'bold' }}
            >
                Скопіювати
            </Button>
        </Box>
    );
};

export default EmptyDataNotice;
