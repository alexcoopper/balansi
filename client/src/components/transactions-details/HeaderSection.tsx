import React from 'react';
import { Typography, Chip } from '@mui/material';
import styled from 'styled-components';
import { Transaction } from '../../models';
import { format } from 'date-fns';

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
`;

const Title = styled(Typography)`
    font-weight: 500 !important;
    margin-bottom: 5px;
`;

const CategoryChip = styled(Chip)`
    background-color: #ff4545 !important;
    color: white !important;
    font-weight: bold !important;
    margin-bottom: 5px !important;
    font-size: 11px !important;
`;

const DateText = styled(Typography)`
    font-size: 14px !important;
    color: #757575 !important;
    margin-bottom: 10px !important;
`;

const HeaderSection = ({ transaction }: { transaction: Transaction }) => (
    <Header>
        <Title variant="h5">{transaction.description}</Title>
        <CategoryChip label={transaction.category || 'інше'} />
        <DateText variant="subtitle2">{format(transaction.date, 'dd MMMM yyyy, HH:mm')}</DateText>
    </Header>
);

export default HeaderSection;
