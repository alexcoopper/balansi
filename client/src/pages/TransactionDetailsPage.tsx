import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { generateTransactionId, Transaction } from '../models';
import { updateTransaction } from '../store/transactionsSlice';
import HeaderSection from '../components/transactions-details/HeaderSection';
import AmountSection from '../components/transactions-details/AmountSection';
import InfoSection from '../components/transactions-details/InfoSection';
import CommentSection from '../components/transactions-details/CommentSection';
import SaveChangesSection from '../components/transactions-details/SaveChangesSection';
import UpdateDialog from '../components/transactions-details/UpdateDialog';
import ErrorSnackbar from '../components/transactions-details/ErrorSnackbar';
import BaseModalPageComponent from '../components/layout/BaseModalPageComponent';

const TransactionDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const transactions = useSelector((state: RootState) => state.transactions.records);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [transactionCopy, setTransactionCopy] = useState<Transaction | null>(null);
    const [comment, setComment] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState<'forMe' | 'forBrother' | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [updateInProgress, setUpdateInProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [changesDetected, setChangesDetected] = useState(false);

    useEffect(() => {
        setChangesDetected(JSON.stringify(transaction) !== JSON.stringify(transactionCopy));
    }, [transaction, transactionCopy]);

    useEffect(() => {
        const transactionData = transactions.find((tx) => generateTransactionId(tx) === id);
        if (transactionData) {
            setTransaction(transactionData);
            setTransactionCopy({ ...transactionData });
            setComment(transactionData.comment || '');
        } else {
            navigate('/');
        }
    }, [id, transactions, navigate]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (transactionCopy) {
            setTransactionCopy({ ...transactionCopy, isOur: event.target.checked });
        }
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
        setTransactionCopy((prev) => (prev ? { ...prev, comment: e.target.value } : null));
    };

    const handleRowClick = (field: 'forMe' | 'forBrother') => {
        setSelectedField(field);
        const initialFieldValue = transactionCopy ? transactionCopy[field] : 0;
        setInputValue(initialFieldValue !== 0 ? initialFieldValue.toString() : '');
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSave = () => {
        if (transactionCopy && selectedField) {
            const newValue = inputValue
                .replace(',', '.')
                .split(' ')
                .map(Number)
                .filter((num) => !isNaN(num))
                .reduce((acc, curr) => acc + curr, 0);
            setTransactionCopy({ ...transactionCopy, [selectedField]: newValue });
        }
        setModalOpen(false);
    };

    const blockStatusChangeHandler = () => {
        if (transactionCopy) {
            setTransactionCopy({ ...transactionCopy, isBlocked: !transactionCopy.isBlocked });
        }
    };

    const handleSaveChanges = () => {
        if (transactionCopy) {
            setUpdateInProgress(true);
            const originalTransaction = { ...transactionCopy };
            if (transactionCopy.isOur) {
                transactionCopy.forMe = 0;
                transactionCopy.forBrother = 0;
            }
            dispatch(updateTransaction(transactionCopy))
                .unwrap()
                .then(() => {
                    setUpdateInProgress(false);
                    setTransactionCopy({ ...transactionCopy });
                    setChangesDetected(false);
                    setTimeout(() => {
                        navigate(-1);
                    }, 1);
                })
                .catch(() => {
                    setTransactionCopy(originalTransaction);
                    setUpdateInProgress(false);
                    setErrorMessage('Упс! Щось пішло не так з оновленням! Спробуйте пізніше!');
                });
        }
    };

    if (!transaction) {
        return null;
    }

    return (
        <BaseModalPageComponent>
            <div>
                <HeaderSection transaction={transaction} />
                <AmountSection transaction={transaction} />
                <InfoSection
                    transaction={transaction}
                    transactionCopy={transactionCopy}
                    handleCheckboxChange={handleCheckboxChange}
                    handleRowClick={handleRowClick}
                    blockStatusChangeHandler={blockStatusChangeHandler}
                />
                <CommentSection comment={comment} onCommentChange={handleCommentChange} />
                <SaveChangesSection
                    changesDetected={changesDetected}
                    updateInProgress={updateInProgress}
                    handleSaveChanges={handleSaveChanges}
                />
                <UpdateDialog
                    modalOpen={modalOpen}
                    handleModalClose={handleModalClose}
                    handleSave={handleSave}
                    selectedField={selectedField}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
                <ErrorSnackbar errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />
            </div>
        </BaseModalPageComponent>
    );
};

export default TransactionDetailsPage;
