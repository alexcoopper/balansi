import React from 'react';
import { Typography, Checkbox, FormControlLabel } from '@mui/material';
import styled from 'styled-components';
import { Transaction, TransactionType } from '../../models';
import { LockIcon, UnLockIcon } from '../../icons/categoryIcons';
import { convertOwnerToDisplayValue } from '../../libs/translations';

const InfoBox = styled.div`
    padding: 15px;
    background-color: #f7f7f7;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const OwnersRow = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40px;
    font-size: 16px;
    align-items: center;
`;

const RightAlignedContent = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
`;

const OurExpenseStatus = styled.div`
    padding: 10px;
    background-color: #ffeb3b;
    color: #333;
    font-weight: bold;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 10px;
`;

const StatusRow = styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 8px;
    height: 60px;
    gap: 10px;
`;

const LabelsGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const PropertyLabel = styled(Typography)`
    font-weight: bold;
    color: #212121;
`;

const PropertySubLabel = styled(Typography)`
    color: #212121;
    font-size: 10px;
`;

const InfoSection = ({
    transaction,
    transactionCopy,
    handleCheckboxChange,
    handleRowClick,
    blockStatusChangeHandler,
}: {
    transaction: Transaction;
    transactionCopy: Transaction | null;
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRowClick: (field: 'forMe' | 'forBrother') => void;
    blockStatusChangeHandler: () => void;
}) => (
    <InfoBox>
        <OwnersRow>
            <PropertyLabel variant="body2">Власники</PropertyLabel>
            <RightAlignedContent>
                {transaction.inOut !== TransactionType.Income && !transactionCopy?.isDone && !transactionCopy?.isBlocked ? (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={transactionCopy?.isOur || false}
                                onChange={handleCheckboxChange}
                                color="primary"
                            />
                        }
                        label={convertOwnerToDisplayValue(transaction.owner)}
                        labelPlacement="start"
                    />
                ) : (
                    <Typography variant="body1">
                        {convertOwnerToDisplayValue(transaction.owner)}
                    </Typography>
                )}
            </RightAlignedContent>
        </OwnersRow>

        {transaction.inOut !== TransactionType.Income &&
            (transactionCopy?.isOur ? (
                <OurExpenseStatus>Тільки витрати власників</OurExpenseStatus>
            ) : (
                <>
                    <InfoRow onClick={() => !transactionCopy?.isDone && !transactionCopy?.isBlocked ? handleRowClick('forMe') : null}>
                        <PropertyLabel variant="body2">Витрати власників</PropertyLabel>
                        <Typography variant="body2">{transactionCopy?.forMe}</Typography>
                    </InfoRow>
                    <InfoRow onClick={() => !transactionCopy?.isDone && !transactionCopy?.isBlocked ? handleRowClick('forBrother') : null}>
                        <PropertyLabel variant="body2">Витрати на родичів</PropertyLabel>
                        <Typography variant="body2">{transactionCopy?.forBrother}</Typography>
                    </InfoRow>
                    <InfoRow>
                        <PropertyLabel variant="body2">Витрати на загальне</PropertyLabel>
                        <Typography variant="body2">
                            {(Math.abs(transaction.sum) - (transactionCopy?.forMe || 0) - (transactionCopy?.forBrother || 0)).toFixed(2)} ₴
                        </Typography>
                    </InfoRow>
                </>
            ))}

        {transactionCopy?.isDone ? (
            <StatusRow>
                <LockIcon />
                <PropertyLabel variant="body2">Підрахунок операції завершено.</PropertyLabel>
            </StatusRow>
        ) : (
            <StatusRow onClick={blockStatusChangeHandler}>
                {transactionCopy?.isBlocked ? <LockIcon /> : <UnLockIcon />}
                <LabelsGroup>
                    <PropertyLabel variant="body2">
                        {transactionCopy?.isBlocked ? 'Заблоковано до підрахунів.' : 'Розблаковано для редагування.'}
                    </PropertyLabel>
                    <PropertySubLabel variant="body2">
                        {transactionCopy?.isBlocked ? 'Натисніть щоб розблоувати.' : 'Натисніть, якщо готово до підрахунків.'}
                    </PropertySubLabel>
                </LabelsGroup>
            </StatusRow>
        )}
    </InfoBox>
);

export default InfoSection;
