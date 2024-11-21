// src/components/transactions-list/FilterButtons.tsx

import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import styled from 'styled-components';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  width: 100%;
  display: flex;
  overflow: hidden;
`;

const StyledToggleButton = styled(ToggleButton)`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
  color: #333;
  border: 1px solid #e0e0e0;
  border-right: none;
  border-radius: 0;

  &:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  &:last-child {
    border-right: 1px solid #e0e0e0;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  &.Mui-selected {
    background-color: #e3f2fd !important;
    color: #1e88e5 !important;
    font-weight: bold !important;
  }

  &:hover {
    background-color: #f5f5f5 !important;
  }
`;

interface FilterButtonsProps {
  filter: string;
  onFilterChange: (newFilter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, onFilterChange }) => {
  return (
    <StyledToggleButtonGroup
      value={filter}
      exclusive
      onChange={(_, newFilter) => newFilter && onFilterChange(newFilter)}
    >
      <StyledToggleButton value="All" aria-label="All">
        Всі
      </StyledToggleButton>
      <StyledToggleButton value="Oleksii" aria-label="Oleksii">
        Льоша-Ліза
      </StyledToggleButton>
      <StyledToggleButton value="Dmytro" aria-label="Dmytro">
        Діма-Аня
      </StyledToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default FilterButtons;
