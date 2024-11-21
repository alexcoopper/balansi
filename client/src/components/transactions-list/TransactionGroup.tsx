// src/components/transactions-list/TransactionGroup.tsx

import React from 'react';
import styled from 'styled-components';
import { Transaction } from '../../models';
import TransactionItem from '../TransactionItem';

const GroupContainer = styled.div`
  margin-bottom: 16px;
`;

const DateLabel = styled.h2`
  font-size: 14px;
  color: #a0a0a0;
  text-align: center;
  margin: 8px 0;
  font-weight: 500;
`;

interface TransactionGroupProps {
  dateLabel: string;
  transactions: Transaction[];
  onItemClick: (transaction: Transaction) => void;
}

const TransactionGroup: React.FC<TransactionGroupProps> = ({ dateLabel, transactions, onItemClick }) => (
  <GroupContainer>
    <DateLabel>{dateLabel}</DateLabel>
    {transactions.map((transaction) => (
      <TransactionItem
        key={`${transaction.date}:${transaction.sum}`}
        transaction={transaction}
        onClick={() => onItemClick(transaction)}
      />
    ))}
  </GroupContainer>
);

export default TransactionGroup;
