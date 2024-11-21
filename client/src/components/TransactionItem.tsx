import React from 'react';
import { Card, CardContent, Typography, TypographyProps } from '@mui/material';
import styled from 'styled-components';
import { Transaction, TransactionType } from '../models';
import CategoryIcon from './common/CategoryIcon';
import { convertOwnerToDisplayValue } from '../libs/translations';

interface TransactionItemProps {
    transaction: Transaction;
    onClick: () => void;
}

const StyledCard = styled(Card)`
    border: none;
    box-shadow: none; /* Remove shadow */
    margin-bottom: 8px; /* Space between cards */
    cursor: pointer;
    padding: unset !important; /* Remove default padding */
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0px 24px 0px !important; /* Custom padding */
`;

const TransactionDetails = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

const TransactionInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const TransactionDetailsGroup = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

const IsOurSpanIndicator = styled.span`
    display: inline-block;
    background-color: #ffeb3b;
    height: 8px;
    width: 8px;
    border-radius: 50%;
`;

const StyledTypography = styled((props: TypographyProps & { isIncome: boolean }) => (
    <Typography {...props} />
)).withConfig({
    shouldForwardProp: (prop) => prop !== 'isIncome',
})`
    color: ${(props) => (props.isIncome ? '#4caf50' : 'black')};
    min-width: 100px;
    text-align: end;
`;

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {
    // Format the sum based on income or outcome
    const formattedSum =
        transaction.inOut === TransactionType.Income
            ? `${transaction.sum.toFixed(2)} ₴`
            : `-${transaction.sum.toFixed(2)} ₴`;

    return (
        <StyledCard elevation={0} onClick={onClick}>
            <StyledCardContent>
                <TransactionDetails>
                    <CategoryIcon category={transaction.category} isBlocked={transaction.isDone || transaction.isBlocked}/>
                    <TransactionInfo>
                        <Typography variant='body1'>{transaction.description}</Typography>
                        <Typography variant='body2' color='textSecondary'>
                            <TransactionDetailsGroup>
                                {convertOwnerToDisplayValue(transaction.owner)}
                                {transaction.isOur ? <IsOurSpanIndicator /> : null}
                            </TransactionDetailsGroup>
                        </Typography>
                    </TransactionInfo>
                </TransactionDetails>
                <StyledTypography variant='h6' isIncome={transaction.inOut === TransactionType.Income}>
                    {formattedSum}
                </StyledTypography>
            </StyledCardContent>
        </StyledCard>
    );
};

export default TransactionItem;
