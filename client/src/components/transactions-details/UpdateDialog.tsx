import React, { useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from '@mui/material';

interface UpdateDialogProps {
  modalOpen: boolean;
  handleModalClose: () => void;
  handleSave: () => void;
  selectedField: 'forMe' | 'forBrother' | null;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({ modalOpen, handleModalClose, handleSave, selectedField, inputValue, setInputValue }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
        if (modalOpen && inputRef.current) {
            inputRef.current.focus();
          }
    }, 0);
  }, [modalOpen]);

  const calculateSum = (input: string) => {
    return input
      .replace(',', '.')
      .split(' ')
      .map(Number)
      .filter((num) => !isNaN(num))
      .reduce((acc, curr) => acc + curr, 0);
  };

  const sum = calculateSum(inputValue);

  return (
    <Dialog open={modalOpen} onClose={handleModalClose}>
      <DialogTitle>
        Оновити {selectedField === 'forMe' ? 'витрати власників' : 'витрати на родичів'}
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Сума: {sum}
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Введіть суми"
          placeholder="суми через пробіл"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          inputRef={inputRef}
          inputMode="numeric" // Suggests numeric input without decimals
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} color="secondary">
          Закрити
        </Button>
        <Button onClick={handleSave} color="primary">
          Оновити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
