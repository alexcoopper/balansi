// src/components/transactions-list/TransactionsList.tsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import throttle from 'lodash/throttle';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FilterButtons from '../components/transactions-list/FilterButtons';
import TransactionGroup from '../components/transactions-list/TransactionGroup';
import LoadingMessage from '../components/transactions-list/LoadingMessage';
import EndMessage from '../components/transactions-list/EndMessage';
import { generateTransactionId, Transaction } from '../models';
import { RootState, useAppDispatch } from '../store';
import { fetchTransactions } from '../store/transactionsSlice';
import BasePageComponent from '../components/layout/BasePageComponent';

const TransactionsListContainer = styled.div`
    display: block;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
`;

const TransactionsListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { records, loading, hasMore } = useSelector((state: RootState) => state.transactions);
    const navigate = useNavigate();

    const location = useLocation();
    const [filter, setFilter] = useState<string>(() => {
        const params = new URLSearchParams(location.search);
        return params.get('filter') || 'All';
    });

    useEffect(() => {
        // Sync filter from URL on initial load
        const params = new URLSearchParams(location.search);
        const urlFilter = params.get('filter');
        if (urlFilter && urlFilter !== filter) {
            setFilter(urlFilter);
        }
    }, [filter, location.search]);

    const throttledHandleScroll = throttle(() => {
        if (
            !loading &&
            hasMore &&
            window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
        ) {
            dispatch(fetchTransactions());
        }
    }, 300);

    useEffect(() => {
        if (!records.length && !loading) {
            dispatch(fetchTransactions());
        } else if (filter !== 'All' && !records.some((transaction) => transaction.owner === filter) && !loading) {
            dispatch(fetchTransactions());
        }

        window.addEventListener('scroll', throttledHandleScroll);
        return () => window.removeEventListener('scroll', throttledHandleScroll);
    }, [dispatch, throttledHandleScroll, records.length, loading, records, filter]);

    const handleItemClick = (transaction: Transaction) => {
        navigate(`/transaction-details/${generateTransactionId(transaction)}`);
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        navigate(`/transactions?filter=${newFilter}`);
    };

    const filteredTransactions = records.filter((transaction) => {
        if (filter === 'All') return true;
        if (filter === 'Oleksii') return transaction.owner === 'Oleksii';
        if (filter === 'Dmytro') return transaction.owner === 'Dmytro';
        return false;
    });

    const groupedTransactions = filteredTransactions.reduce(
        (groups: { [key: string]: typeof records }, transaction) => {
            const transactionDate = parseISO(transaction.date.toISOString());
            let groupLabel = 'dd/MM/yyyy';

            if (isToday(transactionDate)) {
                groupLabel = 'Сьогодні';
            } else if (isYesterday(transactionDate)) {
                groupLabel = 'Вчора';
            } else {
                groupLabel = format(transactionDate, 'dd MMMM yyyy');
            }

            if (!groups[groupLabel]) groups[groupLabel] = [];
            groups[groupLabel].push(transaction);
            return groups;
        },
        {},
    );

    return (
        <BasePageComponent>
            <TransactionsListContainer>
                <FilterContainer>
                    <FilterButtons filter={filter} onFilterChange={handleFilterChange} />
                </FilterContainer>

                {Object.entries(groupedTransactions).map(([dateLabel, transactions]) => (
                    <TransactionGroup
                        key={dateLabel}
                        dateLabel={dateLabel}
                        transactions={transactions}
                        onItemClick={handleItemClick}
                    />
                ))}

                {loading && <LoadingMessage />}
                {!hasMore && <EndMessage />}
            </TransactionsListContainer>
        </BasePageComponent>
    );
};

export default TransactionsListPage;
