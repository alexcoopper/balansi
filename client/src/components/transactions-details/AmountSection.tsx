import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import styled from 'styled-components';
import { Transaction, TransactionType } from '../../models';

const Amount = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
`;

const AmountText =  styled((props: TypographyProps & { isIncome: boolean }) => (
    <Typography {...props} />
)).withConfig({
    shouldForwardProp: (prop) => prop !== 'isIncome',
})`
    color: ${(props) => (props.isIncome ? 'green' : 'black')};
    font-weight: bold !important;
`;

const AmountSection = ({ transaction }: { transaction: Transaction }) => (
    <Amount>
        <AmountText variant="h3" isIncome={transaction.inOut === TransactionType.Income}>
            {transaction.inOut === TransactionType.Income ? `+${transaction.sum.toFixed(2)} ₴` : `-${transaction.sum.toFixed(2)} ₴`}
        </AmountText>
    </Amount>
);

export default AmountSection;
